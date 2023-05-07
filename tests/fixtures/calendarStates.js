export const events = [
    {
        id : '1',
        start : new Date('2023-04-29 21:45:00'),
        end : new Date('2023-04-29 23:45:00'),
        title : 'nota de testing 1',
        notes : 'nota de prueba 1 ', 
    },

    {
        id : '2',
        start : new Date('2023-04-29 21:45:00'),
        end : new Date('2023-04-29 23:45:00'),
        title : 'nota test 2',
        notes : 'nota 2', 
    }

]

export const initialState = {
    isLoadingEvents : true ,
    events : [] , 
    activeEvent : null
}

export const calendarWithEventsState = {
    isLoadingEvents : false ,
    events : [ ...events ] , 
    activeEvent : null
}

export const calendarWithActiveEventState = {
    isLoadingEvents : false ,
    events : [ ...events ] , 
    activeEvent : { ...events[0] }
}