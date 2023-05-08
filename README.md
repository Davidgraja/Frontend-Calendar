<<<<<<< HEAD

=======
>>>>>>> testing
# Calendar app 🗓️

Calendar App es un proyecto enfocado a trabajo colaborativo , en este , un grupo de personas podran añadir y ver eventos en un calendario , ademas de otras funcionalidades 

## Uso de la app 
el uso de la aplicación  es totalmente libre y sencilla de usar , pero algo a tener en cuenta es de que la app esta enfocada hacia un trabajo colaborativo , lo cual es algo a tener en cuenta.

dentro de la aplicación tenemos las siguientes  paginas :

- ### Login : 
    Aqui podremos realizar el login hacia la pagina principal si ya estamos registrados , en el caso de que no estemos registrados podremos realizar el registro en esta misma pagina

![Login Screenshot](https://i.postimg.cc/kXKfzHL7/Login-calendar-app.png)

- ### Pagina principal :
    Dentro de la pagina principal  tenemos varias vistas :

📌 _Vista mes :_

![Vista mes Screenshot](https://i.postimg.cc/qvrjTLdy/vista-mes-calendar-App.png)


📌 _Vista semana :_  

![Vista semana Screenshot](https://i.postimg.cc/5tNgH2yt/vista-semana-calendar-app.png)

📌 _Vista dia :_  

![Vista dia Screenshot](https://i.postimg.cc/T3cQYDRS/vista-dia-calendar-app.png)

📌 _Vista agenda :_  

![Vista agenda Screenshot](https://i.postimg.cc/1t8KH7ph/vista-agenda-calendar-app.png)


#### Funcionalidades : 
Como tal la aplicación puede realizar todo un crud , cuando  haces login y la aplicación te da acceso a la pagina principal  , se obtendaran todos los eventos que colaborativamente se han añadido.

Para __crear__ un nuevo evento , solo debemos de dar  click en el boton añadir  o el boton color azul presente en todas las vistas de la pagina principal , al hacer click se abrira un modal con los campos necesarios para añadir un nuevo evento  , ejemplo :

![Vista agenda Screenshot](https://i.postimg.cc/N0J4Rv2k/acci-n-crear-evento-activo-calendar-app.png)

Para __eliminar__ un evento solo es necesario dar click en el evento deseado , con esto se nos habilitará el boton para eliminar, __Nota importante__ : solo la persona que creo el evento podra eliminarlo ,de lo contrario no se realizara la acción de eliminar.

Para __actualizar__  un evento solo debemos de dar doble click en el evento a actualizar , con esto se nos mostrara nuevamente el modal donde podremos  modificar el evento seleccionado , __Nota importante__ : solo la persona que creo el evento podra actualizarlo ,de lo contrario no se realizara la acción de actualizar.


## Herramientas usadas:
- [React](https://es.react.dev/)
- [vite](https://vitejs.dev/)
- [Node js](https://nodejs.org/es) 
- [Redux toolkit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/es/docs/intro)
- [jest](https://jestjs.io/es-ES/)

Ademas se hacen uso de otros paquetes de node js como : 

- [date-fns](https://date-fns.org/) 
- [react-router-dom](https://reactrouter.com/en/main)
- [react-big-calendar](https://www.npmjs.com/package/react-big-calendar) 
- [react-datepicker](https://www.npmjs.com/package/react-datepicker)
- [react-modal](https://www.npmjs.com/package/react-modal)
- [sweetalert2](https://sweetalert2.github.io/)

## información adicional:
Esta aplicación fue creada desde cero , tanto la parte de frontend como el backend , todo esto para afianzar mis conocimientos en ambas áreas , si desean solo hacer uso del backend  e implementar su  propio frontend , pueden ver la documentación de este servicio en : [Github Backend-calendar](https://github.com/Davidgraja/Backend-Calendar)

### Testing :

Se ha añadido el modulo de testing a la aplicación , si deseas ejecutar las pruebas solo es es necesario que ejecutes el comando ``` yarn test ``` de esa manera se ejecutaran todas las pruebas

por ultimo puedes ver y hacer uso de esta app en [calendar app ](https://marvelous-medovik-7dc29f.netlify.app)  , disfrutalo !!👋