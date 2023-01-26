import React, { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {
    const { addNewEntry } = useContext(EntriesContext)
    const { addingEntry, handleAddingEntry } = useContext(UIContext)

    const [inputValue, setInputValue] = useState<string>('')
    const [touched, setIsTouched] = useState<boolean>(false)

    const handleOpenModal = () => {
        handleAddingEntry(true)
    }
    const handleCloseModal = () => {
        handleAddingEntry(false)
        setIsTouched(false)
        setInputValue('')
    }

    const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const onSaveTask = () => {
        if (inputValue.length === 0) return
        addNewEntry(inputValue)
        setInputValue('')
        handleAddingEntry(false)
        setIsTouched(false)
    }

    return (
        <>

            {
                addingEntry && (
                    <Box>
                        <TextField
                            id='new-task'
                            label='Task description'
                            fullWidth
                            sx={{ marginTop: 1, marginBottom: 3 }}
                            size='small'
                            placeholder='New task'
                            multiline
                            onChange={handleChangeEvent}
                            onBlur={() => setIsTouched(true)}
                            helperText={touched && inputValue === '' && 'Required field'}
                            error={inputValue.length === 0 && touched}
                            value={inputValue}
                            />
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            gap={2}
                            marginBottom={3}
                            >
                            <Button
                                variant='text'
                                size='small'
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveOutlinedIcon />}
                                size='small'
                                onClick={onSaveTask}
                                disabled={!inputValue}
                                >
                                Save
                            </Button>
                        </Box>
                    </Box>
                )
            }
            {
                !addingEntry && (
                    <Button
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        fullWidth
                        variant='outlined'
                        onClick={handleOpenModal}
                    >
                        Add new Task
                    </Button>
                )
            }
        </>
    )
}