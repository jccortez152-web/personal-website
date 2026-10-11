"use client";

// Modal behaviour shared by DemoVideo and CaseStudy: focus moves into the
// dialog ([data-autofocus]), Tab is trapped, Esc closes, body scroll locks,
// and focus returns to the trigger on close.

import { RefObject, useEffect } from "react";

export function useDialog(
  open: boolean,
  close: () => void,
  dialogRef: RefObject<HTMLElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  onOpen?: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    onOpen?.();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusable = [
        ...dialog.querySelectorAll<HTMLElement>(
          "button, video, [href], [tabindex]:not([tabindex='-1'])",
        ),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!dialog.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
    // onOpen is intentionally excluded: it should run once per open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, close, dialogRef, triggerRef]);
}
