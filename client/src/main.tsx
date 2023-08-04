import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/App';
import './index.css';
import CardInput from './pages/CardInput';
import PlayerInput from './pages/PlayerInput';
import Home from './pages/Home/Home';
import Collection from './pages/Collection';
import PlayerCards from './pages/PlayerCards';
import { AuthContextProvider } from './context/AuthContext';

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
        path: '/addCard',
        element: <CardInput />,
    },
    {
        path: '/addPlayer',
        element: <PlayerInput />,
    },
    {
        path: '/cards/:id',
        element: <PlayerCards />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </React.StrictMode>
);
