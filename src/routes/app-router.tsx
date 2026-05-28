import { createBrowserRouter, RouterProvider } from "react-router";
import { PokemonPage } from "../pages/pokemon.page";
import { PokemonDetailPage } from "../pages/pokemon-detail.page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PokemonPage />,
    },
    {
        path: "/pokemon/:id",
        element: <PokemonDetailPage />,
    },
]);

export const AppRouter = () => <RouterProvider router={router} />;
