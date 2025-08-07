import React, { Fragment } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { Button } from "primereact/button";

import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import confettji from 'canvas-confetti';


const UserForm = () => {
    const { createUser, editUser, editingUser, setEditingUser,users } = React.useContext(UserContext);
    const navigate = useNavigate();

    //primero definir initialValues 
    const initialValues = {
        nombre: editingUser?.nombre || '', // el ? es para que no rompa si editingUser es null. El || es para que si es null, ponga un string vacio
        apellido: editingUser?.apellido || '',
        edad: editingUser?.edad || '',
        email: editingUser?.email || '',
    }

    // definir el esquema de validacion
    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(2, 'El nombre es muy corto')
            .max(15, 'El nombre es muy largo') 
            .required('El nombre es requerido'),
        apellido: Yup.string()
            .min(2, 'El nombre es muy corto')
            .max(15, 'El nombre es muy largo')
            .required('El apellido es requerido'),
        edad: Yup.number()
            .min(18, 'debes ser mayor de edad para registrarte')
            .required('La edad es requerida'),
        email: Yup.string()
            .email('El email no es válido')
            .required('El email es requerido')
            .test(
                'email-exists',
                'Este correo ya está registrado',
                function (value) {
                    if (!value) return true;

                    const editingUserId = editingUser?.id;
                    const emailExists = users.some(
                        user => user.email === value && user.id !== editingUserId
                    );

                    return !emailExists;
                }
            )

    });
    
    const handleSubmit = async (values) => {
        try {    
            if (editingUser) {
                await editUser(values);
                Swal.fire({
                    icon: 'success',
                    title: '¡Usuario editado!',
                    text: 'El usuario fue editado correctamente',
                });
                setEditingUser(null); // Resetear el usuario en edición
            } else {
                await createUser(values);
                Swal.fire({
                    icon: 'success',
                    title: '¡Usuario creado!',
                    text: 'El usuario fue creado correctamente',
                });
                handleConfetti();
            }
            navigate('/usuarios'); // Redirigir a la lista de usuarios después de crear o editar
        } catch (error) {
            console.error("Error al crear o editar el usuario:", error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un problema al crear o editar el usuario',
            });
        }
    }; 

    //Efecto de confetti 
    const handleConfetti = () => {
        confettji({
            particleCount: 500,
            startVelocity: 40,
            spread: 360,
        });
    }

    return (
        <Fragment>
            <div className="container mt-4">
                <h1 className="mb-4">{editingUser ? 'Editar usuario' : 'Crear un nuevo usuario' }</h1>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                /* a onSubmit se le pasa la funcion para crear el usuario */
                onSubmit={handleSubmit}
                /* enableReinitialize permite que el formulario se actualice cuando cambian los valores iniciales */
                enableReinitialize 

                >
                <Form className="form-container"> 
                    <div className="form-group" >
                        <label htmlFor="nombre" >Nombre</label>
                        <Field name="nombre" type="text" id="nombre"/>
                        <ErrorMessage className="error-message"  name="nombre" component="div" />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="apellido">Apellido</label>
                        <Field name="apellido" type="text" id="apellido"/>
                        <ErrorMessage className="error-message"  name="apellido" component='div' />                    
                    </div>
                    <div className="form-group" >
                        <label htmlFor="edad">Edad</label>
                        <Field name="edad" type="number" id="edad"/>
                        <ErrorMessage className="error-message"  name="edad" component='div' />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="email">Correo electrónico</label>
                        <Field name="email" type="text" id="email"/>
                        <ErrorMessage className="error-message"  name="email" component='div' />
                    </div>

                    {/* Boton de envio al ser tipo submit va usar la funcion onSubmit*/}
                    <Button 
                        label={editingUser ? "Guardar cambios" : "Crear usuario"} 
                        type="submit"
                    >
                    </Button>  

                </Form>

            </Formik>
            </div>
            

        </Fragment>
    );
};

export default UserForm;