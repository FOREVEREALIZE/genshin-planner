import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import React, {forwardRef, useEffect, useState} from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export default forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>,
    { children: React.ReactNode, onCheckedChange?: (checked: boolean | "indeterminate") => void, checked?: boolean | "indeterminate" }>(
    function LabeledCheckbox({children, ...props}, ref) {
        const [id, setId] = useState("")

        useEffect(() => {
            setId(Math.random().toString(36).substring(7))
        }, [])

        return (
            <div className="flex flex-row gap-2 items-center">
                <Checkbox id={id} ref={ref} {...props}/>
                <Label htmlFor={id} className="flex flex-row items-center gap-1">
                    {children}
                </Label>
            </div>
        )
    })

function LabeledCheckbox({children}: {
    children: React.ReactNode,
    ref: React.RefObject<HTMLButtonElement>
}) {
    const [id, setId] = useState("")

    const ref = React.useRef<HTMLButtonElement>(null)

    useEffect(() => {
        setId(Math.random().toString(36).substring(7))
    }, [])

    return (
        <div className="flex flex-row gap-2 items-center">
            <Checkbox id={id} ref={ref}/>
            <Label htmlFor={id} className="flex flex-row items-center gap-1">
                {children}
            </Label>
        </div>
    )
}
