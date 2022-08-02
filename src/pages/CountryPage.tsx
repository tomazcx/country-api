import { ArrowLeft } from "phosphor-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from 'react-query'
import axios from 'axios'
import { Loading } from "../components/Loading"
import { CountryInfo } from "../components/CountryInfo"


export const CountryPage = () => {
    const country = useParams<{ country: string }>()
    const [countryInfo, setCountry] = useState()

    const { data, isFetching } = useQuery(['country'], async () => {
        const url = `https://restcountries.com/v2/name/${country.country}?fields=name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders,flag`
        const result = await axios.get(url)
        console.log(result.data[0].languages)
        return result.data[0]
    }, {
        refetchOnWindowFocus: false
    })


    return (
        <main className="w-11/12">
            <Link to={"/"} className="dark:bg-gray-700 mb-16 w-[150px] py-3 px-8 cursor-pointer shadow-lg rounded flex gap-2 items-center bg-gray-200 transition-colors">
                <ArrowLeft /> <span>Back</span>
            </Link>

            {isFetching ? <Loading /> : <CountryInfo data={data}/>}

        </main>
    )
}
