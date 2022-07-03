import { Link } from "react-router-dom";

interface CountryLinkProps{
    name: string;
    fun (country: string): void;
}

export const CountryLink = (props : CountryLinkProps) =>{
    return(
        <Link to={`/country/${props.name}`} onClick={() => props.fun(props.name)} className="px-4 py-1 border border-gray-400 rounded">{props.name}</Link>
    )
}