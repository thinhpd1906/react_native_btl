import { App } from "expo-router/_app";
import { ThemeContextProvider } from "./utils/theme/themeProvider";
import { Provider } from 'react-redux'
import store from './store'
export function MyApp() {
    return (
        <Provider store={store}>
            <ThemeContextProvider>
                <App />
            </ThemeContextProvider>
        </Provider>
    )
}