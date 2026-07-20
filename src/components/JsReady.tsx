"use client";

import { useEffect } from "react";

/** Marks the document so CSS can hide reveal items only when JS is ready. */
export function JsReady() {
  useEffect(() => {
    document.documentElement.classList.add("js-ready");
  }, []);
  return null;
}
