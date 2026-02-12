"use client";

import { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Annotation from "@/components/icons/annotation";

export interface ChartAnnotationData {
  id: string;
  xPercent: number;
  yPercent: number;
  author: string;
  time: string;
  message: string;
}

interface ChartAnnotationMarkerProps {
  annotation: ChartAnnotationData;
  onDelete?: (id: string) => void;
}

export function ChartAnnotationMarker({ annotation, onDelete }: ChartAnnotationMarkerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (markerRef.current && !markerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={markerRef}
      data-annotation
      className={`absolute ${isOpen ? "z-20" : "z-10"}`}
      style={{ left: `${annotation.xPercent}%`, top: `${annotation.yPercent}%` }}
    >
      {/* Annotation icon */}
      <button
        className="-translate-x-1/2 block cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Annotation width={32} height={32} color="#CED4E0" />
      </button>

      {/* Annotation card */}
      {isOpen && (
        <div className="absolute top-full -left-4 mt-0 bg-neutral-50 rounded-lg px-4 py-3 min-w-80 z-20">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-neutral-900">
                  {annotation.author}
                </span>
                <span className="text-sm text-neutral-400">{annotation.time}</span>
              </div>
              <p className="text-sm text-neutral-800 leading-relaxed">
                {annotation.message}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(annotation.id);
              }}
              className="size-8 flex items-center justify-center rounded-xs bg-neutral-25 hover:bg-neutral-100 transition-colors shrink-0"
            >
              <Trash2 className="size-4 text-neutral-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
