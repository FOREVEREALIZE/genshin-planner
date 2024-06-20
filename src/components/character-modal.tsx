import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import LabeledCheckbox from "@/components/labeled-checkbox";
import React, {useContext, useEffect} from "react";
import {StoreContext} from "@/lib/store-context";

export default function CharacterModal({ name, ch_id }: { name: string, ch_id: string }) {
    const {store, setStore} = useContext(StoreContext)

    const [level_0_20, setLevel_0_20] = React.useState(false)
    const [ascension_20, setAscension_20] = React.useState(false)
    const [level_20_40, setLevel_20_40] = React.useState(false)
    const [ascension_40, setAscension_40] = React.useState(false)
    const [level_40_50, setLevel_40_50] = React.useState(false)
    const [ascension_50, setAscension_50] = React.useState(false)
    const [level_50_60, setLevel_50_60] = React.useState(false)
    const [ascension_60, setAscension_60] = React.useState(false)
    const [level_60_70, setLevel_60_70] = React.useState(false)
    const [ascension_70, setAscension_70] = React.useState(false)
    const [level_70_80, setLevel_70_80] = React.useState(false)
    const [ascension_80, setAscension_80] = React.useState(false)
    const [level_80_90, setLevel_80_90] = React.useState(false)

    useEffect(() => {
        if (!store.characters[ch_id]) {
            setStore(store.stEx(store.createCharacter, ch_id))
        }
    }, []);

    useEffect(() => {
        const status = store.getCharacterStatus(ch_id)

        if (status) {
            setLevel_0_20(status.level_0_20)
            setAscension_20(status.ascension_20)
            setLevel_20_40(status.level_20_40)
            setAscension_40(status.ascension_40)
            setLevel_40_50(status.level_40_50)
            setAscension_50(status.ascension_50)
            setLevel_50_60(status.level_50_60)
            setAscension_60(status.ascension_60)
            setLevel_60_70(status.level_60_70)
            setAscension_70(status.ascension_70)
            setLevel_70_80(status.level_70_80)
            setAscension_80(status.ascension_80)
            setLevel_80_90(status.level_80_90)
        }
    }, [ch_id, store]);

    useEffect(() => {
        setStore(store.stEx(store.setCharacterStatus, ch_id, {
            level_0_20: level_0_20,
            ascension_20: ascension_20,
            level_20_40: level_20_40,
            ascension_40: ascension_40,
            level_40_50: level_40_50,
            ascension_50: ascension_50,
            level_50_60: level_50_60,
            ascension_60: ascension_60,
            level_60_70: level_60_70,
            ascension_70: ascension_70,
            level_70_80: level_70_80,
            ascension_80: ascension_80,
            level_80_90: level_80_90
        }))
    }, [
        level_0_20,
        ascension_20,
        level_20_40,
        ascension_40,
        level_40_50,
        ascension_50,
        level_50_60,
        ascension_60,
        level_60_70,
        ascension_70,
        level_70_80,
        ascension_80,
        level_80_90,
        setStore,
        ch_id
    ])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="h-24 w-72 flex flex-row gap-2">
                    <span>{name}</span>
                    <ArrowRight />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Select Completed Stages</DialogTitle>
                    <DialogDescription>
                        {name}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col">
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setLevel_0_20(checked)
                    }} checked={level_0_20}>
                        Level 0 <ArrowRight/> 20
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setAscension_20(checked)
                    }} checked={ascension_20}>
                        Ascension 20 <ArrowRight/> 20+
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setLevel_20_40(checked)
                    }} checked={level_20_40}>
                        Level 20 <ArrowRight/> 40
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setAscension_40(checked)
                    }} checked={ascension_40}>
                        Ascension 40 <ArrowRight/> 40+
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setLevel_40_50(checked)
                    }} checked={level_40_50}>
                        Level 40 <ArrowRight/> 50
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setAscension_50(checked)
                    }} checked={ascension_50}>
                        Ascension 50 <ArrowRight/> 50+
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setLevel_50_60(checked)
                    }} checked={level_50_60}>
                        Level 50 <ArrowRight/> 60
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setAscension_60(checked)
                    }} checked={ascension_60}>
                        Ascension 60 <ArrowRight/> 60+
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setLevel_60_70(checked)
                    }} checked={level_60_70}>
                        Level 60 <ArrowRight/> 70
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setAscension_70(checked)
                    }} checked={ascension_70}>
                        Ascension 70 <ArrowRight/> 70+
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setLevel_70_80(checked)
                    }} checked={level_70_80}>
                        Level 70 <ArrowRight/> 80
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setAscension_80(checked)
                    }} checked={ascension_80}>
                        Ascension 80 <ArrowRight/> 80+
                    </LabeledCheckbox>
                    <LabeledCheckbox onCheckedChange={(checked: boolean | "indeterminate") => {
                        if (checked == "indeterminate") return
                        setLevel_80_90(checked)
                    }} checked={level_80_90}>
                        Level 80 <ArrowRight/> 90
                    </LabeledCheckbox>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit">Apply</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
