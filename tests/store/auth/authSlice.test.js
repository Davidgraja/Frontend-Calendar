import { authSlice, onChecking, onClearErrorMessage, onLogin, onLogout } from "../../../src/store"
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('pruebas sobre authSlice', () => { 
    
    test('Debe de retornar el estado por defecto', () => { 
        expect(authSlice.getInitialState()).toEqual( initialState);
    })

    test('Debe de realizar el login', () => {

        const state = authSlice.reducer(initialState , onLogin(testUserCredentials));

        expect(state).toEqual({
            status : 'authenticated',
            user : testUserCredentials,
            errorMessage : undefined
        });

    })

    test('Debe de realizar el logout', () => {
        const state = authSlice.reducer(authenticatedState , onLogout());
        expect(state).toEqual({
            status : 'not-authenticated',
            user : {},
            errorMessage : undefined
        })
    })

    test('Debe de realizar el logout con un mensaje de error', () => {
        
        const errorMessage = 'Credenciales no validas';
        const state = authSlice.reducer(authenticatedState , onLogout(errorMessage));
        expect(state).toEqual({
            status : 'not-authenticated',
            user : {},
            errorMessage 
        })
    })

    test('Debe de limpiar el mensaje de error en el state', () => {
        const errorMessage = 'Credenciales no validas';
        const state = authSlice.reducer(authenticatedState , onLogout( errorMessage));
        const newState = authSlice.reducer( state , onClearErrorMessage() );
        
        expect(newState.errorMessage).toBe(undefined)
    })

    test('Debe de realizar el checking', () => {
        
        const state = authSlice.reducer(notAuthenticatedState , onChecking());
        expect(state.status).toBe('checking')
        expect(state).toEqual(initialState)
    })



})