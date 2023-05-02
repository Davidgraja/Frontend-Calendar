import { authSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { testUserCredentials } from "../fixtures/testUser";

const getMockStore = ( initialState ) =>{
    return configureStore({
        reducer :  {
            auth: authSlice.reducer
        },
        preloadedState:{
            auth : { ...initialState }
        }
    });
}



describe('pruebas sobre useAuthStore.js', () => { 

    test('debe de retornar los valores por defecto', () => {

        const  mockStore = getMockStore(initialState);

        const { result } = renderHook( ()=>  useAuthStore()    , {
            wrapper : ({children}) => <Provider store={ mockStore } > {children } </Provider>
        })

        expect(result.current).toEqual({
                status: 'checking',
                user: {},
                errorMessage: undefined,
                startLogin: expect.any(Function),
                startRegister: expect.any(Function),
                startCheckAuthToken: expect.any(Function),
                startLogout: expect.any(Function)
            }
        )

    })


    
    test(' startLogin debe de realizar el login correctamente',  async () => {
        localStorage.clear();
        const  mockStore = getMockStore(notAuthenticatedState);

        const { result } = renderHook( ()=>  useAuthStore()    , {
            wrapper : ({children}) => <Provider store={ mockStore } > {children } </Provider>
        })

        await  act( async ()=>{
            await result.current.startLogin(testUserCredentials);
        })

        const { errorMessage , user , status} = result.current;

        expect({errorMessage , status  , user}).toEqual({
            errorMessage : undefined,
            status : 'authenticated',
            user : { name : testUserCredentials.name , uid : testUserCredentials.uid }
        })

        expect(localStorage.getItem('token')).toEqual(expect.any(String))
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
    })

    test('startLogin debe  fallar la autenticación', async () => {    
        localStorage.clear();
        const  mockStore = getMockStore(initialState);

        const { result } = renderHook( ()=>  useAuthStore()    , {
            wrapper : ({children}) => <Provider store={ mockStore } > {children } </Provider>
        })

        await  act( async ()=>{
            await result.current.startLogin({ email : 'testPrueba@gmail.com' , password:'451236'});
        })
        
        const { errorMessage , user , status} = result.current;

        expect(localStorage.getItem('token')).toBe(null)
        expect({ errorMessage , user , status}).toEqual({
            errorMessage : expect.any(String),
            user  :  {},
            status : 'not-authenticated'
        })

        waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        )

    })

})