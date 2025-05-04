import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import '../styles/PreferencesTab.css';

const PreferencesTab = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        studyTime: 25,
        breakTime: 5
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí irá la lógica para actualizar los datos
        setIsEditing(false);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            // Aquí irá la lógica para eliminar la cuenta
        }
    };

    return (
        <div className="preferences-container">
            <h3>Preferencias</h3>
            
            <form onSubmit={handleSubmit} className="preferences-form">
                <div className="form-group">
                    <h4>Información Personal</h4>
                    <div className="input-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="input-group">
                        <label>Correo Electrónico:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                {isEditing && (
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
                )}

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
                            disabled={!isEditing}
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
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                <div className="button-group">
                    {!isEditing ? (
                        <button type="button" onClick={() => setIsEditing(true)}>
                            Editar Preferencias
                        </button>
                    ) : (
                        <>
                            <button type="submit">Guardar Cambios</button>
                            <button type="button" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </button>
                        </>
                    )}
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