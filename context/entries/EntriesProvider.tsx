import { FC, ReactNode, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces';
import {v4 as uuid} from 'uuid'

export interface EntriesState {
    entries: Entry[]
}

interface Props {
    children: ReactNode
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuid(),
            description: 'Pending - Mi primer task para el TODO xD',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            _id: uuid(),
            description: 'Completed - Task terminado',
            createdAt: Date.now(),
            status: 'finished'
        },
        {
            _id: uuid(),
            description: 'In-progres Task en progreso',
            createdAt: Date.now(),
            status: 'in-progress'
        }
    ]
}

export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuid(),
            description: description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({type: '[Entry] Add-entry', payload: newEntry})
    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] update entry', payload: entry });
    }

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