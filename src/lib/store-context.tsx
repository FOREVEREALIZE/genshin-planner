import React, {createContext} from "react";
import Store from "@/lib/store";

export const StoreContext = createContext<{
    store: Store
    setStore: React.Dispatch<React.SetStateAction<Store>>
}>({
    store: new Store(),
    setStore: () => {}
})

export const StoreProvider = ({children}: { children: React.ReactNode }) => {
    const [store, setStore] = React.useState(new Store())
    return (
        <StoreContext.Provider value={{store, setStore}}>
            {children}
        </StoreContext.Provider>
    )
}
