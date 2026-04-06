"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

function shouldIgnoreDevWarning(message: string) {
    return (
        message.includes("Encountered a script tag while rendering React component") ||
        (message.includes("A tree hydrated but some attributes of the server rendered HTML didn't match") &&
            (message.includes("monica-id") || message.includes("monica-version")))
    )
}

// Suppress React 19 "Encountered a script tag" warning for next-themes in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const originalError = console.error
    console.error = function(...args: any[]) {
        if (typeof args[0] === "string" && shouldIgnoreDevWarning(args[0])) {
            return
        }
        originalError.apply(console, args)
    }
}

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}