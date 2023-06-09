import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { onChecking, onClearErrorMessage, onLogin, onLogout, onLogoutEvents } from "../store";

export const useAuthStore = () => {

    const { status , user , errorMessage } = useSelector( (state) => state.auth);
    const dispatch = useDispatch();

    
    const startLogin = async ({ email , password }) => {

        dispatch(onChecking());

        try {
            
            const {data}= await calendarApi.post('/auth',{email , password});
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin( {name : data.name , uid : data.uid} ))

        } catch (error) {
            dispatch( onLogout( 'Credenciales incorrectas' ) );
            setTimeout(()=>{
                dispatch(onClearErrorMessage());
            },1000);
        }

    }

    const startRegister = async ({name , email , password}) =>{

        dispatch(onChecking());

        try {
            
            const {data} = await  calendarApi.post('/auth/new' , {name , email , password} );

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin( {name : data.name , uid : data.uid} ))

        } catch (error) {
            
            let msgError ;
            const {data}  = error.response;

            // ? get error message of the petition  
            data.password ? msgError = data.password.msg : 
            data.email ? msgError = data.email.msg :
            msgError = data.msg 
            
            dispatch( onLogout( msgError ) );
            setTimeout(()=>{
                dispatch(onClearErrorMessage());
            },1000);
        }

    }

    const startCheckAuthToken = async () =>{
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());
        

        try {
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin( {name : data.name , uid : data.uid} ));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }


    const startLogout = () =>{
        // localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        dispatch(onLogoutEvents());
        dispatch(onLogout());

    }

    return {

        //* Properties
        status,
        user, 
        errorMessage, 
        
        //* Methods

        startLogin,
        startRegister,
        startCheckAuthToken,
        startLogout
    
    }
}