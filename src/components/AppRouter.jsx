import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from '../routes';
import { Layout } from './Layout';

export const AppRouter = () => {
  console.log(routes);
  return (
    <BrowserRouter basename={window.location.pathname || ''}>
      <Routes>
        <Route element={<Layout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
