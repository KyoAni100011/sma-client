import Home from "../../components/layout/home";
import LoginForm from "../../pages/authentication/login";
import SignUpForm from "../../pages/authentication/signup";
import { routerType } from "../types/router.types";

const pageData: routerType[] = [
  {
    title: "Home",
    path: "",
    element: <Home />,
  },
  {
    title: "Login",
    path: "login",
    element: <LoginForm />,
  },{
    title : "Signup",
    path : "signup",
    element : <SignUpForm/>
  }
];

export default pageData;
