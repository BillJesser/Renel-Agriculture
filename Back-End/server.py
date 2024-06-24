from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from users import *  # Assuming this imports functions related to user management
from transactions import *  # Assuming this imports functions related to transactions
import pymongo as pym

app = Flask(__name__)
client = pym.MongoClient("mongodb://localhost:27017")

# MongoDB database and collection setup
db = client["cashcrop"]
transactions = db["transactions"]

# Route for registering a new client
@app.route("/register", methods=["POST"])
@cross_origin()
def register_client():
    data = request.json
    username = data.get("username")
    memberID = data.get("memberId")
    password = data.get("password")

    # Register user (assuming register_user handles hashing/salting)
    success = register_user(username, memberID, password)

    if success:
        return jsonify({"message": "User registered successfully"})
    else:
        return jsonify({"error": "MemberID must be unique from other users"}), 400

# Route for user login
@app.route("/login", methods=["POST"])
@cross_origin()
def login_user():
    data = request.json
    password = data.get("password")
    memberID = data.get("memberId")
    
    # Authenticate user
    authorize = login(password, memberID)

    if authorize:
        user = users.find_one({ "memberID": memberID})
        return jsonify(
            {
                "message": "Login successful.",
                "username": user["username"],
                "user_type": user["user_type"],
                "memberId": user["memberID"]
            }
        )
    return jsonify({"message": "Incorrect username, member ID, or password."}), 401

# Route for searching users by username (case-insensitive)
@app.route("/search_user", methods=["GET"])
@cross_origin()
def search_user():
    query = request.args.get('query', '')
    if query:
        matching_users = users.find({"username": {"$regex": query, "$options": "i"}})
        user_list = [{"username": user["username"], "user_type": user["user_type"], "memberID": user["memberID"]} for user in matching_users]
        return jsonify(user_list)
    return jsonify([])

# Route for fetching transactions for a specific user
@app.route('/user_transactions', methods=['GET'])
@cross_origin()
def user_transactions():
    member_id = request.args.get('member_id')
    if member_id:
        member_transactions = transactions.find_one({"member_id": member_id})
        if member_transactions:
            result = {
                'transaction_dates': member_transactions['Transactions']['Transaction dates'],
                'saving_contributions': member_transactions['Transactions']['Saving Contributions'],
                'cumulative_savings': member_transactions['Transactions']['Cumulative savings'],
                'loan_amount': member_transactions['Transactions']['Loan amount'],
                'loan_date': member_transactions['Transactions']['Loan date'],
                'repaymentDueDate' :member_transactions['Transactions']['Repayment Due Date'],
                'loanRepayment': member_transactions['Transactions']['Loan Repayment'],
                'outstandingLoanBalance': member_transactions["Transactions"]['Outstanding Loan Balance'],
                'interestPaid': member_transactions["Transactions"]['Interest Paid'],
                'dividend': member_transactions['Transactions']['Dividend'],
                'purposeOfLoan': member_transactions['Transactions']['Purpose of Loan'],
                'remarks': member_transactions['Transactions']['Remarks']
            }
            return jsonify(result)
    
    return jsonify({"error": "No transactions found for the given member ID"}), 404

# Route for adding a new client (registering a new user)
@app.route("/add_client", methods=["POST"])
@cross_origin()
def add_client():
    data = request.json
    username = data.get("username")
    memberID = data.get("memberID")
    password = data.get("password")

    # Register user (assuming register_user handles hashing/salting)
    success = register_user(username, memberID, password)

    if success:
        return jsonify({"success": "User registered successfully"})
    else:
        return jsonify({"error": "MemberID must be unique from other users"}), 400

# Route for adding a new admin
@app.route("/add_admin", methods=["POST"])
@cross_origin()
def add_admin():
    data = request.json
    username = data.get("username")
    adminID = data.get("adminID")
    password = data.get("password")

    success = register_admin(username, adminID, password)

    if success:
        return jsonify({"success": "Admin registered successfully"})
    else:
        return jsonify({"error": "AdminID must be unique from other admins"}), 400

# Route for inserting new data (assuming this is related to transaction data)
@app.route('/insert', methods=['POST'])
@cross_origin()
def handle_new_input():
    form_data = request.json
    result = insert_data(form_data)
    if result["status"] == "inserted":
        return jsonify({"status": "success", "inserted_id": str(result["inserted_id"])}), 201
    elif result["status"] == "updated":
        return jsonify({"status": "success", "message": f"Member ID {result['member_id']} updated successfully."}), 200
    else:
        return jsonify({"status": "error", "message": result["message"]}), 500

    
@app.route('/updateFinance', methods=['POST'])
@cross_origin()
def handle_update_finance():
    data = request.json
    member_id = data['memberId']
    transactions = data['transactions']
    result = update_transactions(member_id, transactions)
    if result["status"] == "updated":
        return jsonify({"status": "success", "message": f"Member ID {result['member_id']} updated successfully."}), 200
    else:
        return jsonify({"status": "error", "message": result["message"]}), 500
    
    

@app.route('/update_user', methods=['POST'])
@cross_origin()
def update_user():
    data = request.json
    memberID = data.get('memberID')
    new_username = data.get('username')
    new_password = data.get('password')

    existing_user = users.find_one({'memberID': memberID})

    if existing_user:
        try:
            if new_username:
                existing_user['username'] = new_username
                transaction_name = transactions.find_one({'member_id': memberID})
                if transaction_name:
                    transaction_name['member_name'] = new_username
                    transactions.update_one({'member_id': memberID}, {'$set': transaction_name})

            if new_password:
                hash_pass = hash_function(new_password)
                existing_user['password'] = hash_pass

            users.update_one({'memberID': memberID}, {'$set': existing_user})

            # Prepare response
            response_data = {'message': 'User information updated successfully'}
            if 'username' in existing_user:
                response_data['updatedUsername'] = existing_user['username']

            return jsonify(response_data), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'User not found'}), 404

# Route for deleting a user by memberID
@app.route('/delete_user/<memberID>', methods=['DELETE'])
@cross_origin()
def delete_user(memberID):
    try:
        result = delete(memberID)

        if not result:
            return jsonify({'error': 'User not found'}), 404

        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Main entry point of the application
if __name__ == "__main__":
    # Enable CORS for all routes
    cors = CORS(app)
    # Run the Flask app on host 0.0.0.0 (accessible from any network interface)
    app.run(host='0.0.0.0')
