import { useQuery } from '@tanstack/react-query'
import { PokeApiService } from '../services/pokemon.service'
import { AxiosAdapter } from '../common/axios.adapter'
import type { PokemonDetails } from '../interfaces'

const pokeApiService = new PokeApiService(new AxiosAdapter())

export const usePokemonDetail = (id: number) => {
    return useQuery<PokemonDetails>({
        queryKey: ['pokemonDetail', id],
        queryFn: () => pokeApiService.getPokemonInfo(id),
        staleTime: 1000 * 60 * 5,
    })
}