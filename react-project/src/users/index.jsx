import UsersView from "./UsersView";
import UserForm from "./UserForm";
import {Routes, Route } from "react-router-dom";



const UsersModule = () => {
    return (

            <Routes>
                <Route path="/usuarios" element={<UsersView/>} />
                <Route path="/usuarios/crear" element={<UserForm />} />
                <Route path="/usuarios/editar/:id" element={<UserForm />} />
            </Routes>

        
    )
}

export default UsersModule;