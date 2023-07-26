import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/App';
import './index.css';
import CardInput from './pages/CardInput';
import PlayerInput from './pages/PlayerInput';
import Home from './pages/Home';
import Collection from './pages/Collection';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/collection',
        element: <Collection />,
    },
    {
        path: '/recent-additions',
        element: <App />,
    },
    {
        path: 'addCard',
        element: <CardInput />,
    },
    {
        path: 'addPlayer',
        element: <PlayerInput />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
