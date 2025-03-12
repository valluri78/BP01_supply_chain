import React from "react";
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import RootLayout from "../Layouts/RootLayout.jsx";
import { Documents } from "../containers/Documents/Documents.jsx";
import { Notification } from "../containers/Notifications/Notification.jsx";
import { Dashboard } from "../containers/Dashboard/Dashboard.jsx";
import { UsersList } from "../containers/Users/UsersList.jsx";
import { CreateNode } from "../containers/UserDetails/CreateNode.jsx";
import { GraphVisualization } from "../containers/Graphs/GraphVisualization.jsx";

export default function AppRoutes() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/dashboard" replace />,
        },
        {
            path: "/",
            element: <RootLayout />, 
            children: [
                {
                    path: "dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "transactions",
                    element: <UsersList />,
                },
                {
                    path: "createNode",
                    element: <CreateNode />,
                },
                {
                    path: "graphVisualization",
                    element: <GraphVisualization />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
