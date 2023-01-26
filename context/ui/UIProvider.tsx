import React, { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
    sideMenuOpen: boolean;
    addingEntry: boolean;
    isDragging: boolean;
}

interface Props {
    children?: React.ReactNode
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    addingEntry: false,
    isDragging: false
}

export const UIProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideBar = () => {
        dispatch({type: 'UI - Open Sidebar'})
    }

    const closeSideBar = () => {
        dispatch({ type: 'UI - Close Sidebar'})
    }

    const handleAddingEntry = (value: boolean) => {
        dispatch({type: 'UI - adding entry', payload: value})
    }

    const handleDraggingCard = (value: boolean) => {
        dispatch({type: 'UI - dragging card', payload: value })
    }

    const values = {
        ...state,

        // Methods
        openSideBar,
        closeSideBar,
        handleAddingEntry,
        handleDraggingCard
    }
    return (
        <UIContext.Provider
            value={values}
        >
            {children}
        </UIContext.Provider>
    )
}