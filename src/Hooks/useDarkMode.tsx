import { useEffect, useState } from "react"

export const useDarkMode = () =>{
    const [theme, setTheme] = useState("light")
    let colorTheme = theme === "dark" ? "light" : "dark"

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove(colorTheme)
        root.classList.add(theme)
    }, [theme, colorTheme])

    return [colorTheme, setTheme] as const 
}