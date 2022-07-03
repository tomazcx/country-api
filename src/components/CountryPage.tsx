import { ArrowLeft } from "phosphor-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CountryLink } from "./CountryLink"
import axios from 'axios'

interface CountryPageInterface{
    name: string;
    native_name: string;
    population: number;
    region: string;
    sub_region: string;
    capital: string;
    domain: string;
    currencies: string;
    languages: string;
    borders: string[];
    flag: string;
}

export const CountryPage = () => {
    const country = useParams<{country : string}>()
    const [countryInfo, setCountry] = useState<CountryPageInterface>()

    useEffect(() =>{
        getCountryByParam(country.country)
    },[])

    async function getCountryByParam(countryParam : string | undefined){
        const result = await axios.get(`https://restcountries.com/v2/name/${countryParam}?fields=name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders,flag`)
        const data = await result.data[0]

        const capitalArray = data.capital?? "Not identified"
        const capital = typeof capitalArray === "string" ? capitalArray : capitalArray[0]


        const country:CountryPageInterface ={
            name: data.name,
            native_name: data.nativeName,
            population: data.population,
            region: data.region,
            sub_region: data.subregion,
            capital: capital,
            domain: data.topLevelDomain,
            currencies: data.currencies[0].name,
            languages: data.languages,
            borders: data.borders,
            flag: data.flag
        }
        console.log(country.borders)
        setCountry(country)
    }

    

    return (
        <main className="w-11/12">
            <Link to={"/"} className="dark:bg-gray-700 mb-16 w-[150px] py-3 px-8 cursor-pointer shadow-lg rounded flex gap-2 items-center bg-gray-200 transition-colors">
                <ArrowLeft /> <span>Back</span>
            </Link>

            <div className="flex items-center w-full gap-12 flex-col sm:flex-row mb-32 justify-between">
                <img src={countryInfo?.flag} className="w-1/2" alt="Country flag" />
                <div className="flex flex-col gap-8">
                    <strong className="font-bold text-3xl">{countryInfo?.name}</strong>
                    <div className="flex gap-12 flex-col sm:flex-row">
                        <div className="flex flex-col gap-4">
                            <span><span className="font-bold">Native name:</span> <span>{countryInfo?.native_name}</span> </span>
                            <span><span className="font-bold">Population:</span> <span>{countryInfo?.population}</span> </span>
                            <span><span className="font-bold">Region:</span> <span>{countryInfo?.region}</span> </span>
                            <span><span className="font-bold">Sub Region:</span> <span>{countryInfo?.sub_region}</span> </span>
                            <span><span className="font-bold">Capital:</span> <span>{countryInfo?.capital}</span> </span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span><span className="font-bold">Top level domain:</span> <span>{countryInfo?.domain}</span> </span>
                            <span><span className="font-bold">Currencies:</span> <span>{countryInfo?.currencies}</span> </span>
                            <span><span className="font-bold">Languages:</span> <span>Dutch, French, German</span> </span>
                        </div>

                    </div>

                    <div className="flex items-center gap-4">
                        <span>Border Countries:</span>
                        <div className="flex gap-2 items-center flex-wrap">
                            {countryInfo?.borders !== undefined ? countryInfo?.borders.map(border => <CountryLink name={border} fun={getCountryByParam} />) : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
