# Aplicación Web de Star Wars

¡Bienvenido a la Aplicación Web de Star Wars! Este proyecto es una aplicación web en React que interactúa con una API RESTful construida con Python Flask y SQLAlchemy. La aplicación permite a los usuarios buscar y explorar información sobre personajes, vehículos y planetas de Star Wars. Los usuarios también pueden guardar sus elementos favoritos y verlos más tarde.

<p align="center">
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png' alt='react' width='40'>
<img src='https://media.licdn.com/dms/image/C5112AQF49DOfOhCFSA/article-cover_image-shrink_720_1280/0/1579816811751?e=2147483647&v=beta&t=e47GGJDzoqsm4dl3qV2EjVWrxyMzIwsPmEE9Gywo83w' alt='api' width='30'>
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/320px-Python-logo-notext.svg.png' alt='python' width='40'>
<img src='https://blog.tiraquelibras.com/wp-content/uploads/2019/08/Flask.png'
alt='flask' width='50'>
<img src='https://hakin9.org/wp-content/uploads/2019/08/connect-a-flask-app-to-a-mysql-database-with-sqlalchemy-and-pymysql.jpg'
alt='SQLAlchemy' width='60'>
</p>

## Funcionalidades

- Aplicación web en React con una interfaz amigable para el usuario
- Explorar y buscar personajes, vehículos y planetas de Star Wars
- Vista detallada de información para cada entidad
- Funcionalidad de Favoritos/Leer más tarde para guardar elementos
- Barra de búsqueda con autocompletado para Personajes y Planetas
- API RESTful construida con Python Flask y SQLAlchemy
- Sistema de autenticación con tokens JWT

## Frontend

El frontend de la Aplicación Web de Star Wars está construido con React. Proporciona una interfaz de usuario para interactuar con la SWAPI (Star Wars API) y mostrar información sobre personajes, vehículos y planetas. El frontend utiliza componentes de Bootstrap, como tarjetas y modales, para presentar los detalles de las entidades de manera organizada.

![Captura de pantalla del frontend](/images/frontend-screenshot.png)

![Detalles de la tarjeta](/images/card-details.png)

![Registro](/images/register.png)

## Backend

El backend de la Aplicación Web de Star Wars es una API RESTful construida con Python Flask. Utiliza SQLAlchemy como biblioteca ORM (Mapeo Objeto-Relacional) para conectarse a una base de datos y recuperar información de las entidades. La API implementa varios endpoints para obtener datos de personas, planetas y operaciones relacionadas con usuarios.

### Endpoints

- `[GET] /people`: Obtener una lista de todas las personas en la base de datos
- `[GET] /people/<int:people_id>`: Obtener información sobre una persona en particular
- `[POST] /people`: Agregar una nueva persona a la base de datos
- `[PUT] /people/<int:people_id>`: Actualizar la información de una persona en la base de datos
- `[DELETE] /people/<int:people_id>`: Eliminar una persona de

la base de datos según su ID

- `[GET] /planets`: Obtener una lista de todos los planetas en la base de datos
- `[GET] /planets/<int:planet_id>`: Obtener información sobre un planeta en particular
- `[POST] /planet`: Agregar un nuevo planeta a la base de datos
- `[PUT] /planet/<int:planet_id>`: Actualizar la información de un planeta en la base de datos
- `[DELETE] /planet/<int:planet_id>`: Eliminar un planeta de la base de datos según su ID

- `[GET] /user`: Obtener una lista de todos los usuarios de publicaciones de blog
- `[POST] /register`: Registrar un nuevo usuario
- `[POST] /login`: Iniciar sesión con las credenciales de usuario

- `[POST] /favorite`: Agregar un nuevo elemento como favorito para el usuario actual
- `[DELETE] /favorite/<int:id>`: Eliminar un elemento favorito de la lista del usuario actual según su ID

## Para Empezar

Para configurar la Aplicación Web de Star Wars de forma local, sigue estos pasos:

1. Clona el repositorio: `git clone https://github.com/SaraMoreiraG/StarWars-React-Flask.git`
2. Navega hasta el directorio del proyecto: `cd star-wars-web-app`
3. Instala las dependencias del frontend: `npm install`
4. Inicia el servidor de desarrollo del frontend: `npm start`
5. En una terminal separada, navega hasta el directorio del backend: `cd backend`
6. Instala las dependencias del backend: `pip install -r requirements.txt`
7. Ejecuta el servidor de desarrollo de Flask: `python app.py`
8. Accede a la aplicación web en tu navegador: `http://localhost:3000`

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir a la Aplicación Web de Star Wars, sigue estos pasos:

1. Haz un "fork" del repositorio.
2. Crea una nueva rama: `git checkout -b feature/mi-funcionalidad`
3. Realiza tus cambios y haz un commit: `git commit -am 'Agregar mensaje de commit'`
4. Sube tus cambios.
