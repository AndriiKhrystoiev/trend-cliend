"use client";

import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AnnotationCard } from "@/components/ui/annotation-card";

const mockAnnotations = [
  {
    id: "1",
    name: "Thomas Lean",
    initials: "TL",
    timestamp: "2 hours ago",
    message:
      "Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure your design system! This is the second session of our new webinar series on #DesignSystems discussions where we'll be speaking about Measurement.",
  },
  {
    id: "2",
    name: "Lili Evans",
    initials: "LE",
    timestamp: "3 hours ago",
    message:
      "Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure your design system! This is the second session of our new webinar series on #DesignSystems discussions where we'll be speaking about Measurement.",
  },
  {
    id: "3",
    name: "Devid Mobin",
    initials: "DM",
    timestamp: "22.09.2025 13:00",
    message:
      "Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure your design system! This is the second session of our new webinar series on #DesignSystems discussions where we'll be speaking about Measurement.",
  },
  {
    id: "4",
    name: "Harry Luis",
    initials: "HL",
    timestamp: "22.09.2025 11:35",
    message:
      "Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure your design system! This is the second session of our new webinar series on #DesignSystems discussions where we'll be speaking about Measurement.",
  },
];

interface AnnotationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AnnotationsModal({ open, onOpenChange }: AnnotationsModalProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="sm:max-w-130 w-full p-0 gap-0 border-l border-neutral-100"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <SheetTitle className="text-xl font-semibold text-neutral-900">
            Annotation
          </SheetTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </SheetHeader>

        {/* Annotations list */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col">
          {mockAnnotations.map((annotation, index) => (
            <AnnotationCard
              key={annotation.id}
              name={annotation.name}
              initials={annotation.initials}
              timestamp={annotation.timestamp}
              message={annotation.message}
              showConnector={index < mockAnnotations.length - 1}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
