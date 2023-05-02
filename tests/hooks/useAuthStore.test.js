import { authSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { act, renderHook } from "@testing-library/react";
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


    
    test(' startLogin debe de reañizar el login correctamente',  async () => {

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

})