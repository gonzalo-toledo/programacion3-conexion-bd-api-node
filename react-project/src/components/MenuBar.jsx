import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

export default function MenuBar() {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Productos',
            // icon: 'pi pi-star',
            items: [
                {
                    label: 'Crear producto',
                    command: () => navigate('/productos/crear')
                },
                {
                    label: 'Lista de productos',
                    command: () => navigate('/productos')
                }
            ]
        },
        {
            label: 'Usuarios',
            // icon: 'pi pi-star',
            items: [
                {
                    label: 'Crear usuario',
                    command: () => navigate('/usuarios/crear')
                },
                {
                    label: 'Lista de usuarios',
                    command: () => navigate('/usuarios')
                }
            ]
        },
        
    ];

    const start = (
        <div className="flex align-items-center gap-2">
            <a href="/">
                <span className="logo font-bold text-2xl">TechnoStore</span>        
            </a>
        </div>
    );

    return (
        <div>
            <Menubar model={items} start={start} className="custom-menubar" />
        </div>
    );
}
