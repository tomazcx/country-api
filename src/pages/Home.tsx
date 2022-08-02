import { MagnifyingGlass } from "phosphor-react"
import { Country } from "../components/Country"
import axios from 'axios'
import { useState } from "react"
import { useQuery } from 'react-query'
import { Loading } from "../components/Loading"

interface CountryPageInterface {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
}


export const Home = () => {

    const [regionId, setRegionId] = useState("all")


    const fetchCountries = async (region: string) => {
        let result;
        if (region === 'all') {
            result = await axios.get(`https://restcountries.com/v2/all?fields=name,capital,region,population,flag`)
        } else {
            result = await axios.get(`https://restcountries.com/v2/region/${region}?fields=name,capital,region,population,flag`)
        }
        setArray(result.data)
        return result.data

    }

    const { data, isFetching, refetch } = useQuery<CountryPageInterface>(['countries', regionId], () => fetchCountries(regionId), {
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })

    const [inputText, setText] = useState("")
    const [arrayToRender, setArray] = useState<CountryPageInterface[]>(data)

    const filteredArray = inputText.length > 0 ? arrayToRender.filter(country => country.name.toLowerCase().includes(inputText)) : []


    return (
        <main className="w-11/12">
            <div className="flex flex-col gap-8 sm:justify-between sm:items-center sm:flex-row">
                <div className="dark:bg-blue-700 transition-colors bg-gray-200 shadow-md flex items-center gap-4 rounded-md p-4 w-full sm:w-[400px]">
                    <MagnifyingGlass size={20} className="cursor-pointer"
                    />
                    <input type="text"
                        onChange={e => setText(e.target.value)}
                        className="outline-none bg-transparent" placeholder="Search for a country" />
                </div>

                <select name="region" id="region" onChange={(e) => setRegionId(e.target.value)} className="dark:bg-blue-700 transition-colors bg-gray-200 outline-none p-4 w-[250px] border-none rounded shadow-md" placeholder="Filter by region">
                    <option value="all">All</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>

            </div>

            {isFetching ? <Loading /> : <></>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12 ">
                {!isFetching && inputText.length === 0 ? arrayToRender.map(country => <Country key={country.name} name={country.name} population={country.population} region={country.region} capital={country.capital} img={country.flag} />) :
                    <></>
                }
                 {!isFetching && inputText.length > 0 ? filteredArray.map(country => <Country key={country.name} name={country.name} population={country.population} region={country.region} capital={country.capital} img={country.flag} />) :
                    <></>
                }
            </div>
        </main>
    )
}