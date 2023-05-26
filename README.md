# Star Wars Web App

Welcome to the Star Wars Web App! This project is a React web application that interacts with a RESTful API built with Python Flask and SQLAlchemy. The app allows users to browse and search for information about Star Wars characters, vehicles, and planets. Users can also save their favorite items and view them later.

<p align="center">
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png' alt='react' width='40'>
<img src='https://media.licdn.com/dms/image/C5112AQF49DOfOhCFSA/article-cover_image-shrink_720_1280/0/1579816811751?e=2147483647&v=beta&t=e47GGJDzoqsm4dl3qV2EjVWrxyMzIwsPmEE9Gywo83w' alt='api' width='30'>
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/320px-Python-logo-notext.svg.png' alt='python' width='40'>
<img src='https://blog.tiraquelibras.com/wp-content/uploads/2019/08/Flask.png'
alt='flask' width='50'>
<img src='https://hakin9.org/wp-content/uploads/2019/08/connect-a-flask-app-to-a-mysql-database-with-sqlalchemy-and-pymysql.jpg'
alt='SQLAlchemy' width='60'>
</p>

## Features

- React web app with a user-friendly interface
- Browse and search for Star Wars characters, vehicles, and planets
- Detailed information view for each entity
- Favorite/Read Later functionality to save items
- Autocomplete search bar for Characters and Planets
- RESTful API built with Python Flask and SQLAlchemy
- Authentication system with JWT Token

## Frontend

The frontend of the Star Wars Web App is built using React. It provides a user interface to interact with the SWAPI (Star Wars API) and display information about people, vehicles, and planets. The frontend features Bootstrap components, such as cards and modals, to present the entity details in an organized manner.

![Frontend Screenshot](/images/frontend-screenshot.png)

![Card Details](/images/card-details.png)

![Register](/images/register.png)

## Backend

The backend of the Star Wars Web App is a RESTful API built with Python Flask. It uses SQLAlchemy as the ORM (Object-Relational Mapping) library to connect to a database and retrieve entity information. The API implements various endpoints to fetch data for people, planets, and user-related operations.

### Endpoints

- `[GET] /people`: Get a list of all the people in the database
- `[GET] /people/<int:people_id>`: Get information about a single person
- `[POST] /people`: Add a new person to the database
- `[PUT] /people/<int:people_id>`: Update the information of a person in the database
- `[DELETE] /people/<int:people_id>`: Delete a person from the database based on their ID

- `[GET] /planets`: Get a list of all the planets in the database
- `[GET] /planets/<int:planet_id>`: Get information about a single planet
- `[POST] /planet`: Add a new planet to the database
- `[PUT] /planet/<int:planet_id>`: Update the information of a planet in the database
- `[DELETE] /planet/<int:planet_id>`: Delete a planet from the database based on their ID

- `[GET] /user`: Get a list of all the blog post users
- `[POST] /register`: Register a new user
- `[POST] /login`: Log in with user credentials

- `[POST] /favorite`: Add a new item as a favorite for the current user
- `[DELETE] /favorite/<int:id>`: Remove a favorite item from the current user's list based on its ID

## Getting Started

To set up the Star Wars Web App locally, follow these steps:

1. Clone the repository: `git clone https://github.com/SaraMoreiraG/StarWars-React-Flask.git`
2. Navigate to the project directory: `cd star-wars-web-app`
3. Install the frontend dependencies: `npm install`
4. Start the frontend development server: `npm start`
5. In a separate terminal, navigate to the backend directory: `cd backend`
6. Install the backend dependencies: `pip install -r requirements.txt`
7. Run the Flask development server: `python app.py`
8. Access the web app in your browser at: `http://localhost:3000`

## Contributing

Contributions are welcome! If you'd like to contribute to the Star Wars Web App, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Make your changes and commit them: `git commit -am 'Add your commit message'`
4. Push your changes
