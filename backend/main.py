from dotenv import load_dotenv
import os
import pyrebase

load_dotenv()

FIREBASE_API = os.getenv('FIREBASE_API')

firebaseConfig = {
    'apiKey': FIREBASE_API,
    'authDomain': "defi-hero-7b739.firebaseapp.com",
    'databaseURL':
    "https://defi-hero-7b739-default-rtdb.europe-west1.firebasedatabase.app",
    'projectId': "defi-hero-7b739",
    'storageBucket': "defi-hero-7b739.appspot.com",
    'messagingSenderId': "429303155701",
    'appId': "1:429303155701:web:089c3f29b3cb52f0b62ebc",
    "serviceAccount": "./backend/service.json",
}

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
auth = firebase.auth()

anonymous_user = auth.sign_in_anonymous()

db.push({"test": "test"})
