import { Create } from "../pages/Create";
import { RecipeCard } from "../pages/RecipeCard";
import { Recipes } from "../pages/Recipes";

export const routes = [
    // routes doesn't work correctly
    { path: "/", component: Recipes },
    { path: '/create', component: Create },
    { path: '/recipe/:id', component: RecipeCard }
]