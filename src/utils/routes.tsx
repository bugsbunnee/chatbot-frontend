import { RouteObject } from "react-router-dom";

import ChatMessageList from "@/components/ChatMessageList";
import Dashboard from "@/pages/Dashboard";
import InitializeLogin from "@/pages/InitializeLogin";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Logout from "@/pages/Logout";
import Register from "@/pages/Register";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <InitializeLogin /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            { index: true, element: <ChatMessageList /> },
            { path: 'logout', element: <Logout /> }
        ]
    }
];

export default routes;