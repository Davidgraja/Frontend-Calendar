import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { isTheModalOpen } = useUiStore();
    const { startDeleteEvent  , hasEventSelected} = useCalendarStore();

    const handleDelete = () => {
        startDeleteEvent();
    }


    return (
        
        <button className=" btn btn-danger fab-danger" onClick={ handleDelete} style={{ display : hasEventSelected ? '' : 'none'}} >

            <i className=" fas fa-trash  fa-thin  fa-beat-fade"></i>

        </button>
    )
}
