import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Create } from '../pages/Create';
import { RecipeCard } from '../pages/RecipeCard';
import { Recipes } from '../pages/Recipes';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Recipes />} />
          <Route path='/create' element={<Create />} />
          <Route path='/recipe/:id' element={<RecipeCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
