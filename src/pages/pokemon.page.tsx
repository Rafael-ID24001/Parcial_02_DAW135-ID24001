import { useEffect, useState } from "react";
import { BasicCard, LoadingIndicator, Paginator, type PaginatorProps,  } from "../components";
import { PokeApiService } from "../services/pokemon.service";
import { AxiosAdapter } from "../common/axios.adapter";
import type { PokemonInfo } from "../interfaces/pokemon-list.interface";
import { sleep, pokemonApiToPokemonInfo } from "../utils";

const pokeApiService = new PokeApiService(new AxiosAdapter());

export const PokemonPage = () => {
    const [pokemonList, setPokemonList] = useState<PokemonInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentOffset, setCurrentOffset] = useState<number>(0);
    const [paginator, setPaginator] = useState<PaginatorProps>({});

    const LIMIT = 12;

    useEffect(() => {  fetchPokemon(0);  }, []);

    const fetchPokemon = async (offset: number) => {

        setLoading(true);

        await sleep(2000);

        const response = await pokeApiService.getPokemonList(LIMIT, offset);
        const pokemonList = pokemonApiToPokemonInfo(response.results);
        setPokemonList(pokemonList);

        setCurrentOffset(offset);
        setPaginator({ from: offset + 1, to: offset + LIMIT, total: response.count });

        setLoading(false);
    };

    const nextPage = () => {
        const newOffset = currentOffset + LIMIT;
        fetchPokemon(newOffset);
    };

    const previousPage = () => {
        const newOffset = Math.max(0, currentOffset - LIMIT);
        fetchPokemon(newOffset);
    };

    if (loading) {
        return <LoadingIndicator messageLoader="Cargando Pokémon..." />
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
                    <Paginator
                        from={paginator.from}
                        to={paginator.to}
                        total={paginator.total}
                        onNext={nextPage}
                        onPrevious={previousPage}
                        hasPrevious={currentOffset > 0}
                        hasNext={paginator.to! < paginator.total!}
                    />
                </div>
            </div>
        </>
    )
}
