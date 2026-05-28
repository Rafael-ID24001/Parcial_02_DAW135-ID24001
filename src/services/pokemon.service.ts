import { AxiosAdapter } from "../common/axios.adapter";
import type { PokemonInfo, PokemonList, PokemonApi } from "../interfaces/pokemon-list.interface";


export class PokeApiService {

    POKE_API_BASE_URL: string = 'https://pokeapi.co/api/v2/pokemon';

    private readonly httpClient: AxiosAdapter;

    constructor(httpClient: AxiosAdapter) {
        this.httpClient = httpClient;
    }

    async getPokemonList(limit: number = 5, offset: number = 0): Promise<PokemonInfo[]> {
        try {
            const pokeApiList = await this.httpClient.get<PokemonList>(`${this.POKE_API_BASE_URL}?limit=${limit}&offset=${offset}`);
            const pokeList = pokeApiList.results.map((p): PokemonApi => {
                const segmentsUrl = p.url.split('/');
                return {
                    id: +segmentsUrl[segmentsUrl.length - 2],
                    name: p.name,
                    url: p.url
                } as PokemonInfo
            }) as PokemonInfo[]

            return pokeList;

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error:", error.message);
            } else {
                console.error("Error inesperado:", error);
            }

            return []
        } finally {
        }
    }


}