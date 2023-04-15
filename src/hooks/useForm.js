import { useEffect, useMemo, useState } from "react";


/**
 * 
 * @param {object} states 
 * @param {object} formValidations  este debe  de ser un objeto el cual contenga dentro de un array los campos que se estan validando --- campo : [ funcion anonima con la validacion , 'mensaje de Error' ],
 * @returns 
 */
export const useForm = ( states = {}  , formValidations = {} ) => {

    const [formState, setFormState] = useState( states );
    const [ formValidation, setFormValidation ] = useState({})

    useEffect(() => {
        createValidators()
    
    }, [formState])
    

    const isFormValid = useMemo(()=> {

        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false;
        }

        return true ;
    } , [formValidation])


    const onEventInput = ({target}) =>{
        const { name , value} = target;
        
        setFormState({
            ...formState,
            [ name ]: value
        })
    } 

    const onResetForm = () =>{
        setFormState(states)
    }

    const createValidators = () => {
        const formCheckedValue = {}

        for (const formField of Object.keys(formValidations)) {

            const [fn , errorMessage] = formValidations[formField];
            
            formCheckedValue[`${ formField }Valid`] = fn(formState[formField]) ? null : errorMessage;

        }

        setFormValidation(formCheckedValue);
    }

    return {
        ...formState,
        formState,
        onEventInput,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}