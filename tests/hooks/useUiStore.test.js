import { renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux"
import { store, uiSlice } from "../../src/store"
import { configureStore } from "@reduxjs/toolkit"

describe('pruebas sobre useUiStore.js', () => {

    const getMockStore = (initialState) =>{
        return configureStore({
            reducer :  {
                ui: uiSlice.reducer
            },
            preloadedState:{
                ui : { ...initialState}
            }


        })
    }

    test('Debe de retornar los valores por defecto ', () => {

        const mockStore = getMockStore({isTheModalOpen : false});
        const {result} =renderHook(()=> useUiStore(),{ 
            wrapper: ({children})=> <Provider store={ mockStore } >{ children }</Provider>
        })

        expect(result.current).toEqual({
            isTheModalOpen: false,
            openDateModal: expect.any(Function) ,
            closeDateModal: expect.any(Function) ,
            toggleDateModal:expect.any(Function) 
        })


    })

})