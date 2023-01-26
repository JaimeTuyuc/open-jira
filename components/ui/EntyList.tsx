import React, { DragEvent, FC, useContext, useMemo } from 'react'
import { EntryStatus } from '@/interfaces'
import { List, Paper } from '@mui/material'
import { EntryCard } from './'
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';
import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({status}) => {
    const { entries, updateEntry } = useContext(EntriesContext)
    const { isDragging, handleDraggingCard } = useContext(UIContext)
    const entriesByStatus = useMemo(() => entries.filter((entry) => entry.status === status), [entries])
    const allowDrop = (e:DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const onDropEntry = (e:DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text')
        const entryToUpdate = entries.find((e) => e._id === id)!
        const entry = { ...entryToUpdate }
        entry.status = status
        updateEntry(entry)
        handleDraggingCard(false)
    }

    return (
        <>
            <div
                onDrop={onDropEntry}
                onDragOver={allowDrop}
                className={isDragging ? styles.dragging : ''}
            >
                <Paper sx={{ height: 'calc(100vh - 220px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 2px'}}>
                    <List sx={{ opacity: isDragging ? 0.4 : 1, transition: 'all 0.3s'}}>
                        {
                            entriesByStatus.map((entry) => {
                                return (
                                    <EntryCard entry={entry} key={entry._id} />
                                )
                            })
                        }
                    </List>
                </Paper>
            </div>
        </>
    )
}