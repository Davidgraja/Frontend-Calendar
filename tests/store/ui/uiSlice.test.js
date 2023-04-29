import { onCloseModal, onOpenModal, uiSlice } from "../../../src/store";

describe('Pruebas sobre uiSlice', () => { 

    test('Debe de retornar el estado por defecto ' , ()=>{
        
        expect(uiSlice.getInitialState().isTheModalOpen).toBeFalsy();

    })

    test('debe de cambiar el isTheModalOpen corectamente', () => { 

        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state , onOpenModal() );
        expect(state.isTheModalOpen).toBeTruthy();

        state = uiSlice.reducer(state , onCloseModal() );
        expect(state.isTheModalOpen).toBeFalsy();


    })


})