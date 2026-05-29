import { AxiosAdapter } from "../common/axios.adapter";
import type { PokemonDetails } from "../interfaces";
import type { PokemonList } from "../interfaces/pokemon-list.interface";


export class PokeApiService {

    POKE_API_BASE_URL: string = 'https://pokeapi.co/api/v2/pokemon';

    private readonly httpClient: AxiosAdapter;

    constructor(httpClient: AxiosAdapter) {
        this.httpClient = httpClient;
    }

    async getPokemonList(limit: number = 5, offset: number = 0): Promise<PokemonList> {
        const response = await this.httpClient.get<PokemonList>(`${this.POKE_API_BASE_URL}?limit=${limit}&offset=${offset}`);
        return response;
    }

    async getPokemonInfo(id: number): Promise<PokemonDetails> {
        const response = await this.httpClient.get<PokemonDetails>(`${this.POKE_API_BASE_URL}/${id}/`);
        return response;
    }


}