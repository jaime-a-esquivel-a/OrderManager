# OrderManager

Es una aplicación de gestión de órdenes de venta de materiales, que permite registrar, supervisar y gestionar las órdenes llevando un control administrativo de todo el proceso de venta.

- Administración de usuarios (crear, visualizar, modificar y borrar).
- Administración de clientes (crear, visualizar, modificar y borrar).
- Administración de materiales (crear, visualizar, modificar y borrar).
- Administracion de órdenes de venta.
     - Dashboard de órdenes (gráfico por status).
     - Seguimiento de órdenes (order to cash).
     - Crear, visualizar, modificar y borrar.

---
  ## Contenido
  1. [Enlaces](#enlaces)
  2. [Tecnologias](#tecnologias)
  3. [Uso](#uso)
  4. [Instalación](#instalación)
  5. [Contribución](#contribución)
  6. [Colaboradores](#colaboradores)
  
---
## Enlaces

**[Aplicación desplegada ](https://order-manager-application.herokuapp.com/ "click")**.

**[URL de repositorio de GitHub](https://github.com/jaime-a-esquivel-a/OrderManager "click")**.

---
## Tecnologias:

- node JS versión 16.18.0
- npm express 4.17.1
- npm sequelize 6.3.5
- npm mysql2 2.2.5
- npm dotenv 8.2.0
- npm bcrypt 5.0.0
- npm connect-session-sequelize 7.0.4
- npm express-handlebars 5.2.0
- npm express-session 1.17.1
- npm handlebars 4.7.6
- chart.js
- Boostrap 5
- HTML
- Heroku

---
## Uso
  
* Ingresar a la aplicación desplegada en **[Heroku](https://order-manager-application.herokuapp.com/ "click")** o acceder desde el navegador  con la dirección [http://localhost:3001](http://localhost:3001 ) despues de haber ejecutado el archivo como muestra la sección de [Instalación](#instalación).
* Al ingresar a la aplicación es necesario iniciar sesión introduciendo credenciales (correo electrónico y contraseña) de acuerdo con el usuario con el que desee acceder y después dar click en "Login" para ingresar a la página de inicio.

  <img src="./public/images/InicioSesion.png" alt="Inicio de sesión" width="400" height="500">
* Al ingresar a la página de inicio "Home" se le mostrará un menú con la barra de navegación de la página, una gráfica con la cantidad de órdenes del usuario que ha iniciado sesión de acuerdo a su status.

  <img src="./public/images/Home.png" alt="Home" width="800" height="500">
### Sección usuario
* Si ha iniciado sesión un super user, entonces podrá visualizar, actualizar y eliminar los usuarios que se encuentran en la base de datos, así como crear nuevos. De lo contrario solo podrá visualizarlos.

    <img src="./public/images/Usuario.png" alt="Sección de usuario" >
### Crear usuario
* Para crear un usuario es necesario:
    * Presionar el botón de "Create" en la sección de Usuarios.
    * Llenar toda la información de la siguiente pantalla y dar click en el botón "Submit" para crearlo.

     <img src="./public/images/CrearUsuario.png" alt="Crear Usuario" width="800" height="500">
### Modificar usuario
* Para modificar un usuario es necesario:
    * Presionar el botón de "Modificar" en la sección de Usuarios.
    * Llenar la información que desea modificar de la siguiente pantalla (no será posible modificar e-mail del usuario) y dar click en el botón "Submit" para actualizarla.

    <img src="./public/images/ModificarUsuario.png" alt="Modificar Usuario" width="800" height="500">

 ### Sección cliente
* Si ha iniciado sesión un super user, entonces podrá visualizar, actualizar y eliminar los clientes que se encuentran en la base de datos, así como crear nuevos. De lo contrario solo podrá visualizarlos.

    <img src="./public/images/Cliente.png" alt="Sección de cliente">
### Crear cliente
* Para crear un cliente es necesario:
    * Presionar el botón de "Create" en la seccion de Clientes.
    * Llenar toda la información de la siguiente pantalla y dar click en el botón "Submit" para crearlo.

     <img src="./public/images/CrearCliente.png" alt="Crear cliente" width="800" height="500">
### Modificar cliente
* Para modificar un cliente es necesario:
    * Presionar el botón de "Modificar" en la seccion de ClienteS.
    * Llenar la información que desea modificar de la siguiente pantalla (no será posible modificar RFC del cliente) y dar click en el botón "Submit" para actualizarla.

    <img src="./public/images/ModificarCliente.png" alt="Modificar cliente" width="800" height="500">

### Sección de Materiales

<img src="./public/images/SeccionMateriales.JPG" alt="Sección Materiales" width="900" height="500"/>  

* La sección de materiales se accede mediante el menú izquierdo y permite visualizar, actualizar y eliminar los materiales que se encuentran en la base de datos, así como crear nuevos materiales.
* La creación, actualización y eliminación de materiales solo está permitida para aquellos usuarios que sean super users.
* Cada uno de los materiales puede ser modificado o eliminado.
* \* Para buscar un material:
    * Se puede introducir el SKU completo del material o únicamente parte de él. Si se coloca una parte del SKU, la aplicación buscará todas las coincidencias con ese SKU parcial y devolverá los materiales correspondientes al usuario.
    * Si se deja vacío el campo de búsqueda y se presiona el botón de Buscar, entonces la aplicación regresará todos los materiales en la base de datos.

### Crear un material

* Para crear un material es necesario:
    * Presionar el botón de Create en la sección de Materiales.
    * Llenar toda la información del formulario y presionar el botón Submit.
        * Los campos de Stock y Price permiten números con punto decimal.  
    <img src="./public/images/CrearMaterial.JPG" alt="Crear Material" width="600" height="400"/>    

### Actualizar un material

* Para actualizar un material es necesario:
    * Presionar el botón de Editar/Actualizar en la línea del material a modificar en la sección de Materiales.
    * Modificar la información en el formulario y presionar el botón Submit.
        * No es posible modificar el SKU del material.    
<img src="./public/images/ActualizarMaterial.JPG" alt="Actualizar Material" width="600" height="400"/>    

### Sección de Órdenes

<img src="./public/images/SeccionOrdenes.JPG" alt="Sección Órdenes" width="900" height="500"/>      

* La sección de órdenes se accede mediante el menú izquierdo y permite visualizar, actualizar y eliminar las órdenes que se encuentran en la base de datos, así como crear nuevas órdenes y modificar el status de la orden.
* Esta sección solamente da acceso a las órdenes creadas por el usuario que ha iniciado sesión. 
* Si ha iniciado sesión un super user, entonces tendrá acceso a todas las órdenes de la base de datos.
* Cada uno de las órdenes puede ser visualizada, modificada o eliminada.
* \* Para buscar una orden:
    * Hay que seleccionar un status del menú desplegable y presionar el botón de Buscar.
    * Si no se selecciona una opción del menú desplegable o se selecciona la opción All y después se presiona el botón de Buscar, entonces se muestran órdenes de todos los status disponibles para el usuario.
* \*\* Cambio de status de una orden:
    * La orden puede cambiar de status desde Quotation hasta Delivered al presionar el botón para mover el status hacia adelante.
    * Cuando se llega al status Delivered, entonces el bóton para mover el status desaparece.
    * Cuando la orden cambia de status a Ready, entonces ya no será posible editar o borrar la orden y los botones correspondientes desaparecerán. 

### Crear una orden

* Para crear una orden es necesario:
    * Presionar el botón de Create en la sección de Órdenes.
    * Llenar toda la información de la siguiente pantalla y presionar el botón Submit.  
<img src="./public/images/CreacionOrden.JPG" alt="Crear Orden" width="900" height="500"/>  

* Esta pantalla permite:
    * Crear una orden para el usuario conectado, por lo que no es posible mover el user.
    * Seleccionar un cliente activo en la base de datos.
    * \*Buscar materiales para agregar a la orden:
        * Se puede introducir el SKU completo del material o únicamente parte de él. Si se coloca una parte del SKU, la aplicación buscará todas las coincidencias con ese SKU parcial y devolverá los materiales correspondientes al usuario.
        * Si se deja vacío el campo de búsqueda y se presiona el botón de Buscar, entonces la aplicación regresará todos los materiales en la base de datos.
    * Agregar materiales a la orden:
        * Cada material encontrado en la búsqueda posee un botón para ser agregado a la orden.
        * Al presionar el botón para agregar el material, dicho material aparecerá en la sección inferior.
    * Eliminar materiales agregados a la orden.
    * Modificar la cantidad del material agregado.
    * \*\* Cuando se agregan, eliminan materiales y/o cuando se cambia la cantidad de uno o múltiples materiales, la cantidad total de la orden se actualiza en el momento.

### Actualizar una orden

* Para actualizar una orden es necesario:
    * Presionar el botón de Editar/Actualizar en la línea de la orden a modificar en la sección de Órdenes.
    * Modificar la información de la siguiente pantalla y presionar Submit.  

    <img src="./public/images/ActualizarOrden.JPG" alt="Actualizar Orden" width="900" height="500"/>  

* En esta pantalla se podrá visualizar toda la información actual de la orden, junto con sus materiales, cantidades y total.
* Al actualizar la orden no será posible modificar el user ni el cliente.
* Esta pantalla permite:
    * Buscar materiales para ser agregados a la orden.
    * Agregar nuevos materiales.
    * Modificar la cantidad de materiales previos y nuevos.
    * Eliminar materiales previos y nuevos.
* Cuando se agregan, eliminan materiales y/o cuando se cambia la cantidad de uno o múltiples materiales, la cantidad total de la orden se actualiza en el momento.



---
 ## Instalación
- Clonar repositorio
    - Abrir el siguiente link **[URL de repositorio de GitHub](https://github.com/jaime-a-esquivel-a/OrderManager "click")**.
    - Hacer click en <> Code.

        ![Captura de pantalla para clonar repositorio](./public/images/CloneRepo.png)
    - Copiar la direccion URL del repositorio.

        ![Captura de pantalla para copiar direccion URL del repositorio](./public/images/CopyURL.png)
    - Abrir GitBash.
    - Ir a la ubicacion en donde quieres clonar el repositorio.
    - Escribir **`git clone`** y pegar la url antes copiada.
    - Presionar enter para clonar.

- Instalar node desde la pagina oficial **[NodeJS web Oficial](https://nodejs.org/es/ "click")**.
    - Abrir GitBash.
    - Ir a la ubicacion en donde se clonó el repositorio.
    - Escribir **`npm i`** para instalar las dependencias del proyecto.
    - Con esto instalaremos todas las dependecias que tengamos en el package.json y nos creará una carpeta llamada **node_modules** con las dependencias listas para utilizar.
     Dirijirse al archivo **`.env.example`** y agregar las siguientes variables para proteger las credenciales de la base de datos y poder conectarse.
     
            DB_NAME='nombre de la base de datos'
            DB_USER='nombre de usuario'
            DB_PASSWORD='tu contraseña de MYSQL'
        
    - Escribir **`mysql -u root -p`** para conectarse a MySQL CLI e igresar contraseña.
    - Escribir **`source schema.sql`** para crear la base de datos MySQL (Asegurarse que la ruta sea correcta).
        - #### Diagrama UML de la base de datos
            <img src="./public/images/DiagramaUML.png" alt="Diagrama UML de la base de datos" width="650" height="600">

    - Escribir **`quit`** para desconectarse de MySQL CLI
    - Escribir  en la terminal GitBash **`node seeds/index.js `** para agregar datos a la base de datos y poder comprobar las rutas (opcional).
    - Escribir **`npm start`** para ejecutar el archivo.

---
## Contribución
    
  Para contribuir con este proyecto:
- Fork del repositorio.
- Clonar el  repositorio.
- Actualizar la rama master.

        $git pull -r upstream master
- Crear rama.

        $ git checkout -b feature-nombre-rama
- Realizar cambios, agregarlos, hacer commit y despues hacer push hacia nuestro repositorio indicando la rama que hemos creado.

        $ git push origin feature-nombre-rama
- Hacer un Pull Request.
- Esperar que el codigo se acepte y se haga merge.

---
## Colaboradores
    
- **[Jorge Ramirez Anzaldo](https://github.com/JorgeRamirezAnzaldo "click")**.
- **[Jaime Alberto Esquivel Acosta](https://github.com/jaime-a-esquivel-a "click")**.
- **[Diana Carolina Cruz Velázquez](https://github.com/Caro2102 "click")**.
