import { configureStore } from "@reduxjs/toolkit";

import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";


export const store = configureStore({

    reducer : {
        ui :uiSlice.reducer,
        calendar : calendarSlice.reducer
    },
    // configuracion de middlewares :
    // solucion para que rudux no serialize  las fechas  
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
    

})