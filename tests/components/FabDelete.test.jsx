import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../src/hooks";


jest.mock('../../src/hooks/useCalendarStore')

describe('pruebas sobre <fabDelete.jsx/>', () => { 

    const mockStartDeleteEvent = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('debe de mostrar el componente correctamente ', () => { 

        useCalendarStore.mockReturnValue({ hasEventSelected : false });

        render( <FabDelete/> );

        const btn = screen.getByLabelText('btn-delete');
        
        expect(btn.className).toContain('btn');
        expect(btn.className).toContain('btn-danger');
        expect(btn.className).toContain('fab-danger');
        expect(btn.style.display).toBe('none');
    })

    test('debe de mostrar el componente si hay un evento activo ', () => { 

        useCalendarStore.mockReturnValue({ hasEventSelected : true });

        render( <FabDelete/> );

        const btn = screen.getByLabelText('btn-delete');
    
        expect(btn.style.display).toBe('');
    })

    test('debe de llamar  la función startDeleteEvent  ', () => { 

        useCalendarStore.mockReturnValue({ 
            hasEventSelected : true,
            startDeleteEvent : mockStartDeleteEvent
        });

        render( <FabDelete/> );

        const btn = screen.getByLabelText('btn-delete');
    
        fireEvent.click(btn);

        expect(mockStartDeleteEvent).toHaveBeenCalled();
        
    })
})