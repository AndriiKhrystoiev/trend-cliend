"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format, parse } from "date-fns"
import { Calendar as CalendarIcon, X, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface DateTimeRangePickerProps {
  className?: string
  onDateTimeChange?: (from: Date | undefined, to: Date | undefined) => void
}

export function DateTimeRangePicker({
  className,
  onDateTimeChange
}: DateTimeRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [dateInput, setDateInput] = React.useState("")
  const [fromTime, setFromTime] = React.useState("00:00:00")
  const [toTime, setToTime] = React.useState("00:00:00")
  const [isFocused, setIsFocused] = React.useState(false)

  const handleClearInput = () => {
    setDateInput("")
    setDate(undefined)
  }

  const handleClear = () => {
    setDate(undefined)
    setDateInput("")
    setFromTime("00:00:00")
    setToTime("00:00:00")
    onDateTimeChange?.(undefined, undefined)
  }

  const handleToday = () => {
    const today = new Date()
    setDate(today)
    setDateInput(format(today, "MM/dd/yyyy"))
    onDateTimeChange?.(today, today)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setDateInput(format(selectedDate, "MM/dd/yyyy"))
      onDateTimeChange?.(selectedDate, selectedDate)
    }
  }

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDateInput(value)

    // Try to parse the date from input
    try {
      const parsedDate = parse(value, "MM/dd/yyyy", new Date())
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate)
        onDateTimeChange?.(parsedDate, parsedDate)
      }
    } catch {
      // Invalid date, ignore
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "size-8 bg-neutral-25 border-neutral-50 rounded p-0",
            className
          )}
        >
          <CalendarIcon className="size-4 text-neutral-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[297px] p-0 bg-transparent shadow-none border-0"
        align="start"
      >
        <div className="flex flex-col gap-3">
          {/* Date Input Field - Above dropdown */}
          <div className="w-full pt-4">
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400 pointer-events-none z-10" />
              <input
                type="text"
                value={dateInput}
                onChange={handleDateInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="MM/DD/YYYY"
                className={cn(
                  "w-full h-10 pl-10 pr-10 bg-white border rounded-[4px] transition-all text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none",
                  isFocused
                    ? "border-primary-400 shadow-[0px_0px_0px_3px_#c3c7ec]"
                    : "border-neutral-200"
                )}
              />
              {dateInput && (
                <button
                  onClick={handleClearInput}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 z-10"
                >
                  <X className="size-5" />
                </button>
              )}
            </div>
          </div>

          {/* Dropdown Content */}
          <div className="p-5 pt-0 flex flex-col gap-4 shadow-lg rounded-[4px] border border-neutral-50 bg-white">
            {/* Calendar */}
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="p-0"
              classNames={{
                months: "flex flex-col",
                month: "space-y-2",
                caption: "flex justify-between items-center py-0",
                caption_label: "text-sm font-semibold text-neutral-900",
                nav: "flex items-center gap-1",
                nav_button: "size-8 bg-transparent p-0 hover:bg-neutral-50 rounded",
                nav_button_previous: "",
                nav_button_next: "",
                table: "w-full border-collapse",
                head_row: "flex",
                head_cell: "text-neutral-800 w-9 font-semibold text-xs text-center",
                row: "flex w-full",
                cell: "size-9 text-center text-xs p-0 relative focus-within:relative focus-within:z-20",
                day: "size-9 p-0 font-semibold text-xs hover:bg-neutral-50 rounded-lg text-neutral-900",
                day_selected: "bg-primary-700 text-white hover:bg-primary-700 rounded-lg",
                day_today: "bg-neutral-100 text-neutral-900 rounded-lg",
                day_outside: "text-neutral-300",
                day_disabled: "text-neutral-300",
                day_hidden: "invisible",
              }}
            />

            {/* Time Inputs */}
            <div className="flex gap-2.5">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-900">
                  From
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    placeholder="00:00:00"
                    className="h-10 bg-white border-neutral-100 text-neutral-900 text-sm pr-10 rounded-[4px]"
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-900">
                  To
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    placeholder="00:00:00"
                    className="h-10 bg-white border-neutral-100 text-neutral-900 text-sm pr-10 rounded-[4px]"
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClear}
                className="flex-1 h-10 bg-neutral-25 border-neutral-50 text-neutral-600 hover:bg-neutral-50 font-medium text-base rounded-[4px]"
              >
                Clear
              </Button>
              <Button
                onClick={handleToday}
                className="flex-1 h-10 bg-primary-700 hover:bg-primary-800 text-white font-medium text-base rounded-[4px]"
              >
                Today
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
