import { fireEvent, render, screen } from "@testing-library/react";
import { FabAddNew } from "../../src/calendar/components/FabAddNew";
import { useCalendarStore , useAuthStore , useUiStore } from "../../src/hooks";
import { testUserCredentials } from "../fixtures/testUser";

jest.mock('../../src/hooks/useCalendarStore');
jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/hooks/useUiStore');


const mockSetActiveEvent = jest.fn();
const mockOpenDateModal = jest.fn();

describe('Pruebas en <FabAddNew.jsx/> ', () => { 

    useCalendarStore.mockReturnValue({
        setActiveEvent :  mockSetActiveEvent
    })

    
    useUiStore.mockReturnValue({
        openDateModal :  mockOpenDateModal
    })

    useAuthStore.mockReturnValue({
        user : testUserCredentials
    })


    beforeEach( ()=> jest.clearAllMocks() )

    test('Debe de mostrar el componente correctamente', () => { 

        render(
            <FabAddNew/>
        )

        const btn = screen.getByRole('button');

        expect(btn.className).toContain('btn');
        expect(btn.className).toContain('btn-primary');
        expect(btn.className).toContain('fab');

    })

    test('setActiveEvent debe de llamarse', () => {  
        
        render(
            <FabAddNew/>
        )

        const btn = screen.getByRole('button');

        fireEvent.click(btn)

        expect(mockSetActiveEvent).toHaveBeenCalled();
        expect(mockSetActiveEvent).toHaveBeenCalledWith(expect.any(Object))
    })

    test('openDateModal debe de llamarse', () => { 

        render(
            <FabAddNew/>
        )

        const btn = screen.getByRole('button');

        fireEvent.click(btn);

        expect(mockOpenDateModal).toHaveBeenCalled();
    })

})