import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Dashbord from '../page/Dashbord';
import ShoppingList from '../page/ShoppingList';
import { getItem } from '../utils/storage';
function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}
function MainRoutes() {
    return (

        <Routes>
            <Route path='/' element={<Dashbord />} />
            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path='/ShoppingList' element={<ShoppingList />} />
            </Route>
        </Routes>

    )

}

export default MainRoutes;