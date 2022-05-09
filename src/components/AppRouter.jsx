import {HashRouter, Route, Routes} from 'react-router-dom';
import {routes} from '../routes';
import {Layout} from './Layout';
import ScrollToTop from "./ScrollToTop";

export const AppRouter = () => {
  return (
    <HashRouter>
      <ScrollToTop>
        <Routes>
          <Route element={<Layout/>}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element}/>
            ))}
          </Route>
        </Routes>
      </ScrollToTop>
    </HashRouter>
  );
};
