"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/ui/color-picker";

interface CustomAggregationTagModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CustomAggregationTagFormData) => void;
}

interface CustomAggregationTagFormData {
  tagName: string;
  formula: string;
  unit: string;
  axis: string;
  num: string;
  weight: string;
  style: string;
  color: string;
  description: string;
}

const DEFAULT_COLOR = "#22c55e";

export function CustomAggregationTagModal({
  open,
  onOpenChange,
  onSubmit,
}: CustomAggregationTagModalProps) {
  const [tagName, setTagName] = useState("");
  const [formula, setFormula] = useState("");
  const [unit, setUnit] = useState("");
  const [axis, setAxis] = useState("");
  const [num, setNum] = useState("");
  const [weight, setWeight] = useState("1px");
  const [style, setStyle] = useState("solid");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setTagName("");
    setFormula("");
    setUnit("");
    setAxis("");
    setNum("");
    setWeight("1px");
    setStyle("solid");
    setColor(DEFAULT_COLOR);
    setDescription("");
  };

  const handleSubmit = () => {
    onSubmit?.({
      tagName,
      formula,
      unit,
      axis,
      num,
      weight,
      style,
      color,
      description,
    });
    resetForm();
    onOpenChange(false);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      resetForm();
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-116 p-6 gap-0 overflow-hidden [&>button]:hidden">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between mb-5">
          <DialogTitle className="text-xl font-semibold text-neutral-900">
            Tag details
          </DialogTitle>
          <button
            onClick={() => handleOpenChange(false)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </DialogHeader>

        {/* Form fields */}
        <div className="space-y-4 overflow-y-auto max-sm:max-h-100 pr-1">
          {/* Tag Name */}
          <Input
            label="Tag name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Enter tag name"
            size="lg"
          />

          {/* Formula */}
          <Input
            label="Formula"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            placeholder="Enter formula"
            size="lg"
          />

          {/* Unit, Axis, Num row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-700">Unit</label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="h-10 border-neutral-100 rounded-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="psi">PSI</SelectItem>
                  <SelectItem value="celsius">°C</SelectItem>
                  <SelectItem value="fahrenheit">°F</SelectItem>
                  <SelectItem value="percent">%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-700">Axis</label>
              <Select value={axis} onValueChange={setAxis}>
                <SelectTrigger className="h-10 border-neutral-100 rounded-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="R">R</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-700">Num</label>
              <Select value={num} onValueChange={setNum}>
                <SelectTrigger className="h-10 border-neutral-100 rounded-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Weight, Style, Color row */}
          <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
            <Input
              label="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              size="lg"
            />

            <Input
              label="Style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              size="lg"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-700">Color</label>
              <div className="flex items-center justify-center px-2 py-2 border border-neutral-100 rounded-sm h-10">
                <ColorPicker color={color} onChange={setColor} />
              </div>
            </div>
          </div>

          {/* Description */}
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />

          {/* Save Button */}
          <Button
            variant="default"
            size="lg"
            onClick={handleSubmit}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white text-base mt-1"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
