from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from users import register_user

app = Flask(__name__)

@app.route("/register", methods=["GET","POST"], endpoint="register_client")
@cross_origin()
def register_client():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Validate input (e.g., check password complexity)
    if not username or not password:
        return jsonify({"error": "Username and password are required"})

    # Register user (assuming register_user handles hashing/salting)
    success = register_user(username, password, "10/03/2003")

    if success:
        return jsonify({"message": "User registered successfully"})
    else:
        return jsonify({"error": "Couldn't register user"})

    

if __name__ == "__main__":
    cors = CORS(app)
    app.run(host='0.0.0.0')