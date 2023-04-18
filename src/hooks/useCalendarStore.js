import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onsetActiveEvent , onUpdateEvent , onDeleteEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";


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
            try {
                const {data} = await calendarApi.post('/events',calendarEvent)
                dispatch( onAddNewEvent( { id : data.event.id ,...calendarEvent  } ) )
                
            } catch (error) {
                console.log(error)
            }
        }
    }


    const startDeleteEvent = () =>{
        dispatch( onDeleteEvent());
    }


    const startLoadingEvents = async () =>{

        try {

            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);
            console.log(events);

        } catch (error) {

            console.log('Error al cargar los eventos');
            console.log(error);

        }

    }

    return {

        //* Properties
        activeEvent,
        events,
        hasEventSelected : !!activeEvent?._id , 

        //* methods
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }

}
