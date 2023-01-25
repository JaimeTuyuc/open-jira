import { createContext } from 'react'


interface ContextProps {
    sideMenuOpen: boolean;
    openSideBar: () => void;
    closeSideBar: () => void;
}


export const UIContext = createContext({} as ContextProps)