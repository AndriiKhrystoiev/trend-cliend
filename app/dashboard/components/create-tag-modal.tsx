"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomAggregationTagModal } from "@/app/dashboard/components/custom-aggregation-tag-modal";

interface CreateTagModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (tagType: string) => void;
}

export function CreateTagModal({ open, onOpenChange, onSubmit }: CreateTagModalProps) {
  const [tagType, setTagType] = useState<string>("");
  const [isCustomAggregationModalOpen, setIsCustomAggregationModalOpen] = useState(false);

  const handleSubmit = () => {
    if (tagType === "custom-aggregation") {
      setTagType("");
      onOpenChange(false);
      setIsCustomAggregationModalOpen(true);
      return;
    }

    if (tagType) {
      onSubmit?.(tagType);
    }
    setTagType("");
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!max-w-[345px] p-6 gap-0">
          {/* Header */}
          <DialogHeader className="flex flex-row items-center justify-between mb-5">
            <DialogTitle className="text-xl font-semibold text-neutral-900">
              Create a tag
            </DialogTitle>
          </DialogHeader>

          {/* Tag Type Select */}
          <div className="flex flex-col gap-1.5 mb-5">
            <label className="text-sm font-semibold text-neutral-700">Tag Type</label>
            <Select value={tagType} onValueChange={setTagType}>
              <SelectTrigger className="h-10 border-neutral-100 rounded-sm">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="derived">Derived Tag</SelectItem>
                <SelectItem value="custom-aggregation">Custom Aggregation Tag</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Create Button */}
          <Button
            variant="default"
            size="lg"
            onClick={handleSubmit}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white text-base"
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>

      {/* Custom Aggregation Tag Modal */}
      <CustomAggregationTagModal
        open={isCustomAggregationModalOpen}
        onOpenChange={setIsCustomAggregationModalOpen}
      />
    </>
  );
}
