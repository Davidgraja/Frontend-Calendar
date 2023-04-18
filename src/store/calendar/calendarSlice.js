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

                if( event._id === payload._id  ){
                    return payload
                }

                return event 
            })
        },
        
        onDeleteEvent : ( state ) => {
            if( state.activeEvent ){
                state.events = state.events.filter( event => event._id !== state.activeEvent._id); 
                state.activeEvent = null; 
            }

        } ,

        onLoadingEvents : (state , {payload = []}) => {

            state.isLoadingEvents = false;
            state

        }
    }
    

})

// Action creators are generated for each case reducer function
export const {  onsetActiveEvent , onAddNewEvent  , onUpdateEvent  , onDeleteEvent , onLoadingEvents} = calendarSlice.actions