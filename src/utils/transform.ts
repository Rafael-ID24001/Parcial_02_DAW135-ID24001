import type { PokemonApi, PokemonInfo } from "../interfaces";

export const pokemonApiToPokemonInfo = (PokemonApiList: PokemonApi[]): PokemonInfo[] => {
    return PokemonApiList.map((p): PokemonApi => {
        const segmentsUrl = p.url.split('/');
        return {
            id: +segmentsUrl[segmentsUrl.length - 2],
            name: p.name,
            url: p.url
        } as PokemonInfo
    }) as PokemonInfo[]
}
