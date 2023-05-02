import { useDispatch, useSelector } from "react-redux"
import { onOpenModal, onCloseModal } from "../store";

export const useUiStore = () =>{

    const dispatch = useDispatch();
    const {isTheModalOpen} = useSelector( (state) =>  state.ui );

    const openDateModal = () => {

        dispatch( onOpenModal() );

    }

    const closeDateModal = () => {

        dispatch( onCloseModal() )

    }

    //* manage the two functions in the same method
    const toggleDateModal = () => {
        
        return ( isTheModalOpen ) ?  closeDateModal()  :  openDateModal() 

    }

    return {
        //* properties 
        isTheModalOpen,

        //* methods  

        openDateModal,
        closeDateModal,
        toggleDateModal
    }

}