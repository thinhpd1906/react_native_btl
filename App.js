import { App } from "expo-router/_app";
import { ThemeContextProvider } from "./utils/theme/themeProvider";
import { Provider } from 'react-redux'
import {store, persistor} from './store'
import { PersistGate } from "redux-persist/integration/react";
export function MyApp() {
    return (
        <Provider store={store}>
            <ThemeContextProvider>
            <PersistGate loading={null} persistor={persistor}>
               <App />
            </PersistGate>
            </ThemeContextProvider>
        </Provider>
    )
}