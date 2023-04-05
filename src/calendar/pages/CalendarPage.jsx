import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar , CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'

import { localizer , getMessagesEs } from '../../helpers'
import { useState } from 'react'
import { useUiStore , useCalendarStore } from '../../hooks'



export const CalendarPage = () => {
  const { events , setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore()
  const [ lastview , setLastView] = useState(localStorage.getItem('lastview') || 'agenda' )


  const eventStyleGetter = (event , start , end , isSelected) =>{

    const style = {
      backgroundColor : '#23C7B3',
      borderRadius : '8px',
      opacity : 0.8,
      color: 'white'

    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal()
  }

  const onSelectEvent = (event) => {

    setActiveEvent( event )

  }

  const onViewEvent= (event) => {
    localStorage.setItem('lastview' , event);
    setLastView(event)
  }

  const onSelectSlotEvent= () => {
    setActiveEvent(null);
  }

  return (

    <>
      <Navbar/>

      <Calendar
        selectable
        messages={ getMessagesEs() }
        culture='es'
        defaultView= { lastview }
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)'}}
        eventPropGetter= { eventStyleGetter }
        components = {{
          event : CalendarEvent
        }}
        onDoubleClickEvent = { onDoubleClick }
        onSelectEvent = {onSelectEvent }
        onView = { onViewEvent }
        onSelectSlot={ onSelectSlotEvent }
        
    />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>

  )
}
