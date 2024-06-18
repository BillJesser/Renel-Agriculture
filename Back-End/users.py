import pymongo as pym
import bcrypt

client = pym.MongoClient("mongodb://localhost:27017")

db = client["cashcrop"]
users = db["users"]

def hash_function(password):
    s = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), s)
    return hashed_password

def register_user(username, memberID, password):

    if users.find_one({"memberID": memberID}):
        return False

    # Hash the password before storing it
    hashed_password = hash_function(password)

    # Insert the new user into the users collection with hashed password
    user_data = {
        "username": username,
        "memberID": memberID,
        "password": hashed_password,
        "user_type": "Client"
    }
    users.insert_one(user_data)
    return True

def register_admin(username, adminID, password):
    
    if users.find_one({"memberID": adminID}):
        return False

    # Hash the password before storing it
    hashed_password = hash_function(password)

    # Insert the new user into the users collection with hashed password
    user_data = {
        "username": username,
        "memberID": adminID,
        "password": hashed_password,
        "user_type": "Admin"
    }
    users.insert_one(user_data)
    return True

def login(password, memberId):
    # Search database for user
    user = users.find_one({"memberID": memberId})
    # Check if username and password match
    if user:
        hashpass = user["password"]
        return bcrypt.checkpw(password.encode("utf-8"), hashpass)
    else:
        return False
    
def delete(memberId):

    user = users.find_one({"memberID": memberId})
    print(user)

    if user:
        users.delete_one({"memberID": memberId})
        return True

    return False 

