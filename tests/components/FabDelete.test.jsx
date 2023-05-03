import { render, screen } from "@testing-library/react";
import { FabDelete } from "../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../src/hooks";


jest.mock('../../src/hooks/useCalendarStore')

describe('pruebas sobre <fabDelete/>', () => { 
    
    test('debe de mostrar el componente correctamente ', () => { 

        useCalendarStore.mockReturnValue({ hasEventSelected : false });

        render( <FabDelete/> );

        const btn = screen.getByLabelText('btn-delete');
        
        expect(btn.className).toContain('btn');
        expect(btn.className).toContain('btn-danger');
        expect(btn.className).toContain('fab-danger');
        expect(btn.style.display).toBe('none');
    })
})