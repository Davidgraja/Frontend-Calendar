import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState : {
        
        isLoadingEvents : true ,
        events : [] , 
        activeEvent : null

    },
    reducers: {
        
        onsetActiveEvent : ( state , { payload } ) => {

            state.activeEvent = payload ; 

        }, 

        onAddNewEvent : ( state , { payload }) => {
            state.events.push( payload );
            state.activeEvent = null; 
        },

        onUpdateEvent : ( state , {payload} ) => {
            state.events = state.events.map( event => {

                if( event.id === payload.id  ){
                    return payload
                }

                return event 
            })
        },
        
        onDeleteEvent : ( state ) => {
            if( state.activeEvent ){
                state.events = state.events.filter( event => event.id !== state.activeEvent.id); 
                state.activeEvent = null; 
            }

        } ,

        onLoadingEvents : (state , {payload = []}) => {

            state.isLoadingEvents = false;

            payload.forEach( payloadEvent => {

                const existEvent = state.events.some( storeEvent => storeEvent.id === payloadEvent.id);

                if( !existEvent ){
                    state.events.push(payloadEvent);
                }

            } )
        },

        onLogoutEvents : ( state ) =>{
            state.activeEvent = null
            state.events = [];
            state.isLoadingEvents = true;
        }
    }
    

})

// Action creators are generated for each case reducer function
export const {  onsetActiveEvent , onAddNewEvent  , onUpdateEvent  , onDeleteEvent , onLoadingEvents , onLogoutEvents} = calendarSlice.actions