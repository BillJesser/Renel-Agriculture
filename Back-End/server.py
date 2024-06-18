from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from users import *
from transactions import *

app = Flask(__name__)
client = pym.MongoClient("mongodb://localhost:27017")

db = client["cashcrop"]
transactions = db["transactions"]

@app.route("/register", methods=["GET","POST"], endpoint="register_client")
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
        return jsonify({"error": "MemberID Must Be Unique From Other Users"}), 400
    

@app.route("/login", methods=["POST"], endpoint="login_user")
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


@app.route("/search_user", methods=["GET"], endpoint="search_user")
@cross_origin()
def search_user():
    query = request.args.get('query', '')
    if query:
        matching_users = users.find({"username": {"$regex": query, "$options": "i"}})
        user_list = [{"username": user["username"], "user_type": user["user_type"], "memberID": user["memberID"]} for user in matching_users]
        return jsonify(user_list)
    return jsonify([])

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


@app.route("/add_client", methods=["GET","POST"])
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
        return jsonify({"error": "MemberID Must Be Unique From Other Users"}), 400
    
@app.route("/add_admin", methods=["GET","POST"])
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
        return jsonify({"error": "AdminID Must Be Unique From Other Admins"}), 400



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
    
if __name__ == "__main__":
    cors = CORS(app)
    app.run(host='0.0.0.0')