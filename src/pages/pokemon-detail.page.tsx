import { useParams } from "react-router";
import { ErrorDisplay, LoadingIndicator } from "../components";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import noImage from '../assets/no-image-svgrepo-com.svg'

export const PokemonDetailPage = () => {
    const { id } = useParams();
    const { data: pokemonInfo, isLoading, isError, error, refetch } = usePokemonDetail(+id!);

    if (isLoading) {
        return <LoadingIndicator messageLoader="Cargando información..." />
    }

    if (isError) {
        return (
            <ErrorDisplay title="Error al cargar la información del Pokémon" message={error?.message} onRetry={() => refetch()} />
        );
    }

    if (!pokemonInfo || !pokemonInfo.name) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <p className="text-gray-500 text-lg">No se encontró información del Pokémon</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white py-12 sm:py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">{pokemonInfo.name}</h1>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

                            <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-50">
                                <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-50">
                                    <img
                                        src={pokemonInfo.sprites.other?.home.front_default ?? noImage}
                                        alt={pokemonInfo.name} className="object-cover w-full h-full" />
                                </div>
                            </div>

                            <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-50">
                                <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-50">
                                    <img
                                        src={pokemonInfo.sprites.other?.dream_world.front_default ?? noImage}
                                        alt={pokemonInfo.name} className="object-cover w-full h-full" />
                                </div>
                            </div>

                            <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-50">
                                <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-50">
                                    <img
                                        src={pokemonInfo.sprites.other?.["official-artwork"].front_default ?? noImage}
                                        alt={pokemonInfo.name} className="object-cover w-full h-full" />
                                </div>
                            </div>

                            <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-50">
                                <div className="relative overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-50">
                                    <img
                                        src={pokemonInfo?.sprites?.other?.showdown.back_default ?? noImage}
                                        alt={pokemonInfo.name} className="object-cover w-full h-full" />
                                </div>
                            </div>

                        </div>

                        <div className="mt-9 flex gap-3">
                            Formas
                            <div>
                                {
                                    pokemonInfo.forms.map((form, index) => (
                                        <span key={index} className="inline-flex m-1 items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10">
                                            {form.name}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="mt-9 flex gap-3">
                            Habilidades
                            <div>
                                {
                                    pokemonInfo.abilities.map((ab, i) => (
                                        <span key={i} className="inline-flex m-1 items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10">
                                            {ab.ability?.name}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="my-9 flex gap-3">
                            Movimientos
                            <div className="my-9 ">
                                {
                                    pokemonInfo.moves.map((move, i) => (
                                        <span key={i} className="inline-flex m-1 items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10">
                                            {move.move.name}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div >

        </>
    )
}
