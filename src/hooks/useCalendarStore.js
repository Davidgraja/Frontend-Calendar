import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onsetActiveEvent , onUpdateEvent , onDeleteEvent } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { events , activeEvent } = useSelector( ( state ) => state.calendar ) ; 


    const setActiveEvent = (calendarEvent) => {
        dispatch( onsetActiveEvent( calendarEvent ) );
    }


    const startSavingEvent = async (  calendarEvent ) => {

        if(calendarEvent._id ){
            //? update
            dispatch(onUpdateEvent({...calendarEvent}))
        }
        else{
            //? crear
            dispatch( onAddNewEvent( { _id : new Date().getTime() ,...calendarEvent  } ) )
        }
    }


    const startDeleteEvent = () =>{
        dispatch( onDeleteEvent());
    }

    return {

        //* Properties
        activeEvent,
        events,
        hasEventSelected : !!activeEvent?._id , 

        //* methods
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent
    }

}
