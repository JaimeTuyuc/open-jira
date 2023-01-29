import { FC, ReactNode, useEffect, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces';
import { useSnackbar } from 'notistack'
import entriesApi from '../../apis/entriesApi';

export interface EntriesState {
    entries: Entry[]
}

interface Props {
    children: ReactNode
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider: FC<Props> = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar()

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    const addNewEntry = async (description: string) => {
        try {
            const { data } = await entriesApi.post<Entry>(`/entries`, { description: description })
            dispatch({type: '[Entry] Add-entry', payload: data})
        } catch (error) {
            console.log(error, 'unable to save the data')
        }
    }

    const updateEntry = async (entry: Entry, showSnackBar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, { description: entry.description, status: entry.status })
            dispatch({ type: '[Entry] update entry', payload: data })
            if (showSnackBar) {
                enqueueSnackbar('Entry updated', {
                    variant: 'success',
                    autoHideDuration: 1800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
            
        } catch (error) {
            console.log(error, 'Unable to update the Entry');
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>(`/entries`)
        dispatch({ type: '[Entries] refresh data', payload: data })
    }


    useEffect(() => {
        // Call the entries first time
        refreshEntries()
    }, [])

    const value = {
        ...state,
        addNewEntry,
        updateEntry
    }
    return (
        <EntriesContext.Provider
            value={value}
        >
            {children}
        </EntriesContext.Provider>
    )
}