
interface CountryLinkProps{
    name: string;
}

export const CountryLink = (props : CountryLinkProps) =>{
    return(
        <span className="px-4 py-1 border border-gray-400 rounded">{props.name}</span>
    )
}