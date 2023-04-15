import React from 'react';
import './loginPage.css';
import { useForm } from '../../hooks';

const loginFormFields = {
    loginEmail  : '',
    loginPassword : ''
}

const registerFormFields = {
    registerName : '',
    registerEmail  : '',
    registerPassword : '',
    registerPassword2 : ''
}



export const LoginPage = () => {

    const {loginEmail,loginPassword ,onEventInput : onLoginEventInput} = useForm(loginFormFields);

    const loginOnSubmit = (event) =>{
        event.preventDefault();

        console.log({loginEmail , loginPassword})
    }
    
    const {registerName , registerEmail ,registerPassword ,registerPassword2,onEventInput : onRegisterEventInput} = useForm(registerFormFields);
    
    
    const registerOnSubmit = (event) =>{
        event.preventDefault();

        console.log({registerEmail , registerName , registerPassword , registerPassword2})
    }
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginOnSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={ onLoginEventInput }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                autoComplete='false'
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginEventInput }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerOnSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterEventInput}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterEventInput}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                autoComplete='false'
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterEventInput}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                autoComplete='false' 
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterEventInput}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}