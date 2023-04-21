import { addHours } from "date-fns";
import { useCalendarStore , useUiStore , useAuthStore } from '../../hooks';

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();
    const { user } = useAuthStore();

    const handleClickNew = () => {

        setActiveEvent({
            title : '',
            notes : '',
            start : new Date(),
            end : addHours(new Date() , 2),
            user :{
                uid : user.uid,
                name : user.name
            }
        })

        openDateModal();
    }

    return (
        <button className=" btn btn-primary fab" onClick={ handleClickNew } >

            <i className=" fas fa-plus fa-thin fa-circle-plus fa-beat-fade"></i>

        </button>
    )
}
