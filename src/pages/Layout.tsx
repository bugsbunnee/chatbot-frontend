import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth";

const Layout = () => {
    const { user } = useAuthStore();
    
    if (user) return <Navigate to='/dashboard' />;

    return ( 
        <Outlet />
     );
};
 
export default Layout;