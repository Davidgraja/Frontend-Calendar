import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CheckingPage, LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

  const { startCheckAuthToken , status } = useAuthStore();

  useEffect(() => {
    startCheckAuthToken();
  }, [])
  

  if(status === 'checking'){
    return <CheckingPage/>
  }

  return (

    <Routes>

      {
        ( status == 'not-authenticated' )   ? 
          <>
            <Route path='/auth/*' element={ <LoginPage/> } /> 
            <Route path='/*' element={ <Navigate to={ '/auth/login' }/> } />
          </>
        : 
        <>
          <Route path='/' element={ <CalendarPage/> } />
          <Route path='/*' element={ <Navigate to={ '/' }/> } />

        </> 
      }

    </Routes>

  )
}
