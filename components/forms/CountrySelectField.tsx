"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import countryList from "react-select-country-list"
import { Control, Controller, FieldError } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface CountrySelectFieldProps {
    name: string
    label?: string
    placeholder?: string
    control: Control<any>
    error?: FieldError
    className?: string
    disabled?: boolean
    required?: boolean
}

const getCountryFlag = (countryCode: string) => {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
}

const CountrySelectField = ({
    name,
    label,
    placeholder = "Select country...",
    control,
    error,
    className,
    disabled,
    required
}: CountrySelectFieldProps) => {
    const [open, setOpen] = React.useState(false)

    const options = React.useMemo(() => countryList().getData(), [])

    return (
        <div className={cn("space-y-2", className)}>
            {label && <Label htmlFor={name} className="form-label">{label}</Label>}
            <Controller
                name={name}
                control={control}
                rules={{ required: required ? `Please select ${label?.toLowerCase() || "country"}` : false }}
                render={({ field }) => {
                    const selectedLabel = options.find((country) => country.value === field.value)?.label

                    return (
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={cn(
                                        "select-trigger w-full justify-between font-normal", // Use select-trigger class
                                        !field.value && "text-muted-foreground",
                                    )}
                                    disabled={disabled}
                                >
                                    <span className="flex items-center gap-2 truncate">
                                        {field.value && <span className="text-lg leading-none">{getCountryFlag(field.value)}</span>}
                                        {selectedLabel || placeholder}
                                    </span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0 bg-gray-800 border-gray-600 text-white" align="start">
                                <Command className="bg-transparent">
                                    <CommandInput placeholder="Search country..." className="text-white placeholder:text-gray-400" />
                                    <CommandList>
                                        <CommandEmpty>No country found.</CommandEmpty>
                                        <CommandGroup>
                                            {options.map((country) => (
                                                <CommandItem
                                                    key={country.value}
                                                    value={country.label}
                                                    onSelect={() => {
                                                        field.onChange(country.value)
                                                        setOpen(false)
                                                    }}
                                                    className="aria-selected:bg-gray-700 aria-selected:text-white"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value === country.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    <span className="flex items-center gap-2">
                                                        <span className="text-lg leading-none">{getCountryFlag(country.value)}</span>
                                                        {country.label}
                                                    </span>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    )
                }}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    )
}

export default CountrySelectField
