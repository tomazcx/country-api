import { CountryLink } from "./CountryLink";

interface CountryInfoInterface {
    data: {
        name: string;
        nativeName: string;
        population: number;
        region: string;
        subregion: string;
        capital: string;
        topLevelDomain: string[];
        currencies: [
            {
                currencie: string;
            }
        ];
        languages: [
            {
                language: string;
            }
        ];
        borders: string[];
        flag: string;
    }

}

export const CountryInfo = ({data}: CountryInfoInterface) => {

    console.log(data.currencies)

    return (
        <div className="flex items-center w-full gap-12 flex-col sm:flex-row mb-32 justify-between">
            <img src={data?.flag} className="w-1/2" alt="Country flag" />
            <div className="flex flex-col gap-8">
                <strong className="font-bold text-3xl">{data.name}</strong>
                <div className="flex gap-12 flex-col sm:flex-row">
                    <div className="flex flex-col gap-4">
                        <span><span className="font-bold">Native name:</span> <span>{data.nativeName}</span> </span>
                        <span><span className="font-bold">Population:</span> <span>{data.population}</span> </span>
                        <span><span className="font-bold">Region:</span> <span>{data.region}</span> </span>
                        <span><span className="font-bold">Sub Region:</span> <span>{data.subregion}</span> </span>
                        <span><span className="font-bold">Capital:</span> <span>{data.capital?? 'Unknown'}</span> </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span><span className="font-bold">Top level domain:</span> <span>{data.topLevelDomain.map(domain => `${domain}`)}</span> </span>

                        <span><span className="font-bold">Currencies:</span> <span>{data.currencies.map(currencies => {
                            for(let currencie in currencies){
                                return currencies[currencie]
                            }
                            })}</span> </span>

                        <span><span className="font-bold">Languages:</span> <span>
                            {data.languages.map(languages => {
                            for(let language in languages){
                                return languages[language]
                            }
                        })}</span> </span>
                    </div>

                </div>

                <div className="flex items-center gap-4">
                    <span>Border Countries:</span>
                    <div className="flex gap-2 items-center flex-wrap">
                        {data.borders !== undefined ? data.borders.map(border => <CountryLink key={border} name={border} />) : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}