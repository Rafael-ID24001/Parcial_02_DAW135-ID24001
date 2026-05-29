import { useQuery } from '@tanstack/react-query'
import { PokeApiService } from '../services/pokemon.service'
import { AxiosAdapter } from '../common/axios.adapter'
import { pokemonApiToPokemonInfo } from '../utils/transform'
import type { PokemonInfo } from '../interfaces/pokemon-list.interface'

const pokeApiService = new PokeApiService(new AxiosAdapter())

interface PokemonListResponse {
    pokemonList: PokemonInfo[]
    count: number
}

export const usePokemonList = (limit: number, offset: number) => {
    return useQuery<PokemonListResponse>({
        queryKey: ['pokemonList', { limit, offset }],
        queryFn: async () => {
            const response = await pokeApiService.getPokemonList(limit, offset)
            const transformed = pokemonApiToPokemonInfo(response.results)
            return { pokemonList: transformed, count: response.count }
        },
        staleTime: 1000 * 60 * 5,
    })
}