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

# Sample data to be inserted
sample_data = {
    "memberId": "M123",
    "memberName": "John Doe",
    "transactionDate": "2024-06-18",
    "savingsContribution": 1000.00,
    "cumulativeSavings": 5000.00,
    "loanAmount": 2000.00,
    "loanDate": "2024-06-01",
    "repaymentDueDate": "2024-12-01",
    "loanRepayment": 500.00,
    "outstandingLoanBalance": 1500.00,
    "interestPaid": 50.00,
    "dividend": 10.00,
    "purposeOfLoan": "Business Expansion",
    "remarks": "First loan installment"
}

# Calling the insert_data function and printing the result
print(insert_data(sample_data))

# Verifying the inserted data
print("Verifying the inserted data:")
inserted_data = transactions.find_one({"member_id": "M123"})
print(inserted_data)
