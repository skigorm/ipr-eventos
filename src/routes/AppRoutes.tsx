import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import EventDetails from '../pages/EventDetails/EventDetails';
import AddProducts from '../pages/Products/AddProducts';


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/eventos/:eventId" element={<EventDetails />} /> 
            <Route path="/eventos/:eventId/produtos" element={<AddProducts />} />
        </Routes>
    );
};

export default AppRoutes;
