import { act, renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks"
import { Provider } from "react-redux"
import { uiSlice } from "../../src/store"
import { configureStore } from "@reduxjs/toolkit"

const getMockStore = (initialState) =>{
    return configureStore({
        reducer :  {
            ui: uiSlice.reducer
        },
        preloadedState:{
            ui : { ...initialState }
        }

    });
}

describe('pruebas sobre useUiStore.js', () => {


    test('Debe de retornar los valores por defecto ', () => {

        const mockStore = getMockStore({isTheModalOpen : false});
        const {result} =renderHook(()=> useUiStore(),{ 
            wrapper: ({children})=> <Provider store={ mockStore } >{ children }</Provider>
        });

        expect(result.current).toEqual({
            isTheModalOpen: false,
            openDateModal: expect.any(Function) ,
            closeDateModal: expect.any(Function) ,
            toggleDateModal:expect.any(Function) 
        });


    })

    test('onOpenModal debe de colocar true en la propiedad isTheModalOpen', () => {

        const mockStore = getMockStore({isTheModalOpen : false});
        const {result} =renderHook(()=> useUiStore(),{ 
            wrapper: ({children})=> <Provider store={ mockStore } >{ children }</Provider>
        });

        act(()=>{
            result.current.openDateModal();
        });
        
        expect(result.current.isTheModalOpen).toBeTruthy();
        
    })


    
    test('closeDateModal debe de colocar false en la propiedad isTheModalOpen', () => {

        const mockStore = getMockStore({isTheModalOpen : true});
        const {result} =renderHook(()=> useUiStore(),{ 
            wrapper: ({children})=> <Provider store={ mockStore } >{ children }</Provider>
        })


        act(()=>{
            result.current.closeDateModal();
        });
        
        expect(result.current.isTheModalOpen).toBeFalsy();


    })

    test('toggleDateModal debe de colocar el valor opuesto en la propiedad isTheModalOpen', () => {

        const mockStore = getMockStore({isTheModalOpen : true});
        const {result } = renderHook(()=> useUiStore(),{ 
            wrapper: ({children})=> <Provider store={ mockStore } >{ children }</Provider>
        })

        act(()=>{
            result.current.toggleDateModal();
        });
        expect(result.current.isTheModalOpen).toBeFalsy();
        

        act(()=>{
            result.current.toggleDateModal();
        });
        expect(result.current.isTheModalOpen).toBeTruthy();

    })

})