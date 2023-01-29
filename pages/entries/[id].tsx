import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Layout } from '@/components/layouts'
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Entry, EntryStatus } from '@/interfaces'
import { dbEntries } from '@/database'
import { EntriesContext } from '@/context/entries'
import { dateFunctions } from '@/utils'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {
    const { updateEntry } = useContext(EntriesContext)
    const [inputValue, setInputValue] = useState<string>(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState<boolean>(false)
    
    const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        // console.log(typeof e.target.value, 'input value xD?')
        setStatus(e.target.value as EntryStatus)
    }

    const onHandleClick = () => {

        const entryToUpdate: Entry = {
            ...entry,
            description: inputValue,
            status: status,
        }
        updateEntry(entryToUpdate, true)
    }

    const enabledOpt = useMemo(() => touched && !inputValue, [touched, inputValue])

    return (
        <>
            <Layout
                title={inputValue.substring(0,15) + '...'}
            >
                <Grid
                    container
                    justifyContent='center'
                    sx={{ marginTop: 2}}
                >
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={6}
                    >
                        <Card>
                            <CardHeader
                                title={`Entry:`}
                                subheader={dateFunctions.getFormatDistanceToNow(entry.createdAt)}
                            />

                            <CardContent>
                                <TextField
                                    sx={{ marginTop: 2, marginBottom: 1 }}
                                    fullWidth
                                    placeholder='New entry'
                                    //autoFocus
                                    multiline
                                    label={`New entry`}
                                    onChange={handleChangeEvent}
                                    value={inputValue}
                                    onBlur={() => setTouched(true)}
                                    error={enabledOpt}
                                    helperText={enabledOpt && 'Required field *'}
                                />

                                {/* RADIO */}
                                <FormControl
                                    sx={{ marginTop: 3, marginBottom: 2}}
                                >
                                    <FormLabel>Status:</FormLabel>

                                    <RadioGroup
                                        row
                                        onChange={onStatusChange}
                                        value={status}
                                    >
                                        {
                                            validStatus.map((opt, idx) => {
                                                return (
                                                    <FormControlLabel
                                                        key={opt}
                                                        value={opt}
                                                        control={<Radio />}
                                                        label={ capitalize(opt)}
                                                    />
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                            <CardActions >
                                <Button
                                    startIcon={<SaveOutlinedIcon />}
                                    variant='contained'
                                    fullWidth
                                    onClick={onHandleClick}
                                    disabled={!inputValue}
                                >
                                    Save
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <IconButton sx={{
                    position:'fixed',
                    bottom: 30,
                    //top: 80,
                    right: 30,
                    backgroundColor: 'red'
                }}>
                    <DeleteOutlinedIcon />
                </IconButton>
            </Layout>
        </>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string }

    const entry = await dbEntries.getEntryById(id)
    
    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage