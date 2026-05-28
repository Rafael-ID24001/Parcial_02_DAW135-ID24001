import { Link } from "react-router";

export type cardProps = {
    title: String,
    id: Number
}


export const BasicCard = ({ title, id }: cardProps) => {
    return (
        <>
            <Link to={`/pokemon/${id}`} className="group shadow-md">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={`pokemon ${id}`}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
                <h3 className="my-4 text-lg font-medium text-gray-900 text-center capitalize">{title}</h3>
            </Link>
        </>
    )
}