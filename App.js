import { App } from "expo-router/_app";
import { ThemeContextProvider } from "./utils/theme/themeProvider";

export function MyApp() {
    return (
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    )
}