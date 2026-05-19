"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "./cn";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <button
        aria-label="Close modal"
        className="fixed inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "nv-card fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5",
          "shadow-[0_30px_120px_rgba(0,0,0,0.6)]",
          "max-h-[calc(100vh-2rem)] overflow-auto"
        )}
      >
        <div className="space-y-1">
          <p className="text-base font-semibold text-white">{title}</p>
          {description ? (
            <p className="text-sm text-white/60">{description}</p>
          ) : null}
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
