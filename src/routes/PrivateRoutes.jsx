import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/Auth/AuthProvider";


function PrivateRoutes({ children }) {

const {user} = useAuth()

if(!user){
    return <Navigate to="/login" replace/>
}
return children ? children : <Outlet />;
}
export default PrivateRoutes