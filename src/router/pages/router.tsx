import { Route, Routes } from "react-router-dom";
import { routerType } from "../types/router.types";
import pageData from "./pageData";

const Router = () => {
  const pageRouters = pageData.map(({ title, path, element }: routerType) => (
    <Route key={title} path={`/${path}`} element={element} />
  ));

  return <Routes>{pageRouters}</Routes>;
};

export default Router;
