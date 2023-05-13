from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer(), unique=False, nullable=False)
    name = db.Column(db.String(60), unique=True, nullable=False)
    url = db.Column(db.String(80), unique=False, nullable=False)
    height = db.Column(db.String(10), unique=False, nullable=True)
    mass = db.Column(db.Integer(), unique=False, nullable=True)
    hair_color = db.Column(db.String(20), unique=False, nullable=True)
    skin_color = db.Column(db.String(20), unique=False, nullable=True)
    eye_color = db.Column(db.String(120), unique=False, nullable=True)
    birth_year = db.Column(db.String(15), unique=False, nullable=True)
    gender = db.Column(db.String(20), unique=False, nullable=True)
    description = db.Column(db.String(120), unique=False, nullable=True)
    favorites = db.relationship('Favorites', backref='people')

    def serialize(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "name": self.name,
            "url": self.url,
            "height": self.height,
            "mass": self.mass,
            "hair_color": self.hair_color,
            "skin_color": self.skin_color,
            "eye_color": self.eye_color,
            "birth_year": self.birth_year,
            "gender": self.gender,
            "description": self.description
        }

    def serialize_post_bis(self):
        return {
            "name": self.name,
            "uid": self.uid
        }

class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer(), unique=False, nullable=False)
    name = db.Column(db.String(60), unique=True, nullable=False)
    url = db.Column(db.String(80), unique=False, nullable=False)
    diameter = db.Column(db.Integer(), unique=False, nullable=True)
    rotation_period = db.Column(db.Integer(), unique=False, nullable=True)
    orbital_period = db.Column(db.Integer(), unique=False, nullable=True)
    gravity = db.Column(db.String(20), unique=False, nullable=True)
    population = db.Column(db.String(120), unique=False, nullable=True)
    climate = db.Column(db.String(120), unique=False, nullable=True)
    terrain = db.Column(db.String(120), unique=False, nullable=True)
    surface_water = db.Column(db.String(120), unique=False, nullable=True)
    favorites = db.relationship('Favorites', backref='planets')


    def serialize(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "name": self.name,
            "url": self.url,
            "diameter": self.diameter,
            "rotation_period": self.rotation_period,
            "orbital_period": self.orbital_period,
            "gravity": self.gravity,
            "population": self.population,
            "climate": self.climate,
            "terrain": self.terrain,
            "surface_water": self.surface_water
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    favorites = db.relationship('Favorites', backref='user')

    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "favorites": [favorite.serialize() for favorite in self.favorites],
        }

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    people_id = db.Column(db.Integer(), db.ForeignKey('people.id'), nullable=True)
    planet_id = db.Column(db.Integer(), db.ForeignKey('planets.id'), nullable=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "people_id": self.people_id,
            "planet_id": self.planet_id
        }