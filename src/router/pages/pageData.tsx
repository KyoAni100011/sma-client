import Navbar from "../../components/layout/header";
import LoginForm from "../../pages/authentication/login";
import SignUpForm from "../../pages/authentication/signup";
import { routerType } from "../types/router.types";

const pageData: routerType[] = [
  {
    title: "Home",
    path: "",
    element: <Navbar />,
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
