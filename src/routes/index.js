import { Create } from "../pages/Create";
import { RecipeDetails } from "../pages/RecipeDetails";
import { Recipes } from "../pages/Recipes";

export const routes = [
    {
        path: '/',
        element: <Recipes />,
    },
    {
        path: '/create',
        element: <Create />,
    },
    {
        path: '/recipe/:id',
        element: <RecipeDetails />,
    },
];