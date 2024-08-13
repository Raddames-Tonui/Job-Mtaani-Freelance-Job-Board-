from flask import Flask, request
import requests
from requests.auth import HTTPBasicAuth
import base64
from datetime import datetime


app = Flask(__name__)
my_endpoint ='https://a4af-102-209-18-54.ngrok-free.app'

@app.route('/pay')
def MpesaExpress():
    amount = request.args.get('amount')
    phone = request.args.get('phone')
    
    endpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    access_token = getAccesstoken()
    headers = { "Authorization": "Bearer %s" % access_token }
    Timestamp = datetime.now()
    times = Timestamp.strftime("%Y%m%d%H%M%S")
    password = "174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"+times
    password = base64.b64encode(password.encode('utf-8'))
    
    data = {
        "BusinessShortCode": 174379,
        "Password": password,
        "Timestamp": times,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": 174379,
        "PhoneNumber": phone,
        "CallBackURL": my_endpoint + "/lnmo-callback",
        "AccountReference": "CompanyXLTD",
        "TransactionDesc": "Deposit of Funds"
    }
    
    res = requests.post(endpoint, json = data, headers = headers)
    return res.json()
# consume M-pesa Express callback
@app.route('/lnmo-callback', methods=["POST"])
def incoming():
    data = request.get_json()
    print(data)
    return "ok"

# get access token (authorization api)
def getAccesstoken():
    consumer_key = "5OvYNmDM0aQf7qGfqcTJcz6euvVv8QcCJK37Jg9S8mNiqfi3"
    consumer_secret = "rdZdcjTsjb5ipLrAN5EQcAQCYrNddOkIGS90A6sXOuFrce2v68u4hf8ZNaXsK5x8"
    endpoint = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    
    r = requests.get(endpoint, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    data = r.json()
    return data['access_token']
    
    
