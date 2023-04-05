import { addHours, differenceInSeconds  } from 'date-fns';
import es from 'date-fns/locale/es';

import DatePicker , { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useMemo, useState } from 'react';

import Modal  from 'react-modal';
import Swal from 'sweetalert2';

// custom hooks 
import { useCalendarStore, useUiStore } from '../../hooks';


registerLocale('es' , es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-40%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
    
    //* Custom hooks :   
    const { activeEvent  , startSavingEvent} = useCalendarStore();
    const { isTheModalOpen , closeDateModal } = useUiStore();

    // * useStates hooks :
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title : '',
        notes : '',
        start : new Date(),
        end : addHours(new Date() , 2)
    })
    
    //* useEffect hook : 
    useEffect(() => {
        if( activeEvent !== null ) {
            setFormValues( { ...activeEvent } )
        }

    }, [activeEvent])
    

    //* validation of seconds between the dates: 
    const difference = differenceInSeconds( formValues.end , formValues.start );


    //* useMemo hooks: 
    const validateTitle = useMemo(() => {

        if( !formSubmitted ) return '';

        return ( formValues.title.length > 0 ) ? 'is-valid' : 'is-invalid'

    }, [formSubmitted , formValues.title] )


    const validateDates = useMemo(() => {

        if( !formSubmitted ) return '';

        return ( isNaN(difference) || difference <= 0 ) ? 'is-invalid' : 'is-valid'

    }, [formSubmitted , formValues.end , formValues.start] )
    
    //* functions of the component :
    const onChangeInput = ({target}) =>{
        setFormValues({
            ...formValues,
            [target.name] : target.value
        })
    }


    const onChangeInputDate = ( event , changing  ) => {
        
        setFormValues({
            ...formValues,
            [changing] : event
        })
    }

    const onCloseModal = () =>{
        closeDateModal();
    }

    const onSubmitEvent = async (event) =>{
        event.preventDefault();

        setFormSubmitted(true);

        if( isNaN(difference) || difference <= 0 ){
            return Swal.fire('Fechas incorrectas' , 'Por favor revise las fechas ingresadas' , 'error')
        }
        
        if( formValues.title.length <= 0  ) return Swal.fire('Titulo no ingresado' , 'Por favor ingrese un titulo al evento' , 'error'); 

        await startSavingEvent( formValues ) ; 
        closeDateModal();
        setFormSubmitted(false)
    }

    return (

        <Modal
            isOpen = { isTheModalOpen }
            onRequestClose = { onCloseModal }
            style = { customStyles }
            className = "modal"
            overlayClassName = "modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <form className="container" onSubmit={ onSubmitEvent }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker selected={ formValues.start } className={ `form-control ${ validateDates }` } placeholder="Fecha inicio" onChange={( event ) => onChangeInputDate( event , 'start' )}  dateFormat="Pp" showTimeSelect locale="es" timeCaption="Hora" />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker selected={formValues.end} className={ `form-control ${ validateDates }` } placeholder="Fecha fin" onChange={(event) =>  onChangeInputDate(event , 'end') } dateFormat="Pp" minDate={ formValues.start } showTimeSelect locale="es"  timeCaption='Hora'/>
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ validateTitle }` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange = { onChangeInput }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange = { onChangeInput }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

            </form>
        </Modal>
    )
}
