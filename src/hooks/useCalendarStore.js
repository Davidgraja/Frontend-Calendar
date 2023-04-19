import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onsetActiveEvent , onUpdateEvent , onDeleteEvent , onLoadingEvents } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { events , activeEvent } = useSelector( ( state ) => state.calendar ); 
    const { user } = useSelector( ( state ) => state.auth ); 


    const setActiveEvent = (calendarEvent) => {
        dispatch( onsetActiveEvent( calendarEvent ) );
    }


    const startSavingEvent = async (  calendarEvent ) => {
        
        try {
            if(calendarEvent.id ){
                //? update
                await calendarApi.put(`/events/${calendarEvent.id}` , calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent , user}));
                return;
            }
            
        //? crear
            const {data} = await calendarApi.post('/events',calendarEvent)
            dispatch( onAddNewEvent( { id : data.event.id ,...calendarEvent  } ) )
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar' , error.response.data.msg , 'error');
        }
        
    }


    const startDeleteEvent = async () =>{

        try {
    
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch( onDeleteEvent());
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar' , error.response.data.msg , 'error');
        }
    }


    const startLoadingEvents = async () =>{

        try {

            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);
            dispatch(onLoadingEvents(events));

        } catch (error) {

            console.log('Error al cargar los eventos');
            Swal.fire('Error al cargar los eventos' , error.response.data.msg , 'error');


        }

    }

    return {

        //* Properties
        activeEvent,
        events,
        hasEventSelected : !!activeEvent?.id , 

        //* methods
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }

}
