import flask
import pyrebase
import os
from flask import session
from flask import request


config = {
"apiKey": os.environ.get("API_KEY"),
"authDomain": os.environ.get("AUTH_DOMAIN"),
"databaseURL": os.environ.get("DATABASE_URL"),
"projectId": os.environ.get("PROJECT_ID"),
"storageBucket": os.environ.get("STORAGE_BUCKET"),
"messagingSenderId": os.environ.get("MESSAGING_SENDER_ID"),
"appId": os.environ.get("APP_ID"),
"measurementId": os.environ.get("MEASUREMENT_ID")
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
auth = firebase.auth()

#returns string of email without dots before the '@' sign
def filterEmail(email):
    ret = ""
    atPosition = email.find("@")
    if (atPosition != -1):
        for x in range(atPosition):
            if (email[x] != "."):
                ret += email[x]
    ret += email[atPosition:]
    return ret

#returns true if email has an @ sign in it, for our firebase purposes
def isValidEmail(email):
    return email.find("@") != -1

#@app.route("/signup", methods = ['POST'])
def createUserWithEmailPassword(email, password, name, state):
    try:
        email = filterEmail(email)
        auth.create_user_with_email_and_password(email, password)
        print(email)
        indexOfAt = email.index("@")
        db.child("users2").child(email[:indexOfAt]).child("information").update({"tabs": ["State", "Ranking", "RD Deadline", "ED Deadline", "In-State Tuition", "Out-of-State Tution", "Status"]})
        db.child("users2").child(email[:indexOfAt]).child("information").update({"generalEssays": [0,0,0]})
        db.child("users2").child(email[:indexOfAt]).child("information").update({"email": email})
        db.child("users2").child(email[:indexOfAt]).child("information").update({"state": state})
        db.child("users2").child(email[:indexOfAt]).child("information").update({"name": name})
        #db.child("users2").child(email[:indexOfAt]).child("colleges").child("defaultCollege").update({"collegeName": "none"})
    except Exception as e:
        print(e)
        return False
    loginAfterCreation(email, password)
    return True

def loginAfterCreation(email, password):
    email = filterEmail(email)
    try:
        user = auth.sign_in_with_email_and_password(email, password)
    except:
        return False
    return True


#@app.route("/login", methods = ['POST'])
def loginWithEmailPassword():
    post_request = request.get_json(force=True)

    # Assign value from the request
    email = post_request['Username']
    email = filterEmail(email)
    password = post_request['Password']
    try:
        user = auth.sign_in_with_email_and_password(email, password)
    except:
        return False
    return True

#@app.route("/addcollege", methods = ['POST'])
def addCollege(email, collegeName):
    print("add function call")
    email = filterEmail(email)
    indexOfAt = email.index("@")
    db.child("users2").child(email[:indexOfAt]).child("colleges").child(collegeName).update({"collegeName": collegeName})
    db.child("users2").child(email[:indexOfAt]).child("colleges").child(collegeName).update({"appStatus": "incomplete"})
    db.child("users2").child(email[:indexOfAt]).child("colleges").child(collegeName).update({"essayStatus": [0,0,0,0,0]})
    #return dashboard()

#@app.route("/removecollege", methods = ['POST'])
def removeCollege(email, collegeName):
    print("remove function call")
    indexOfAt = email.index("@")
    db.child("users2").child(email[:indexOfAt]).child("colleges").child(collegeName).remove()
    #return dashboard()

#returns python list of all the college names
def getUserColleges(email):
    email = filterEmail(email)
    indexOfAt = email.index("@")
    collegeKeys = db.child("users2").child(email[:indexOfAt]).child("colleges").shallow().get().val()
    return list(collegeKeys)

def changeState(email, state):
    email = filterEmail(email)
    indexOfAt = email.index("@")
    db.child("users2").child(email[:indexOfAt]).child("information").update({"state": state})

def setCollegeEssayStatus(email, collegeName, essayArray):
    email = filterEmail(email)
    indexOfAt = email.index("@")
    db.child("users2").child(email[:indexOfAt]).child("colleges").child(collegeName).update({"essayStatus": essayArray})

def setGeneralEssayStatus(email, essayArray):
    email = filterEmail(email)
    indexOfAt = email.index("@")
    db.child("users2").child(email[:indexOfAt]).child("information").update({"generalEssays": essayArray})

def setTabs(email, tabArray):
    email = filterEmail(email)
    indexOfAt = email.index("@")
    db.child("users2").child(email[:indexOfAt]).child("information").update({"tabs": tabArray})

#returns ordered dictionary of all information about the user and his/her colleges, essays, nested format
def getAllUserData(email):
    email = filterEmail(email)
    indexOfAt = email.index("@")
    return db.child("users2").child(email[:indexOfAt]).get().val()

#returns ordered dictionary of all information about the user without college-specific info
def getUserInformation(email):
    email = filterEmail(email)
    indexOfAt = email.index("@")
    return db.child("users2").child(email[:indexOfAt]).child("information").get().val()

#returns ordered dictionary of all information about the user's colleges
def getUserCollegeInformation(email):
    email = filterEmail(email)
    indexOfAt = email.index("@")
    return db.child("users2").child(email[:indexOfAt]).child("colleges").get().val()

if __name__ == '__main__':
    #successfulCreation = createUserWithEmailPassword("testuser13@gmail.com", "123456", "Jim", "CA")
    loginAfterCreation("testuser13@gmail.com", "123456")
    #removeCollege("testuser11@gmail.com", "Harvard")
    # addCollege("testuser13@gmail.com", "UCSD")
    # addCollege("testuser13@gmail.com", "UCSB")
    # addCollege("testuser13@gmail.com", "UCLA")
    # setCollegeEssayStatus("testuser13@gmail.com","UCSD",[1,2,3,4])
    # setGeneralEssayStatus("testuser13@gmail.com", [1,2,3,4])
    print(getAllUserData("testuser13@gmail.com"))
    print(getUserColleges("testuser13@gmail.com"))
    print(getUserInformation("testuser13@gmail.com"))
    print(getUserCollegeInformation("testuser13@gmail.com"))
    #print(successfulCreation)
    #print("im here")
    # createUserWithEmailPasswordTest("animal.wu@gmail.com", "1234567")
    # createUserWithEmailPasswordTest("jim2@gmail.com", "123456")
    # loginWithEmailPasswordTest("animal.wu@gmail.com", "1234567")
    # print(session['currentUser'])
    # db.child("users").child(short)
    # print(db.child("users").child(session['currentUser'][:-6]).get().val())
    # db.child("users").child(session['currentUser'][:-6]).update({"college": "ucsd"})
    # colleges = db.child("users").child(session['currentUser'][:-6]).get().val()
    # colleges['ucsb'] = 'ucsb'
    # addCollege('USC')
    # addCollege('University of Southern California')
    # addCollegeTest('University of California, San Diego')
    # removeCollegeTest('college')
    # listColleges()
    # print("Here's my email!")
    #   sendPasswordReset()
    #   logout()

    # print(colleges)
    # logout()
    # if ('usr' in session):
    #     print("something went wrong here")
    # else:
    #     print("good job!")
    # print(session['currentUser'])
