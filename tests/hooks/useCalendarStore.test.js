import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { calendarWithEventsState, events, initialState } from "../fixtures/calendarStates";
import { authenticatedState } from "../fixtures/authStates";
import { act, renderHook } from "@testing-library/react";
import { useCalendarStore } from "../../src/hooks";
import { Provider } from "react-redux";
import {calendarSlice} from '../../src/store/calendar/calendarSlice';

const getMockStore = (calendarStates , authStates) =>{
    return configureStore({
        reducer :  {
            calendar:calendarSlice.reducer,
            auth : authSlice.reducer
        },
        preloadedState:{
            calendar : { ...calendarStates },
            auth : {...authStates}
        }

    });
}

const mockOnAddNewEvent = jest.fn(), 
    mockOnsetActiveEvent = jest.fn(),
    mockOnUpdateEvent  = jest.fn(),
    mockOnDeleteEvent  = jest.fn(),
    mockOnLoadingEvents  = jest.fn()


jest.mock('../../src/store/calendar/calendarSlice', ()=>({
    ...jest.requireActual('../../src/store/calendar/calendarSlice'),
    onAddNewEvent : mockOnAddNewEvent,
    onsetActiveEvent : (prop) =>  mockOnsetActiveEvent(prop),
    onUpdateEvent : mockOnUpdateEvent,
    onDeleteEvent : mockOnDeleteEvent,
    onLoadingEvents : mockOnLoadingEvents
}))


jest.mock('react-redux' , ()=>(
    {
        ...jest.requireActual('react-redux'),
        useDispatch : () => jest.fn()
    }
))

describe('Pruebas sobre useCalendarStore', () => {

    beforeEach(()=> jest.clearAllMocks())
    
    test('Debe de retornar los valores por defecto', () => { 

        const mockStore = getMockStore(initialState , authenticatedState)

        const { result } = renderHook(()=> useCalendarStore() , {

            wrapper : ({children}) => <Provider store={ mockStore }> { children } </Provider>
        })

        expect(result.current).toEqual({
            activeEvent: null,
            events: [],
            hasEventSelected: false,
            setActiveEvent: expect.any(Function),
            startSavingEvent: expect.any(Function),
            startDeleteEvent: expect.any(Function),
            startLoadingEvents: expect.any(Function)
        });

    })

    test('setActiveEvent debe de llamar la funcion onsetActiveEvent ' , ()=> {

        const mockStore = getMockStore(calendarWithEventsState , authenticatedState)

        const { result } = renderHook(()=> useCalendarStore() , {

            wrapper : ({children}) => <Provider store={ mockStore }> { children } </Provider>
        })

        act(()=>{
            result.current.setActiveEvent( events[0])
        })

        expect( mockOnsetActiveEvent ).toHaveBeenCalled();
        expect( mockOnsetActiveEvent ).toHaveBeenCalledWith(events[0]);
    })

})