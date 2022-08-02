import { Header } from "./components/Header"
import { Router } from "./Router"
import './styles/global.css'

export const App =() => {
    return(
        <div className="flex flex-col items-center gap-12 dark:text-gray-200 transition-colors">
            <Header />
            <Router />
        </div>
    )
}