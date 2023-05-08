import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../src/hooks/useAuthStore");

jest.mock('../../src/calendar' , () => ({
    CalendarPage :() => <h1>Calendar Page</h1>
}))

describe('pruebas sobre <AppRouter.jsx/>', () => { 

    const mockStartCheckAuthToken = jest.fn();
    
    beforeEach(()=> jest.clearAllMocks());

    test('debe de mostrar la pantalla de carga  y llamar a startCheckAuthToken', () => {
        
        useAuthStore.mockReturnValue({
            status : 'checking',
            startCheckAuthToken : mockStartCheckAuthToken
        })

        render(
            <AppRouter/>
        )

        expect( screen.getByText('Un momento , se estan verificando sus credenciales ...')).toBeTruthy()
        expect(mockStartCheckAuthToken).toHaveBeenCalled()
    })

    
    test('debe de mostrar la pantalla de login si no esta autenticado', () => {
        
        useAuthStore.mockReturnValue({
            status : 'not-authenticated',
            startCheckAuthToken : mockStartCheckAuthToken
        })

        const { container } = render(
            <MemoryRouter initialEntries={['/']}>
                <AppRouter/>
            </MemoryRouter>
        )

        expect(screen.getAllByText('Ingreso')).toBeTruthy();
        expect(screen.getAllByText('Registro')).toBeTruthy();
        expect(container).toMatchSnapshot()
    })


    test('debe de mostrar la pantalla de calendario si esta autenticado', () => {
        
        useAuthStore.mockReturnValue({
            status : 'authenticated',
            startCheckAuthToken : mockStartCheckAuthToken
        })

        render(
            <MemoryRouter initialEntries={['/auth/login']}>
                    <AppRouter/>
            </MemoryRouter>
        )

            expect(screen.getByText('Calendar Page')).toBeTruthy();
    })

})