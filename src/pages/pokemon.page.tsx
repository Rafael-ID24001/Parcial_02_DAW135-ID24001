import { useEffect, useState } from "react";
import { BasicCard } from "../components";
import { PokeApiService } from "../services/pokemon.service";
import { AxiosAdapter } from "../common/axios.adapter";
import type { PokemonInfo } from "../interfaces/pokemon-list.interface";
import { sleep } from "../utils/utils";

const pokeApiService = new PokeApiService(new AxiosAdapter());

export const PokemonPage = () => {
    const [pokemonList, setPokemonList] = useState<PokemonInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPokemon = async () => {

            await sleep(2000);

            try {
                const data = await pokeApiService.getPokemonList(12, 0);
                setPokemonList(data);
            } catch (error) {
                console.error("Error fetching pokemon:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    if (loading) {
        return <p className="text-center mt-4">Cargando Pokémon...</p>;
    }

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Pokémon</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {pokemonList.map((pokemon) => (
                            <BasicCard key={pokemon.id} title={pokemon.name} id={pokemon.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
