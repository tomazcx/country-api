import { Link } from "react-router-dom";

interface CountryInterface {
    img: string;
    name: string;
    population: number;
    region: string;
    capital: string;
}

export const Country = (props: CountryInterface) => {
    return (
        <Link to={`/country/${props.name}`} className="mx-auto mb-12 flex max-w-[250px] flex-col items-center cursor-pointer shadow-lg">
            <img src={props.img} alt="Country flag" className="rounded-t-lg w-[40rem] h-[10rem] object-cover" />
                <div className="grow flex flex-col p-6 rounded-b-md gap-4 w-full bg-gray-200 dark:bg-blue-700 transition-colors">
                    <strong className="font-bold text-lg">{props.name}</strong>
                    <div className="flex flex-col text-sm">
                        <span><span className="font-bold">Population: </span> <span>{props.population}</span> </span>
                        <span><span className="font-bold">Region: </span> <span>{props.region}</span> </span>
                        <span><span className="font-bold">Capital: </span> <span>{props.capital}</span> </span>
                    </div>

                </div>
        </Link>
    )
}