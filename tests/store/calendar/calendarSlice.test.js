import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadingEvents, onLogoutEvents, onUpdateEvent, onsetActiveEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('pruebas sobre calendarSlice.js', () => {

    test('Debe de retornar el state por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    })

    test('onsetActiveEvent debe de activar un evento', () => {
        const state = calendarSlice.reducer( calendarWithEventsState , onsetActiveEvent( events[1] ));

        expect(state.activeEvent).toEqual(events[1]);
    })

    test('onAddNewEvent debe de añadir un nuevo evento ', () => {
        const newEvent =  {
            id : '3',
            start : new Date('2023-04-30 21:45:00'),
            end : new Date('2023-04-30 23:45:00'),
            title : 'new event',
            notes : 'new event for add', 
        };

        
        const state = calendarSlice.reducer( calendarWithActiveEventState , onAddNewEvent( newEvent ) );
        
        expect(state.events.length).toBe(3);
        expect(state.events).toContain(newEvent);
        expect(state.activeEvent).toBe(null)

    })

    
    test('onUpdateEvent debe de actualizar un evento ', () => {
        const updateEvent =  {
            id : '2',
            start : new Date('2023-04-30 21:45:00'),
            end : new Date('2023-04-30 23:45:00'),
            title : 'update event',
            notes : 'updating event', 
        };
        
        const state = calendarSlice.reducer( calendarWithEventsState , onUpdateEvent( updateEvent ) );
        
        expect(state.events).toContain(updateEvent);

    })

    test('onDeleteEvent debe de eliminar el evento activo', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState,onDeleteEvent());
        expect(state.events).not.toContain(events[0]);
        expect(state.events).toHaveLength(1);
        expect(state.activeEvent).toBe(null);
    })

    test('onDeleteEvent no debe de eliminar eventos si no hay un evento activo', () => {
        const state = calendarSlice.reducer(calendarWithEventsState,onDeleteEvent());
        expect(state.events).toHaveLength(2);
        expect(state.events).toEqual([...events])
    })

    
    test('onLoadingEvents debe cargar los eventos al state', () => {
        const state = calendarSlice.reducer(initialState , onLoadingEvents(events));
        expect(state.events).toEqual([...events]); 
        expect(state.isLoadingEvents).toBeFalsy();

        const newState = calendarSlice.reducer(state , onLoadingEvents(events));
        expect(newState.events.length).toBe(events.length)
    })

    test('onLogoutEvents debe de restablecer el state por defecto', () => {

        const state = calendarSlice.reducer(calendarWithEventsState , onLogoutEvents());
        expect(state).toEqual(initialState);
    })

})