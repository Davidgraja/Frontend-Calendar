import { createSlice } from '@reduxjs/toolkit'


export const uiSlice = createSlice({
    name: 'ui',
    initialState : {
        isTheModalOpen : false
    },
    reducers: {
        onOpenModal : ( state ) => {
            state.isTheModalOpen = true
        } , 


        onCloseModal : ( state ) => {
            state.isTheModalOpen = false
        }
    }
    

})

// Action creators are generated for each case reducer function
export const { onOpenModal  , onCloseModal } = uiSlice.actions