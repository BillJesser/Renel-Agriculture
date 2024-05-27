from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

#create app session
app = Flask(__name__)

@app.route("/", methods=["POST"])
@cross_origin
def home():
    return




#start app
if __name__ == "__main__":
    cors = CORS(app)
    app.run()
 