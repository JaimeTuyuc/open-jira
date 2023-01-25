import React, { FC, ReactNode, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
    sideMenuOpen: boolean
}

interface Props {
    children?: React.ReactNode
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false
}

export const UIProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideBar = () => {
        dispatch({type: 'UI - Open Sidebar'})
    }

    const closeSideBar = () => {
        dispatch({ type: 'UI - Close Sidebar'})
    }

    const values = {
        ...state,

        // Methods
        openSideBar,
        closeSideBar
    }
    return (
        <UIContext.Provider
            value={values}
        >
            {children}
        </UIContext.Provider>
    )
}