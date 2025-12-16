import type { RouteObject } from "react-router-dom";
import Landing  from "../pages/Landing";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
];

export default routes;
