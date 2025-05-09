import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { api } from '../services/api';
import '../styles/PreferencesTab.css';
import Swal from 'sweetalert2';

const PreferencesTab = () => {
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        studyTime: user?.workDuration ? user.workDuration / 60 : 25,
        breakTime: user?.breakDuration ? user.breakDuration / 60 : 5
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = {
            ...user,
            workDuration: Number(formData.studyTime) * 60,
            breakDuration: Number(formData.breakTime) * 60
        };

        try {
            const data = await api.updateUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            Swal.fire({
                title: '¡Éxito!',
                text: 'Preferencias actualizadas correctamente',
                icon: 'success',
                confirmButtonText: '¡Genial!',
                confirmButtonColor: '#88c9bf',
                background: '#fff5e6',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    confirmButton: 'swal-custom-confirm'
                }
            });
        } catch (error) {
            console.error('Error al actualizar las preferencias:', error);
            Swal.fire({
                title: '¡Ups!',
                text: 'Error al actualizar las preferencias. Por favor, inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#88c9bf',
                background: '#fff5e6',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    confirmButton: 'swal-custom-confirm'
                }
            });
        }
    };

    const handleDeleteAccount = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#809671', 
            cancelButtonColor: '#A7442A', 
            background: '#fff5e6',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                confirmButton: 'swal-custom-confirm',
                cancelButton: 'swal-custom-confirm' 
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí irá la lógica para eliminar la cuenta
            }
        });
    };

    return (
        <div className="preferences-container">
            <h3>Preferencias</h3>

            <form onSubmit={handleSubmit} className="preferences-form">
                <div className="form-group">
                    <h4>Configuración de Tiempo</h4>
                    <div className="input-group">
                        <label>Tiempo de Estudio (minutos):</label>
                        <input
                            type="number"
                            name="studyTime"
                            value={formData.studyTime}
                            onChange={handleInputChange}
                            min="1"
                            max="60"
                        />
                    </div>
                    <div className="input-group">
                        <label>Tiempo de Descanso (minutos):</label>
                        <input
                            type="number"
                            name="breakTime"
                            value={formData.breakTime}
                            onChange={handleInputChange}
                            min="1"
                            max="30"
                        />
                    </div>
                </div>

                <div className="preferences-separator"></div>

                <div className="form-group">
                    <h4>Información Personal</h4>
                    <div className="input-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Correo Electrónico:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <h4>Cambiar Contraseña</h4>
                    <div className="input-group">
                        <label>Contraseña Actual:</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Nueva Contraseña:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Confirmar Nueva Contraseña:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="button-group">
                    <button type="submit">Guardar Cambios</button>
                </div>

                <div className="danger-zone">
                    <h4>Zona de Peligro</h4>
                    <button
                        type="button"
                        className="delete-account-button"
                        onClick={handleDeleteAccount}
                    >
                        Eliminar Cuenta
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PreferencesTab;