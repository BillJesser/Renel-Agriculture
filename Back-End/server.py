from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from users import *

app = Flask(__name__)

@app.route("/register", methods=["GET","POST"], endpoint="register_client")
@cross_origin()
def register_client():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Register user (assuming register_user handles hashing/salting)
    success = register_user(username, password)

    if success:
        return jsonify({"message": "User registered successfully"})
    else:
        return jsonify({"error": "Couldn't register user"})
    

@app.route("/login", methods =["GET", "POST"], endpoint="login_user")
@cross_origin()
def login_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    # Register user (assuming register_user handles hashing/salting)
    authorize = login(username, password)

    if authorize:
        user = users.find_one({"username": username})
        return jsonify(
            {
                "message": "Login successful.",
                "username": username,
                "user_type": user["user_type"],
            }
        )
    return jsonify({"message": "Incorrect username or password."})


@app.route("/search_user", methods=["GET"], endpoint="search_user")
@cross_origin()
def search_user():
    query = request.args.get('query', '')
    if query:
        matching_users = users.find({"username": {"$regex": query, "$options": "i"}})
        user_list = [{"username": user["username"], "user_type": user["user_type"]} for user in matching_users]
        return jsonify(user_list)
    return jsonify([])



if __name__ == "__main__":
    cors = CORS(app)
    app.run(host='0.0.0.0')