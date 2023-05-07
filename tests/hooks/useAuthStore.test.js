import { authSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

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

    beforeEach(
        () => localStorage.clear()
    )

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
        // localStorage.clear();
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
        // localStorage.clear();   
        const  mockStore = getMockStore(initialState);

        const { result } = renderHook( ()=>  useAuthStore()    , {
            wrapper : ({children}) => <Provider store={ mockStore } > {children } </Provider>
        })

        await  act( async ()=>{
            await result.current.startLogin({ email : 'chanchito@gmail.com' , password:'4fdfdqwew423'});
        })
        
        const { errorMessage , user , status} = result.current; 

        expect(localStorage.getItem('token')).toBe(null)
        expect({ errorMessage , user , status}).toEqual({
            errorMessage : expect.any(String),
            user  :  {},
            status : 'not-authenticated'
        })
        
        
        waitFor(
            () =>  expect(result.current.errorMessage).toBe(undefined)
        )
            
    })

    test('startRegister debe de crear un usuario', async () => {

        const  mockStore = getMockStore(notAuthenticatedState);

        const { result } = renderHook( ()=>  useAuthStore()    , {
            wrapper : ({children}) => <Provider store={ mockStore } > {children } </Provider>
        })

        const spy = jest.spyOn(calendarApi ,'post').mockReturnValue({
            data : {
                ok: true,
                uid: "6452aa48",
                name: "test",
                token: "token"
            }
        })

        await  act( async ()=>{
            await result.current.startRegister({ email : 'testPrueba@gmail.com' , password:'4fdfd441023' , name:'test'});
        })

        const { errorMessage , user , status} = result.current;

        expect({ errorMessage , user , status} ).toEqual({
            errorMessage: undefined,
            user: { name: 'test', uid: '6452aa48' },
            status: 'authenticated'
        })

        spy.mockRestore();

    })

    test('startRegister debe de fallar la creación de un usuario', async () => { 
        const  mockStore = getMockStore(notAuthenticatedState);

        const { result } = renderHook( ()=>  useAuthStore()    , {
            wrapper : ({children}) => <Provider store={ mockStore } > {children } </Provider>
        })

        await  act( async ()=>{
            await result.current.startRegister( testUserCredentials);
        })

        const { errorMessage , user , status} = result.current;

        expect({ errorMessage , user , status} ).toEqual({
            errorMessage: 'Ya existe un usuario con ese email',
            user: {},
            status: 'not-authenticated',
        })


    })

    test('startCheckAuthToken debe fallar si no hay un token ', async () => { 
        const  mockStore = getMockStore(initialState);

        const { result } = renderHook( ()=>  useAuthStore()    , {
            wrapper : ({children}) => <Provider store={ mockStore } > {children } </Provider>
        })

        await  act( async ()=>{
            await result.current.startCheckAuthToken( );
        })

        const { errorMessage , user , status} = result.current;
        
        expect({ errorMessage , user , status}).toEqual( notAuthenticatedState)
    })

    
    test('startCheckAuthToken debe de authenticar al usuario si hay un token ', async () => { 

        const { data } = await calendarApi.post('/auth' , testUserCredentials);

        localStorage.setItem('token' , data.token);


        const  mockStore = getMockStore(initialState);

        const { result } = renderHook( ()=>  useAuthStore()    , {
            wrapper : ({children}) => <Provider store={ mockStore } > {children } </Provider>
        })

        await  act( async ()=>{
            await result.current.startCheckAuthToken( );
        })

        const { errorMessage , user , status} = result.current;

        expect({ errorMessage , user , status}).toEqual( {
            errorMessage: undefined,
            user: { name: 'Test user', uid: '64481fb1168f3a2e902ef89e' },
            status: 'authenticated'
        })
    })

})