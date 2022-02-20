import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <nav>navbar</nav>
      <Outlet />
    </>
  );
};
