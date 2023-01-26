import { UIState } from "./";

type UIActionType = 
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - adding entry', payload: boolean }
    | { type: 'UI - dragging card', payload: boolean }

export const uiReducer = (state: UIState, action: UIActionType ): UIState => {
    
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true
            }
        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false
            }
        case 'UI - adding entry':
            return {
                ...state,
                addingEntry: action.payload
            }
        case 'UI - dragging card':
            return {
                ...state,
                isDragging: action.payload
            }
        default:
            return state
    }
}