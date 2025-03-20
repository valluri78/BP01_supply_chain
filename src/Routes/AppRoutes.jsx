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
import { CitedWorkComponent } from '../containers/Graphs/CitedWorkComponent.jsx';
import { LargeNetworkGraph } from '../containers/Graphs/LargeNetworkGraph.jsx';

export default function AppRoutes() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/graphVisualization" replace />,
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
                {
                    path: "citedWorks",
                    element: <CitedWorkComponent />,
                },
                {
                    path: "recharts",
                    element: <LargeNetworkGraph />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
