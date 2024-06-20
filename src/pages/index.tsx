import React, {useContext} from "react";
import CharacterModal from "@/components/character-modal";
import {StoreContext} from "@/lib/store-context";
import {Minus, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Dialog, DialogClose, DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import Store from "@/lib/store";

export default function Home() {
    const {store, setStore} = useContext(StoreContext)

    return (
        <div className="flex flex-col h-screen p-8 bg-black gap-8">
            <div className="flex flex-row h-8 gap-8">
                <Button onClick={() => {
                    localStorage.setItem("store", store.serialize())
                }}>Save</Button>
                <Button variant="secondary" onClick={() => {
                    if (!localStorage.getItem("store")) return
                    setStore(store.stEx(store.deserialize, localStorage.getItem("store") as string))
                }}>Load</Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Clear</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] !bg-red-700">
                        <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                            <DialogDescription>
                                This will clear all your data. This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="submit" onClick={() => {
                                    localStorage.clear()
                                    setStore(new Store())
                                }}>Clear</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-row h-24 gap-8">
                <CharacterModal name="Neuvillette" ch_id="neuvillette"/>
                <CharacterModal name="Bennett" ch_id="bennett"/>
            </div>
            <div className="flex flex-row gap-8">
                <div className="grid grid-cols-4 w-[calc(100%/3)]">
                    {Object.entries(store.getRequiredAscensionMaterialsForAllCharacters()).map(([it_key, it_value]) => {
                        return <>
                            <h2 className="col-span-2">
                                {it_key.split("_").map(value => {
                                    return value.charAt(0).toUpperCase() + value.slice(1)
                                }).join(" ")}
                            </h2>
                            <div className="flex flex-row gap-4 justify-center items-center">
                                <Minus
                                    className={`cursor-pointer transition-all duration-1000 ${store.getAscensionMaterialCount(it_key) <= 0 ? "text-neutral-600" : ""}`}
                                    onClick={() => {
                                        if (store.getAscensionMaterialCount(it_key) <= 0) return
                                        setStore(store.stEx(store.setAscensionMaterialCount, it_key, store.getAscensionMaterialCount(it_key) - 1))
                                    }}/>
                                <Plus
                                    className={`cursor-pointer transition-all duration-1000 ${store.getAscensionMaterialCount(it_key) >= it_value ? "text-neutral-600" : ""}`}
                                    onClick={() => {
                                        if (store.getAscensionMaterialCount(it_key) >= it_value) return
                                        setStore(store.stEx(store.setAscensionMaterialCount, it_key, store.getAscensionMaterialCount(it_key) + 1))
                                    }}/>
                            </div>
                            <span className="w-full flex flex-row justify-end items-center">
                                <span
                                    className={`select-none transition-all duration-1000 ${store.getAscensionMaterialCount(it_key) >= it_value ? "text-neutral-600 text-sm" : "text-white text-base"}`}>
                                    {store.getAscensionMaterialCount(it_key)}
                                </span>
                                <span className="w-1"/>
                                <span className="text-neutral-600 text-sm select-none">/{it_value}</span>
                            </span>
                        </>
                    })}
                </div>
                <div className="grid grid-cols-5 w-1/2 grid-rows-4 h-min">
                    <h2 className="col-span-3 h-min">
                        EXP
                    </h2>
                    <span className="w-full flex flex-row justify-end items-center h-min col-span-2">
                        <span
                            className={`select-none transition-all duration-1000 ${store.getCurrentExp() >= store.getRequiredExpForAllCharacters() ? "text-neutral-600 text-sm" : "text-white text-base"}`}
                        >
                            {store.getCurrentExp()}
                        </span>
                        <span className="w-1"/>
                        <span className="text-neutral-600 text-sm select-none">
                            /{store.getRequiredExpForAllCharacters()}
                        </span>
                    </span>

                    <h2 className="col-span-2 h-min">
                        Hero&apos;s Wit
                    </h2>
                    <div className="flex flex-row gap-4 justify-center items-center h-min">
                        <Minus
                            className={`cursor-pointer transition-all duration-1000 ${store.getExpMaterialCount("heros_wit") <= 0 ? "text-neutral-600" : ""}`}
                            onClick={() => {
                                if (store.getExpMaterialCount("heros_wit") <= 0) return
                                setStore(store.stEx(store.setExpMaterialCount, "heros_wit", store.getExpMaterialCount("heros_wit") - 1))
                            }}/>
                        <Plus
                            className={`cursor-pointer transition-all duration-1000 ${store.getExpMaterialCount("heros_wit") >= Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("heros_wit")) / 20000) ? "text-neutral-600" : ""}`}
                            onClick={() => {
                                if (store.getExpMaterialCount("heros_wit") >= Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("heros_wit")) / 20000)) return
                                setStore(store.stEx(store.setExpMaterialCount, "heros_wit", store.getExpMaterialCount("heros_wit") + 1))
                            }}/>
                    </div>
                    <span className="w-full flex flex-row justify-end items-center h-min col-span-2">
                        <span
                            className={`select-none transition-all duration-1000 ${store.getExpMaterialCount("heros_wit") >= Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("heros_wit")) / 20000) ? "text-neutral-600 text-sm" : "text-white text-base"}`}
                        >
                            {store.getExpMaterialCount("heros_wit")}
                        </span>
                        <span className="w-1"/>
                        <span className="text-neutral-600 text-sm select-none">
                            /{Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("heros_wit")) / 20000)}
                        </span>
                    </span>

                    <h2 className="col-span-2 h-min">
                        Adventurer&apos;s Experience
                    </h2>
                    <div className="flex flex-row gap-4 justify-center items-center h-min">
                        <Minus
                            className={`cursor-pointer transition-all duration-1000 ${store.getExpMaterialCount("adventurers_experience") <= 0 ? "text-neutral-600" : ""}`}
                            onClick={() => {
                                if (store.getExpMaterialCount("adventurers_experience") <= 0) return
                                setStore(store.stEx(store.setExpMaterialCount, "adventurers_experience", store.getExpMaterialCount("adventurers_experience") - 1))
                            }}/>
                        <Plus
                            className={`cursor-pointer transition-all duration-1000 ${store.getExpMaterialCount("adventurers_experience") >= Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("adventurers_experience")) / 5000) ? "text-neutral-600" : ""}`}
                            onClick={() => {
                                if (store.getExpMaterialCount("adventurers_experience") >= Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("adventurers_experience")) / 5000)) return
                                setStore(store.stEx(store.setExpMaterialCount, "adventurers_experience", store.getExpMaterialCount("adventurers_experience") + 1))
                            }}/>
                    </div>
                    <span className="w-full flex flex-row justify-end items-center h-min col-span-2">
                        <span
                            className={`select-none transition-all duration-1000 ${store.getExpMaterialCount("adventurers_experience") >= Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("adventurers_experience")) / 5000) ? "text-neutral-600 text-sm" : "text-white text-base"}`}
                        >
                            {store.getExpMaterialCount("adventurers_experience")}
                        </span>
                        <span className="w-1"/>
                        <span className="text-neutral-600 text-sm select-none">
                            /{Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("adventurers_experience")) / 5000)}
                        </span>
                    </span>

                    <h2 className="col-span-2 h-min">
                        Wanderer&apos;s Advice
                    </h2>
                    <div className="flex flex-row gap-4 justify-center items-center h-min">
                        <Minus
                            className={`cursor-pointer transition-all duration-1000 ${store.getExpMaterialCount("wanderers_advice") <= 0 ? "text-neutral-600" : ""}`}
                            onClick={() => {
                                if (store.getExpMaterialCount("wanderers_advice") <= 0) return
                                setStore(store.stEx(store.setExpMaterialCount, "wanderers_advice", store.getExpMaterialCount("wanderers_advice") - 1))
                            }}/>
                        <Plus
                            className={`cursor-pointer transition-all duration-1000 ${store.getExpMaterialCount("wanderers_advice") >= Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("wanderers_advice")) / 1000) ? "text-neutral-600" : ""}`}
                            onClick={() => {
                                if (store.getExpMaterialCount("wanderers_advice") >= Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("wanderers_advice")) / 1000)) return
                                setStore(store.stEx(store.setExpMaterialCount, "wanderers_advice", store.getExpMaterialCount("wanderers_advice") + 1))
                            }}/>
                    </div>
                    <span className="w-full flex flex-row justify-end items-center h-min col-span-2">
                        <span
                            className={`select-none transition-all duration-1000 ${store.getExpMaterialCount("wanderers_advice") >= Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("wanderers_advice")) / 1000) ? "text-neutral-600 text-sm" : "text-white text-base"}`}
                        >
                            {store.getExpMaterialCount("wanderers_advice")}
                        </span>
                        <span className="w-1"/>
                        <span className="text-neutral-600 text-sm select-none">
                            /{Math.ceil((store.getRequiredExpForAllCharacters() - store.getCurrentExpWithoutMaterial("wanderers_advice")) / 1000)}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
