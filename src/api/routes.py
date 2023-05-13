from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, People, Planets, User, Favorites
from api.utils import generate_sitemap, APIException

# Token
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# --------------  CHARACTERES

@api.route('/people', methods=['GET'])
def get_all_people():
    people = People.query.all()
    return jsonify({"data": [person.serialize() for person in people]}), 200

@api.route('/person/<int:people_uid>', methods=['GET'])
def get_person_by_id(people_uid):
    person = People.query.filter_by(uid=people_uid).first()
    return jsonify({"data": person.serialize()}), 200

@api.route('/people', methods=['POST'])
def add_people():
    body = request.json
    person = People(
        uid = body["uid"],
        name = body["name"],
        url = body["url"],
        height = body["height"],
        mass = body["mass"],
        hair_color = body["hair_color"],
        skin_color = body["skin_color"],
        eye_color = body["eye_color"],
        birth_year = body["birth_year"],
        gender = body["gender"],
        description = body["description"],
    )
    db.session.add(person)
    db.session.commit()
    return jsonify({"response": "Person added"}), 200

# --------------  PLANETS

@api.route('/planets', methods=['GET'])
def get_all_planets():
    planets = Planets.query.all()
    return jsonify({"data": [planet.serialize() for planet in planets]}), 200

@api.route('/planet/<int:planet_uid>', methods=['GET'])
def get_planet_by_id(planet_uid):
    planet = Planets.query.filter_by(uid=planet_uid).first()
    return jsonify({"data": planet.serialize()}), 200

@api.route('/planet', methods=['POST'])
def add_planet():
    body = request.json
    planet = Planets(
        uid = body["uid"],
        name = body["name"],
        url = body["url"],
        diameter = body["diameter"],
        rotation_period = body["rotation_period"],
        orbital_period = body["orbital_period"],
        gravity = body["gravity"],
        population = body["population"],
        climate = body["climate"],
        terrain = body["terrain"],
        surface_water = body["surface_water"],
    )
    db.session.add(planet)
    db.session.commit()
    return jsonify({"response": "Planet added"}), 200

# --------------  USER

@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    if user_id :
        user = User.query.filter_by(id = user_id).first()
        return jsonify(user.serialize()), 200
    else:
        return ({"error" : 'Unregistered user'}), 422

@api.route('/register', methods=['POST'])
def create_user():
    body = request.json
    user_already_exist = User.query.filter_by(email= body["email"]).first()
    if user_already_exist:
        return jsonify({"response": "Email already in use"}), 403
    if body["user_name"] is not None and body["email"] is not None and body["password"] is not None:
        user = User(
            user_name = body["user_name"],
            email = body["email"],
            password = body["password"]
        )
        db.session.add(user);
        db.session.commit();
        return jsonify({"response": "User created"}), 200
    else:
        return jsonify({"error": "Missing user details"}), 403

@api.route('/login', methods=['POST'])
def login_user():
    body = request.json
    user = User.query.filter_by(email= body["email"], password= body["password"]).first()
    if user:
        token = create_access_token(identity=user.id) # Token
        return jsonify({"token": token})
    else:
        return jsonify({"error": "Error with credentials"}), 403

# --------------  USER/FAV

@api.route('/favorite', methods=['POST'])
@jwt_required()
def add_favorite_people():
    user_id = get_jwt_identity()
    body = request.json
    if(body["key"] == "character"):
        people_id = body["people_id"]
        planet_id = None
    elif(body["key"] == "planet"):
        people_id = None
        planet_id = body["planet_id"]

    favorite = Favorites(
        user_id = user_id,
        name = body["name"],
        people_id = people_id,
        planet_id = planet_id
    )
    
    db.session.add(favorite)
    db.session.commit()
    return jsonify({"response": "Favorite added"}), 200

@api.route('/favorite/<int:id>', methods=['DELETE'])
def delete_favorite_people(id):
    print('@@@@@@')
    user_id_check = 1
    favorite = Favorites.query.get(id)
    if favorite.user_id == user_id_check:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"response": "Favorite deleted"}), 200
    else:
        return jsonify({"response": "You don't have permission"}), 400

# @api.route('/favorite/planet/<int:planet_uid>', methods=['POST'])
# def add_favorite_planet(planet_uid):
#     user_id_check = 1
#     favorite = Favorites(
#         user_id = user_id_check,
#         planet_id = planet_uid,
#     )
#     db.session.add(favorite);
#     db.session.commit();
#     return jsonify({"response": "Favorite added"}), 200

# @api.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
# def delete_favorite_planet(planet_id):
#     user_id_check = 1
#     favorite = Favorites.query.get(planet_id)
#     if favorite.user_id == user_id_check:
#         db.session.delete(favorite);
#         db.session.commit();
#         return jsonify({"response": "Favorite deleted"}), 200
#     else:
#         return jsonify({"response": "You don't have permission"}), 400

# -------------------