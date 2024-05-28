import pymongo as pym
import bcrypt

client = pym.MongoClient("mongodb://localhost:27017/")

db = client["cashcrop"]
users = db["users"]

def hash_function(password):
    s = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), s)
    return hashed_password

def register_user(username, phone):

    if users.find_one({"username": username}):
        return False

    # Hash the password before storing it
    hashed_password = hash_function(phone)

    # Insert the new user into the users collection with hashed password
    user_data = {
        "username": username,
        "password": hashed_password,
        "user_type": "Client"
    }
    users.insert_one(user_data)
    return True

def login(username, password):
    # Search database for user
    user = users.find_one({"username": username})
    # Check if username and password match
    if user:
        hashpass = user["password"]
        return bcrypt.checkpw(password.encode("utf-8"), hashpass)
    else:
        return False
    
def delete_user(username, password):

    # Find username
    user = users.find_one({"username": username})

    if user:
        hashpass = user["password"]
        if bcrypt.checkpw(password.encode("utf-8"), hashpass):
            # Delete the user
            users.delete_one({"_id": user["_id"]})
            return True

    return False 

