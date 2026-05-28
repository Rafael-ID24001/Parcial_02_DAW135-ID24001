import { useParams } from "react-router";

export const PokemonDetailPage = () => {
    const { id } = useParams();
    return (
        <>
            <h1>Pokemon Detail: {id}</h1>
        </>
    )
}
