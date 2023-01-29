import React, { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '@/interfaces';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const router = useRouter()
    const { handleDraggingCard } = useContext(UIContext)
    
    // methods to drag a card
    const onDragStart = (e:DragEvent) => {
        e.dataTransfer.setData('text', entry._id)
        handleDraggingCard(true);
    }

    const onDragEnd = () => {
        handleDraggingCard(false)
    }

    const navigateEntry = () => {
        router.push(`/entries/${entry._id}`)
    }
    return (
        <>
            <Card
                sx={{ marginBottom: 1 }}
                draggable
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onClick={navigateEntry}
            >
                <CardActionArea>
                    <CardContent>
                        <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                    </CardContent>

                    <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: '2'}}>
                        <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.createdAt) }</Typography>
                    </CardActions>
                </CardActionArea>
            </Card>
        </>
    )
}