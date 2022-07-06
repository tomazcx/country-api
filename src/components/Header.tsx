import { Moon } from "phosphor-react"
import { Link } from "react-router-dom"
import { useDarkMode } from "../Hooks/useDarkMode"


export const Header =() =>{
    const [theme, setTheme] = useDarkMode()

    return(
        <header className="dark:bg-blue-700 transition-colors bg-gray-200 w-full flex justify-between py-5 px-6 sm:px-16 drop-shadow-md items-center">
            <h1  className="font-bold text-sm sm:text-xl">Where in the world?</h1>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => setTheme(theme)}>
                <Moon size={20} weight={theme === "light" ? "fill" : "regular"} />
                <span className="font-bold text-sm">Dark Mode</span>
            </div>
        </header>
    )
}