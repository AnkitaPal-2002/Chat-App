import { Navigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {

    const {user} = useAuth(); //check if the user is logged in

    console.log(user);
    

    if(!user){
        return <Navigate to="/login" /> //if not, redirect to login page
    }

    //If authenticated, render the requested component(children)
    return children;

}

export default PrivateRoute;

