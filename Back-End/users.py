import pymongo as pym
import bcrypt

# Establish MongoDB connection
client = pym.MongoClient("mongodb://localhost:27017")

# Selecting the database and collection
db = client["cashcrop"]
users = db["users"]

def hash_function(password):
    """
    Hashes the provided password using bcrypt.

    Args:
    - password (str): Plain text password to be hashed.

    Returns:
    - bytes: Hashed password.
    """
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password

def register_user(username, memberID, password):
    """
    Registers a new client user in the MongoDB 'users' collection.

    Args:
    - username (str): Username of the new user.
    - memberID (str): Unique member ID of the new user.
    - password (str): Plain text password of the new user.

    Returns:
    - bool: True if registration is successful, False if memberID already exists.
    """
    if users.find_one({"memberID": memberID}):
        return False

    # Hash the password before storing it
    hashed_password = hash_function(password)

    # Insert the new user into the users collection with hashed password
    user_data = {
        "username": username,
        "memberID": memberID,
        "password": hashed_password,
        "user_type": "Client"  # Assuming default user type is Client
    }
    users.insert_one(user_data)
    return True

def register_admin(username, adminID, password):
    """
    Registers a new admin user in the MongoDB 'users' collection.

    Args:
    - username (str): Username of the new admin.
    - adminID (str): Unique admin ID of the new admin.
    - password (str): Plain text password of the new admin.

    Returns:
    - bool: True if registration is successful, False if adminID already exists.
    """
    if users.find_one({"memberID": adminID}):
        return False

    # Hash the password before storing it
    hashed_password = hash_function(password)

    # Insert the new admin into the users collection with hashed password
    user_data = {
        "username": username,
        "memberID": adminID,
        "password": hashed_password,
        "user_type": "Admin"  # User type is Admin for administrators
    }
    users.insert_one(user_data)
    return True

def login(password, memberId):
    """
    Authenticates a user based on memberId and password.

    Args:
    - password (str): Plain text password entered by the user.
    - memberId (str): Member ID of the user trying to login.

    Returns:
    - bool: True if login is successful (password matches), False otherwise.
    """
    # Search database for user
    user = users.find_one({"memberID": memberId})

    # Check if user exists and password matches
    if user:
        hashed_password = user["password"]
        return bcrypt.checkpw(password.encode("utf-8"), hashed_password)
    else:
        return False

def delete(memberId):
    """
    Deletes a user from the 'users' collection based on memberId.

    Args:
    - memberId (str): Member ID of the user to be deleted.

    Returns:
    - bool: True if user is deleted successfully, False if user does not exist.
    """
    user = users.find_one({"memberID": memberId})

    if user:
        users.delete_one({"memberID": memberId})
        return True

    return False

# Example usage of functions:
# - Register a new client user: register_user("Alice", "A123", "password123")
# - Register a new admin user: register_admin("Admin1", "AdminID1", "adminPassword")
# - Login a user: login("password123", "A123")
# - Delete a user: delete("A123")
