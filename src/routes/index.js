import { Create } from "../pages/Create";
import { RecipeDetails } from "../pages/RecipeDetails";
import { Recipes } from "../pages/Recipes";
import { PAGE_RECIPES_PATH, PAGE_RECIPES_DEPAILS_PATH, PAGE_CREATE_PATH, PAGE_CREATE_SUCCESS_PATH } from '../utils/constants'
import CreateSuccess from "../pages/CreateSuccess";

export const routes = [
    {
        path: PAGE_CREATE_PATH,
        element: <Create />,
    },
    {
        path: PAGE_RECIPES_PATH,
        element: <Recipes />,
    },
    {
        path: PAGE_RECIPES_DEPAILS_PATH,
        element: <RecipeDetails />,
    },
    {
        path: PAGE_CREATE_SUCCESS_PATH,
        element: <CreateSuccess />,
    },
];