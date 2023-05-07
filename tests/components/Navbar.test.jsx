import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../src/calendar/components/Navbar";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { testUserCredentials } from "../fixtures/testUser";

jest.mock('../../src/hooks/useAuthStore')

const mockStartLogout = jest.fn();

describe('Pruebas sobre <Navbar.jsx/>', () => { 

    useAuthStore.mockReturnValue({
        startLogout : mockStartLogout,
        user : testUserCredentials

    })

    beforeEach(()=> jest.clearAllMocks());
    
    test('Debe de mostrar el componente correctamente' , ()=>{

        render(
            <Navbar/>
        )

        expect(screen.getByText(testUserCredentials.name)).toBeTruthy();
        
    })

    
    test('startLogout debe de ser llamado cuando se haga click en el boton salir' , ()=>{

        render(
            <Navbar/>
        )

        const btn = screen.getByRole('button');

        fireEvent.click(btn);

        expect(mockStartLogout).toHaveBeenCalled()


        
    })
    
})