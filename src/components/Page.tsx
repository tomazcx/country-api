import { MagnifyingGlass } from "phosphor-react"
import { Country } from "./Country"
import axios from 'axios'
import { useEffect, useState } from "react"

interface CountryPageInterface {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
}


export const Page = () => {

    const [countriesList, setCountries] = useState<CountryPageInterface[]>([])
    const [inputText, setText] = useState("")
    const [searchedByName, setSearched] = useState(false)
    const [arrayToRender, setArray] = useState<CountryPageInterface[]>(countriesList)

    useEffect(() => {
        getCountries()
    }, [])


    async function getCountries() {
        const result = await axios.get("https://restcountries.com/v2/all?fields=name,capital,region,population,flag")
        const data = await result.data

        const countries: CountryPageInterface[] = []
        let count = 0;
        data.forEach((country: any) => {
            count += 1;
            const capital = country.capital ?? "Not identified"
            const countryObj: CountryPageInterface = {
                name: country.name,
                population: country.population,
                region: country.region,
                capital: capital,
                flag: country.flag
            }
            countries.push(countryObj)
        })
        setCountries(countries)
        setArray(countries)

    }


    const renderByRegion = (region: number) => {
        switch (region) {
            case 1:
                const africaCountries = countriesList.filter(country => country.region === "Africa")
                searchCountry(inputText, africaCountries)
                break;
            case 2:
                const americaCountries = countriesList.filter(country => country.region === "Americas")
                searchCountry(inputText, americaCountries)
                break;
            case 3:
                const asiaCountries = countriesList.filter(country => country.region === "Asia")
                searchCountry(inputText, asiaCountries)
                break;
            case 4:
                const europeCountries = countriesList.filter(country => country.region === "Europe")
                searchCountry(inputText, europeCountries)
                break;
            case 5:
                const oceaniaCountries = countriesList.filter(country => country.region === "Oceania")
                searchCountry(inputText, oceaniaCountries)
                break;
            default:
                searchCountry(inputText, countriesList)
                break;
        }
    }

    const searchCountry = (country : string, array : CountryPageInterface[]) =>{
        const countryLower = country.toLowerCase()

        const newArray = array.filter(item => {
            const itemName = item.name.toLowerCase()
            if(itemName.includes(countryLower)){
                return item
            }
        })
       
        setArray(newArray)
    }

    return (
        <main className="w-11/12">
            <div className="flex flex-col gap-8 sm:justify-between sm:items-center sm:flex-row">
                <div className="dark:bg-blue-700 transition-colors bg-gray-200 shadow-md flex items-center gap-4 rounded-md p-4 w-full sm:w-[400px]">
                    <MagnifyingGlass size={20} className="cursor-pointer" onClick={() =>  searchCountry(inputText, arrayToRender)} />
                    <input type="text" onKeyDown={e => {
                        if(e.key === "Enter"){
                            searchCountry(inputText, arrayToRender)
                        }
                    }} onChange={e => setText(e.target.value)} className="outline-none bg-transparent" placeholder="Search for a country" />
                </div>

                <select onChange={e => renderByRegion(Number(e.target.value))} name="region" id="region" className="dark:bg-blue-700 transition-colors bg-gray-200 outline-none p-4 w-[250px] border-none rounded shadow-md" placeholder="Filter by region">
                    <option value="0">All</option>
                    <option value="1">Africa</option>
                    <option value="2">Americas</option>
                    <option value="3">Asia</option>
                    <option value="4">Europe</option>
                    <option value="5">Oceania</option>
                </select>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12 ">
                {arrayToRender.map(country => <Country key={country.name} name={country.name} population={country.population} region={country.region} capital={country.capital} img={country.flag} />)}
            </div>
        </main>
    )
}