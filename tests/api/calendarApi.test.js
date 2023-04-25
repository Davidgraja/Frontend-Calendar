import calendarApi from '../../src/api/calendarApi';

describe('Pruebas en calendarApi.js', () => { 

    test('Debe de tener la configuración por defecto', () => { 
        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URl );
    })


    test('La petición debe de tener el x-token en todas las peticiones', async () => { 

        const token = 'token-Test-123';

        localStorage.setItem('token' , token);
        
        const response = await calendarApi.get('/auth/renew')
        .then( res => res)
        .catch( error => error)

        expect(response.config.headers['x-token']).toBe(token);
    })


})