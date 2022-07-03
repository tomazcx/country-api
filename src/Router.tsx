import { Route, Routes } from "react-router-dom"
import { CountryPage } from "./components/CountryPage"
import { Page } from "./components/Page"

export const Router = () =>{
    return (
        <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/country/:country" element={<CountryPage />} />
        </Routes>
    )
}