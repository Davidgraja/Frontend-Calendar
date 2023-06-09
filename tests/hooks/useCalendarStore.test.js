import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../fixtures/calendarStates";
import { authenticatedState } from "../fixtures/authStates";
import { act, renderHook } from "@testing-library/react";
import { useCalendarStore } from "../../src/hooks";
import { Provider } from "react-redux";
import {calendarSlice} from '../../src/store/calendar/calendarSlice';
import { calendarApi } from "../../src/api";

const getMockStore = (calendarStates , authStates) =>{
    return configureStore({
        reducer :  {
            calendar:calendarSlice.reducer,
            auth : authSlice.reducer
        },
        preloadedState:{
            calendar : { ...calendarStates },
            auth : {...authStates}
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
            serializableCheck: false
        })
    });
}


describe('Pruebas sobre useCalendarStore', () => {

    beforeEach(()=> jest.clearAllMocks());
    
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
    
        expect(result.current.activeEvent).toEqual(events[0]);
        expect(result.current.hasEventSelected).toBeTruthy();
    
    })


    test('startSavingEvent debe de actualizar un evento', async () => { 

        const UpdateEvent ={
            id : '1',
            start : new Date('2023-04-29 21:45:00'),
            end : new Date('2023-04-29 23:45:00'),
            title : 'nota de testing 1 actualizada',
            notes : 'actualizada desde usecalendarStore', 
        }

        const mockStore = getMockStore(calendarWithEventsState , authenticatedState)

        const { result } = renderHook(()=> useCalendarStore() , {

            wrapper : ({children}) => <Provider store={ mockStore }> { children } </Provider>
        })

        const spy = jest.spyOn(calendarApi ,'put').mockReturnValue({
            data : UpdateEvent
        });

        await act( async ()=>{
            await result.current.startSavingEvent(UpdateEvent);
        });

        expect(result.current.events[0]).toEqual({
            ...UpdateEvent,
            user :authenticatedState.user
        });

        spy.mockRestore();
    })


    test('startSavingEvent debe de crear un evento', async () => { 

        const newEvent ={
            start : new Date('2023-04-29 21:45:00'),
            end : new Date('2023-04-29 23:45:00'),
            user : authenticatedState.user.uid, 
            title : 'nueva nota',
            notes : 'nuevo nota añadida',
        }

        const mockStore = getMockStore(calendarWithEventsState , authenticatedState)

        const { result } = renderHook(()=> useCalendarStore() , {

            wrapper : ({children}) => <Provider store={ mockStore }> { children } </Provider>
        })

        const spy = jest.spyOn(calendarApi ,'post').mockReturnValue({
            data :{
                event : {
                    id : '3'
                }
            }
        });

        await act( async ()=>{
            await result.current.startSavingEvent(newEvent)
        });

        expect(result.current.events.length).toBe(3);
        expect(result.current.events).toContainEqual({...newEvent , id : '3'});

        spy.mockRestore();
    })


    test('startSavingEvent debe de capturar el error ', async () => { 

        const newEvent ={
            start : new Date('2023-04-29 21:45:00'),
            end : new Date('2023-04-29 23:45:00'),
            user : authenticatedState.user.uid, 
            title : 'nueva nota',
            notes : 'nuevo nota añadida',
        }

        const mockStore = getMockStore(calendarWithEventsState , authenticatedState)

        const { result } = renderHook(()=> useCalendarStore() , {

            wrapper : ({children}) => <Provider store={ mockStore }> { children } </Provider>
        })

        await expect(result.current.startSavingEvent(newEvent)).rejects.toThrowError('No se ha recibido el token')            
    })


    test('startDeleteEvent debe de eliminar si hay un elemento activo', async () => { 

        const mockStore = getMockStore(calendarWithActiveEventState , authenticatedState);

        const { result } = renderHook(()=> useCalendarStore() , {

            wrapper : ({children}) => <Provider store={ mockStore }> { children } </Provider>
        });

        const spy = jest.spyOn(calendarApi ,'delete').mockReturnValue({
            data :{
                ok : true
            }
        });

        await act( async ()=>{
            await result.current.startDeleteEvent()
        });

        expect(result.current.activeEvent).toBe(null);
        expect(result.current.events.length).toBe(1);
        
        spy.mockRestore();
    })

    
    test('startLoadingEvents debe de cargar las notas', async () => { 

        const mockStore = getMockStore(initialState , authenticatedState);

        const { result } = renderHook(()=> useCalendarStore() , {

            wrapper : ({children}) => <Provider store={ mockStore }> { children } </Provider>
        });

        const spy = jest.spyOn(calendarApi ,'get').mockReturnValue({
            data :{
                ok : true,
                events : events
            }
        });

        await act( async ()=>{
            await  result.current.startLoadingEvents()
        });

        expect(result.current.events).toEqual(events)

        spy.mockRestore();
    })

})