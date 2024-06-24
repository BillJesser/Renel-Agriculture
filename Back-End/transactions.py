import pymongo as pym
from pymongo.errors import ConnectionFailure, OperationFailure

# Establishing the connection to MongoDB
try:
    client = pym.MongoClient("mongodb://localhost:27017/")
    client.admin.command('ping')  # Ping the server to check connection
    print("MongoDB connection successful.")
except ConnectionFailure:
    print("MongoDB connection failed.")
    exit(1)

# Selecting the database and collection
db = client["cashcrop"]
transactions = db["transactions"]

def insert_data(form_data):
    """
    Inserts or updates transaction data into the MongoDB collection based on memberID.

    Args:
    - form_data (dict): Contains transaction data fields.

    Returns:
    - dict: Status of the insertion or update operation.
    """
    member_id = form_data['memberId']
    existing_member = transactions.find_one({"member_id": member_id})

    if existing_member:
        # Member exists, update the existing document
        update_fields = {
            "Transactions.Transaction dates": form_data['transactionDate'],
            "Transactions.Saving Contributions": form_data['savingsContribution'],
            "Transactions.Cumulative savings": form_data['cumulativeSavings'],
            "Transactions.Loan amount": form_data['loanAmount'],
            "Transactions.Loan date": form_data['loanDate'],
            "Transactions.Repayment Due Date": form_data['repaymentDueDate'],
            "Transactions.Loan Repayment": form_data['loanRepayment'],
            "Transactions.Outstanding Loan Balance": form_data['outstandingLoanBalance'],
            "Transactions.Interest Paid": form_data['interestPaid'],
            "Transactions.Dividend": form_data['dividend'],
            "Transactions.Purpose of Loan": form_data['purposeOfLoan'],
            "Transactions.Remarks": form_data['remarks']
        }

        try:
            for key, value in update_fields.items():
                transactions.update_one({"member_id": member_id}, {"$push": {key: value}})
            return {"status": "updated", "member_id": member_id}
        except OperationFailure as e:
            print("Data update failed:", e)
            return {"status": "error", "message": str(e)}

    else:
        # Member does not exist, insert a new document
        transaction = {
            "member_id": form_data['memberId'],
            "member_name": form_data['memberName'],
            "Transactions": {
                "Transaction dates": [form_data['transactionDate']],
                "Saving Contributions": [form_data['savingsContribution']],
                "Cumulative savings": [form_data['cumulativeSavings']],
                "Loan amount": [form_data['loanAmount']],
                "Loan date": [form_data['loanDate']],
                "Repayment Due Date": [form_data['repaymentDueDate']],
                "Loan Repayment": [form_data['loanRepayment']],
                "Outstanding Loan Balance": [form_data['outstandingLoanBalance']],
                "Interest Paid": [form_data['interestPaid']],
                "Dividend": [form_data['dividend']],
                "Purpose of Loan": [form_data['purposeOfLoan']],
                "Remarks": [form_data['remarks']]
            }
        }
        try:
            result = transactions.insert_one(transaction)
            return {"status": "inserted", "inserted_id": result.inserted_id}
        except OperationFailure as e:
            print("Data insertion failed:", e)
            return {"status": "error", "message": str(e)}
        
def update_transactions(member_id, new_transactions):
    try:
        result = transactions.update_one(
            {"member_id": member_id},
            {"$set": {"Transactions": new_transactions}}
        )
        if result.matched_count > 0:
            return {"status": "updated", "member_id": member_id}
        else:
            return {"status": "error", "message": "Member not found"}
    except OperationFailure as e:
        print("Data update failed:", e)
        return {"status": "error", "message": str(e)}
    


