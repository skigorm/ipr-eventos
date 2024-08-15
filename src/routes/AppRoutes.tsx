import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import EventDetails from '../pages/EventDetails/EventDetails';
import AddProducts from '../pages/Products/AddProducts';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/eventos/:eventId" element={<EventDetails />} /> 
            <Route path="/eventos/:eventId/produtos" element={<AddProducts />} />
            <Route path="*" element={<Login />} />
        </Routes>
    );
};

export default AppRoutes;
