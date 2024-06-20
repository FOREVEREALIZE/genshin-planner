import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ThemeProvider} from "@/components/theme-provider";
import {StoreProvider} from "@/lib/store-context";
import Store from "@/lib/store";

const store = new Store()

export default function App({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <StoreProvider store={store}>
                <Component {...pageProps} />
            </StoreProvider>
        </ThemeProvider>
    )
}
