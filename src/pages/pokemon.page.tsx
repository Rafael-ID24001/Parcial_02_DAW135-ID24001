import { useState } from "react";
import { BasicCard, ErrorDisplay, LoadingIndicator, Paginator } from "../components";
import { usePokemonList } from "../hooks/usePokemonList";

export const PokemonPage = () => {
    const [currentOffset, setCurrentOffset] = useState<number>(0);

    const LIMIT = 12;

    const { data, isLoading, isError, error, refetch } = usePokemonList(LIMIT, currentOffset);

    const pokemonList = data?.pokemonList ?? [];
    const totalCount = data?.count ?? 0;

    if (isLoading) {
        return <LoadingIndicator messageLoader="Cargando Pokémon..." />
    }

    if (isError) {
        return (
            <ErrorDisplay title="Error al cargar los Pokémon" message={error?.message} onRetry={() => refetch()} />
        );
    }

    const nextPage = () => {
        const newOffset = currentOffset + LIMIT;
        setCurrentOffset(newOffset);
    };

    const previousPage = () => {
        const newOffset = Math.max(0, currentOffset - LIMIT);
        setCurrentOffset(newOffset);
    };

    return (
        <>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">Pokémon</h1>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {pokemonList.map((pokemon) => (
                                <BasicCard key={pokemon.id} title={pokemon.name} id={pokemon.id} />
                            ))}
                        </div>
                        <Paginator
                            from={currentOffset + 1}
                            to={currentOffset + LIMIT}
                            total={totalCount}
                            onNext={nextPage}
                            onPrevious={previousPage}
                            hasPrevious={currentOffset > 0}
                            hasNext={currentOffset + LIMIT < totalCount}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}