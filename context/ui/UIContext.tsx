import { createContext } from 'react'


interface ContextProps {
    sideMenuOpen: boolean;
    addingEntry: boolean;
    isDragging: boolean;
    openSideBar: () => void;
    closeSideBar: () => void;
    handleAddingEntry: (value: boolean) => void;
    handleDraggingCard: (value: boolean) => void;
}


export const UIContext = createContext({} as ContextProps)