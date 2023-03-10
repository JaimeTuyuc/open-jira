import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";


export const ligthTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: grey[300]
        },
        primary: {
            main: '#40148c'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        }
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#4a148c',
                },
            }
        }
    }
})