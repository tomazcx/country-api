import { Route, Routes } from "react-router-dom"
import { CountryPage } from "./pages/CountryPage"
import { Home } from "./pages/Home"

export const Router = () =>{
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:country" element={<CountryPage />} />
        </Routes>
    )
}