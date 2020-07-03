import flask
import pyrebase
import os
from flask import session
from flask import request
from sql_helpers import *
from collections import Counter
from flask import jsonify, redirect, url_for
from flask_cors import CORS, cross_origin
import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import re
import json
import pypyodbc

numbers = ['acceptance_rate', 'national_ranking', 'population', 'tuition_normal', "tuition_oos", 'app_fee',
           'ed_date', 'early_action', 'early_decision', 'regular_decision', 'scholarship_date','letter_of_rec_required','letter_of_rec_total']

dates = ['early_decision', 'early_action', 'regular_decision', 'scholarship_date']

#all headers in the database
headers = ["college_name","alias","abbreviation","transcripts","mid_year","letter_of_rec_required","letter_of_rec_total",
            "people_for_letters","sat","sat_essay","act_essay","self_report","subject_tests","essays","supplemental_essays","acceptance_rate",
            "population","national_ranking","tuition_normal","tuition_oos","early_decision","early_action","regular_decision","scholarship_date",
            "interview","app_fee","app_site","common_app","coalition_app","college_logo","school_type","state","college_description","college_campus"]

#headers required for JSON output for dashboard page
headers_dashboard = ["college_name", "tuition_normal","tuition_oos","early_decision","regular_decision","state"] 

#headers required for JSON output for explore page
headers_explore = ["college_name","alias","letter_of_rec_required",
            "acceptance_rate",
            "population","national_ranking","tuition_normal","tuition_oos",
            "app_fee","app_site","common_app","coalition_app","college_logo","school_type","state"]

#headers required for essays page
headers_essay = ["college_name","supplemental_essays","app_site","common_app","coalition_app"]

#headers required for individual page
headers_individual = ["college_name","transcripts","mid_year","letter_of_rec_required",
            "sat","self_report","subject_tests","supplemental_essays","acceptance_rate",
            "population","national_ranking","tuition_normal","tuition_oos","early_decision","early_action","regular_decision","scholarship_date",
            "app_fee","app_site","college_logo","school_type","state","college_description","college_campus"]

#headers required for search bar
headers_searchbar = ["college_name","alias","abbreviation","college_logo"]

app = flask.Flask(__name__, static_folder='./build', template_folder = "./build", static_url_path='/')
CORS(app)


app.secret_key = os.urandom(24)  # do we need this? read it somewhere, could possibly be helpful

server = os.environ.get("SERVER_ADDRESS")
database = os.environ.get("DATABASE_NAME")
username = os.environ.get("DB_USERNAME")
password = os.environ.get("DB_PASSWD")
driver = '{ODBC Driver 17 for SQL Server}'
con = 'No'

#print(server)
db_info = 'DRIVER=' + driver + ';SERVER=' + server + ';PORT=1433;DATABASE=' + database + ';UID=' + username + ';PWD=' + password + ';MARS_Connection=' + con
#print(db_info)


if __name__ == '__main__':
    app.run(debug=False)

# method to query the SQL database with standard SQL syntax
# returns a list
# colleges is the table where accurate information is stored
def get_query(query):
    cnxn = pypyodbc.connect(db_info)
    cursor = cnxn.cursor()

    cursor.execute(query)
    myresult = cursor.fetchall()

    cursor.close()
    cnxn.close()

    return myresult


def query_screen(query_lst):
    for i in query_lst:
        print(i)
        if "St John''s University-New York" in i:
            continue
        elif re.match("^[A-Za-z0-9_+\-,. ]*$", i):
            continue
        else:
            return False
    return True

def get_colleges_for_dashboard(query_lst,headers_dashboard):
    if len(query_lst) is 0:
        return []

    if not query_screen(query_lst):
        return []

    cols = ','.join(headers_dashboard)
    query = "SELECT " + cols + " FROM " + os.environ.get("TABLE_NAME")    
    if len(query_lst) > 0:
        query += " WHERE college_name IN ("
        for i in range(0, len(query_lst), 2):
            if query_lst[i+1].find("'") is not -1:
                query_lst[i+1] = query_lst[i+1][:query_lst[i+1].find("\'")]  + "\'" + query_lst[i+1][query_lst[i+1].find("\'"):]
            if query_lst[i] == "college_name":
                query += "\'" + query_lst[i + 1] + "\'"
                if i+3 >= len(query_lst):
                    query += ")"
                else:
                    query += ","
            else:
                return "Incorrect Usage -- Not all parameters are college names"
    elif len(query_lst) <= 0:
            return "Incorrect Usage"

    query += ";"
    print(query)
    results = get_query(query)
    toBeSorted = []

    # convert to college object
    for element in results:
        c = College(element)
        toBeSorted.append(c)

    mergeSort_alphabetical(toBeSorted,headers_dashboard)
    json = []

    for college in toBeSorted:
        json.append(college.get_json(headers_dashboard))

    return json


def get_colleges_for_explore(query_lst,headers_explore):
    cols = ','.join(headers_explore)
    query = "SELECT " + cols + " FROM " + os.environ.get("TABLE_NAME")
    first_state = True
    tuition_absolute = False
    tuition_count = Counter(query_lst)
    last_tuition = False
    first_tuition = True
    if tuition_count["tuition_oos"] + tuition_count["tuition_normal"] is 4:
        tuition_absolute = True
    if len(query_lst) > 0:
        query += " WHERE"
        for i in range(0, len(query_lst), 2): 
            if query_lst[i+1].find("'") is not -1:
                query_lst[i+1] = query_lst[i+1][:query_lst[i+1].find("\'")]  + "\'" + query_lst[i+1][query_lst[i+1].find("\'"):]    
            if query_lst[i] in dates:
                epoch = get_epoch(query_lst[i + 1][1:])
                query_lst[i + 1] = query_lst[i + 1][0] + str(epoch)
            if query_lst[i] in numbers:
                if tuition_absolute and not last_tuition and "tuition" in query_lst[i]:
                    query += "("
                    if i-2 >= 0 and "tuition" not in query_lst[i-2]:
                        query += "("
                elif "tuition" in query_lst[i]:
                    last_tuition = True
                if query_lst[i + 1][0] == "+":
                    query += " " + str(query_lst[i]) + " >= " + str(query_lst[i + 1][1:])
                else:
                    query += " " + str(query_lst[i]) + " <= " + str(query_lst[i + 1][1:])
                if tuition_absolute and last_tuition and "tuition" in query_lst[i]:
                    query += ")"
                    if "tuition" in query_lst[i] and (i+2 > len(query_lst)-1 or "tuition" not in query_lst[i+2]):
                        query += ")"
                    if i+2 < len(query_lst) and "tuition" in query_lst[i+2]:
                        last_tuition = False
                elif "tuition" in query_lst[i]:
                    last_tuition = True
            else:
                if query_lst[i] == "state":
                    if first_state == True:
                        query += " (" 
                        first_state = False
                    query += str(query_lst[i]) + "=\'" + str(query_lst[i+1]) + "\'" 
                    if i < len(query_lst)-2 and query_lst[i+2] == "state":
                        query += " OR "
                        i += 2
                        continue
                    else:
                        query += ")"
                else:
                    query += " " + str(query_lst[i]) + "=\'" + str(query_lst[i+1]) + "\'"
            if i+2 < len(query_lst) and "tuition" in query_lst[i] and "tuition" in query_lst[i+2] and tuition_absolute and not last_tuition:
                query += " OR "
                continue

            if i != len(query_lst) - 2:
                    query += " AND"



    query += ";"
    print(query)
    if query_screen(query_lst):
        results = get_query(query)
    else:
        results = []
    toBeSorted = []

    # convert to college object
    for element in results:
        c = College(element)
        toBeSorted.append(c)

    mergeSort(toBeSorted,"national_ranking",headers_explore)
    json = []

    for college in toBeSorted:
        json.append(college.get_json(headers_explore))

    return json


def get_colleges_for_essays(query_lst,headers_essay):
    if len(query_lst) is 0:
        return []

    if not query_screen(query_lst):
        return []
 
    cols = ','.join(headers_essay)
    query = "SELECT " + cols + " FROM " + os.environ.get("TABLE_NAME")    

    if len(query_lst) > 0:
        query += " WHERE college_name IN ("
        for i in range(0, len(query_lst), 2):
            if query_lst[i+1].find("'") is not -1:
                query_lst[i+1] = query_lst[i+1][:query_lst[i+1].find("\'")]  + "\'" + query_lst[i+1][query_lst[i+1].find("\'"):]
            if query_lst[i] == "college_name":
                query += "\'" + query_lst[i + 1] + "\'"
                if i+3 >= len(query_lst):
                    query += ")"
                else:
                    query += ","
            else:
                return "Incorrect Usage -- Not all parameters are college names"
    elif len(query_lst) <= 0:
            return "Incorrect Usage"

    query += ";"
    print(query)
    results = get_query(query)
    toBeSorted = []

    # convert to college object
    for element in results:
        c = College(element)
        toBeSorted.append(c)

    mergeSort_alphabetical(toBeSorted,headers_essay)
    json = []

    for college in toBeSorted:
        json.append(college.get_json(headers_essay))

    return json

def get_colleges_for_individual(college_name,headers_individual):
    cols = ','.join(headers_individual)
    query = "SELECT " + cols + " FROM " + os.environ.get("TABLE_NAME") + " WHERE college_name = \'" + college_name + "\'"
    results = get_query(query)
    toBeSorted = []

    # convert to college object
    for element in results:
        c = College(element)
        toBeSorted.append(c)

    json = []

    for college in toBeSorted:
        json.append(college.get_json(headers_individual))

    return json

def get_colleges_for_searchbar(headers_searchbar):
    cols = ','.join(headers_searchbar)
    query = "SELECT " + cols + " FROM " + os.environ.get("TABLE_NAME")
    results = get_query(query)
    toBeSorted = []

    # convert to college object
    for element in results:
        c = College(element)
        toBeSorted.append(c)

    json = []

    for college in toBeSorted:
        json.append(college.get_json(headers_searchbar))

    return json




# TO QUERY, CALL get_colleges()
# pass in: list of strings, anything with numbers or dates indicate with +/- (always inclusive)
# date format needs to be DD.MM.YYYY
# returns list of JSON objects with college information
def get_colleges(query_lst):
    query = "SELECT * FROM " + os.environ.get("TABLE_NAME")
    first_state = True
    tuition_absolute = False
    tuition_count = Counter(query_lst)
    last_tuition = False
    first_tuition = True
    if tuition_count["tuition_oos"] + tuition_count["tuition_normal"] is 4:
        tuition_absolute = True
    if len(query_lst) > 0:
        query += " WHERE"
        for i in range(0, len(query_lst), 2): 
            if query_lst[i+1].find("'") is not -1:
                query_lst[i+1] = query_lst[i+1][:query_lst[i+1].find("\'")]  + "\'" + query_lst[i+1][query_lst[i+1].find("\'"):]    
            if query_lst[i] in dates:
                epoch = get_epoch(query_lst[i + 1][1:])
                query_lst[i + 1] = query_lst[i + 1][0] + str(epoch)
            if query_lst[i] in numbers:
                if tuition_absolute and not last_tuition and "tuition" in query_lst[i]:
                    query += "("
                    if i-2 >= 0 and "tuition" not in query_lst[i-2]:
                        query += "("
                elif "tuition" in query_lst[i]:
                    last_tuition = True
                if query_lst[i + 1][0] == "+":
                    query += " " + str(query_lst[i]) + " >= " + str(query_lst[i + 1][1:])
                else:
                    query += " " + str(query_lst[i]) + " <= " + str(query_lst[i + 1][1:])
                if tuition_absolute and last_tuition and "tuition" in query_lst[i]:
                    query += ")"
                    if "tuition" in query_lst[i] and (i+2 > len(query_lst)-1 or "tuition" not in query_lst[i+2]):
                        query += ")"
                    if i+2 < len(query_lst) and "tuition" in query_lst[i+2]:
                        last_tuition = False
                elif "tuition" in query_lst[i]:
                    last_tuition = True
            else:
                if query_lst[i] == "state":
                    if first_state == True:
                        query += " (" 
                        first_state = False
                    query += str(query_lst[i]) + "=\'" + str(query_lst[i+1]) + "\'" 
                    if i < len(query_lst)-2 and query_lst[i+2] == "state":
                        query += " OR "
                        i += 2
                        continue
                    else:
                        query += ")"
                else:
                    query += " " + str(query_lst[i]) + "=\'" + str(query_lst[i+1]) + "\'"
            if i+2 < len(query_lst) and "tuition" in query_lst[i] and "tuition" in query_lst[i+2] and tuition_absolute and not last_tuition:
                query += " OR "
                continue

            if i != len(query_lst) - 2:
                    query += " AND"



    query += ";"
    print(query)
    if query_screen(query_lst):
        results = get_query(query)
    else:
        results = []
    toBeSorted = []

    # convert to college object
    for element in results:
        c = College(element)
        toBeSorted.append(c)

    mergeSort(toBeSorted)
    json = []

    for college in toBeSorted:
        json.append(college.get_json())

    return json


# json_lst is a list of JSON objects with headers
# param is desired parameter to sort by
# is_descending is true if descending order required
# will return sorted list of json colleges
def get_order(json_lst, param, is_descending, columns=headers):
    json_out = []
    colleges = []

    for element in json_lst:
        element = json.loads(element)
        element = [v for v in dict.values(element)]
        c = College(element)
        colleges.append(c)

    mergeSort(colleges, param, columns)

    for college in colleges:
        json_out.append(college.get_json(columns))

    if is_descending:
        json_out.reverse()

    return json_out



# helper function for ordering of get_college_names()
def get_ranking_order(college_lst):
# -1 will screw up the sorting algorithm so just return a ridiculously high number
    if int(college_lst[3]) == -1:
        return 1000
    return int(college_lst[3])




# function for kai to get names of all colleges
# returns a list of lists with name, abbreviation, alias of each college
# puts highest ranked colleges at the top of the list
def get_college_names():
    query_str = "SELECT college_name, alias, abbreviation, national_ranking FROM " + os.environ.get("TABLE_NAME") + ";"
    res = get_query(query_str)

    res.sort(key=get_ranking_order)

    ret_list = []

    for i in res:
        curr_lst = []
        curr_lst.append(i[0])
        curr_lst.append(i[1])
        curr_lst.append(i[2])
        # this will add national ranking to the names list for debugging purposes
        # curr_lst.append(i[3])
        ret_list.append(curr_lst)

    return ret_list


#QUERY TESTING
#lst = get_colleges(["national_ranking","+1","national_ranking","-20","tuition_oos","+10000","tuition_oos","-15000","tuition_normal","+10000","tuition_normal","-15000"])


#TUITION TESTING
# lst = get_colleges(["tuition_oos", "+10000","tuition_oos","-20000"])
# for i in lst:
#     print(i)

# GET NAMES TESTING
# names = get_college_names()
# print(names)

#Routes testing for connectivity

@app.route("/test", methods = ['GET'])
def test_func():
    names = get_college_names()
    return jsonify(names)


@app.route("/")
@app.route("/profile")
@app.route("/loginhome/explore")
@app.route("/loginhome/login")
@app.route("/loginhome/signup")
@app.route("/loginhome/dashboard")
@app.route("/profile")
@app.route("/loginhome/essays")
def my_index():
    return app.send_static_file("index.html")

@app.route('/loginhome/page/<collegeName>')
def my_indexes(collegeName):
    return app.send_static_file("index.html")

@app.route("/filter", methods = ['POST'])
def test_filter():
    #Get the incoming request
    post_request = request.get_json(force=True)
    print(post_request)

    #Assign value from the request
    array = post_request['Array']
    filter_by = post_request['Filter']
    is_descending = post_request['IsDescending']

    colleges_array = get_colleges_for_explore(array, headers_explore)
    # print(colleges_array)

    return jsonify(get_order(colleges_array, filter_by, is_descending, headers_explore))

@app.route("/searchbar",methods=['POST'])
def searchbar():
    post_request = request.get_json(force=True)

    #Assign value from the request
    is_descending = post_request['IsDescending']

    colleges_array = get_colleges_for_searchbar(headers_searchbar)
    # print(colleges_array)

    return jsonify(get_order(colleges_array, "college_name", is_descending, headers_searchbar))


@app.route("/essays", methods = ['POST'])
def essays():
    try:
        db.child("users").get().val()
        #print(db.get().val())
        #listColleges()
        colleges = db.child("users").child(session['currentUser'][:-6]).get().val()
    except:
        post_request = request.get_json(force=True)

        # Assign value from the request
        colleges = post_request['currentUser']
    
    name_list = []
    for name in colleges.values():
        if name != "none":
            name_list.append(name)
    query_lst = []
    for i in name_list[:-1]:
        query_lst.append("college_name")
        query_lst.append(i)
    #print(query_lst)
    json_return = get_colleges_for_essays(query_lst,headers_essay)
    print(json_return)
    return json.dumps(json_return)


@app.route("/individual", methods = ['POST'])
def individual():
    #gets incoming request
    post_request = request.get_json(force=True)

    name = post_request['name']

    #formats incoming request to proper format for calling function
    college_json = get_colleges_for_individual(name,headers_individual)
    return jsonify(college_json)



#FIREBASE BEGINS HERE



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
#session = {}


# parameters are Strings for email and password
# return boolean - true if successful creation, false if not

@app.route("/signup", methods = ['POST'])
def createUserWithEmailPassword():
    #gets incoming request
    post_request = request.get_json(force=True)

    email = post_request['Username']
    email = filterEmail(email)
    password = post_request['Password']
    try:
        auth.create_user_with_email_and_password(email, password)
        session['initialUser'] = email
        db.child("users").child(session['initialUser'][:-6]).update({"college": "none"})
        db.child("users").child(session['initialUser'][:-6]).update({"username": email})
    except:
        return json.dumps({"True": 1})
    loginAfterCreation(email, password)
    return json.dumps({"True": 2})

    # this should redirect to the homepage...

def createUserWithEmailPasswordTest(email, password):
    #gets incoming request
    #post_request = request.get_json(force=True)

    #email = post_request['Username']
    email = filterEmail(email)
    #password = post_request['Password']
    try:
        print("i made it here! 1")
        auth.create_user_with_email_and_password(email, password)
        print("i made it here! 2")
        session['initialUser'] = email
        print("i made it here! 3")
        db.child("users").child(session['initialUser'][:-6]).update({"college": "none"})
        print("i made it here! 4")
        db.child("users").child(session['initialUser'][:-6]).update({"username": email})
    except:
        return json.dumps({"True": 1})
    return loginAfterCreation(email, password)

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

def loginAfterCreation(email, password):
    #gets incoming request
    #post_request = request.get_json(force=True)
    email = filterEmail(email)
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        user = auth.refresh(user['refreshToken'])
        user_id = user['idToken']
        # session['usr'] = user_id
        session['usr'] = user_id
        session['currentUser'] = email
        print("Current User" + session['currentUser'])
        print("Current User Truncated" + session['currentUser'][:-6])
    except:
        return json.dumps({"True": 1})
    return json.dumps({"True": 2})


# db.child("users").push({"name": "raj"}) - this is a sample line
# FIXME: a pyrebase token expires after 1 hour, so we need to set a timer and refresh the token every hour
# or tell them that their token will run out
# FIXME: during logout, make sure that the user actually logs out and delete the session
# https://stackoverflow.com/questions/55261682/how-to-know-whether-user-is-logged-in-or-not-in-pyrebase-and-flask

# parameters are Strings for email and password
# return 1 if unsuccessful, 2 otherwise
# takes in an email and password from the request
@app.route("/login", methods = ['POST'])
def loginWithEmailPassword():
    post_request = request.get_json(force=True)

    # Assign value from the request
    email = post_request['Username']
    email = filterEmail(email)
    password = post_request['Password']

    #email = "aksportsmaniac@gmail.com"
    #password = "123456"
    #successfulLogin = False
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        user = auth.refresh(user['refreshToken'])
        user_id = user['idToken']
        # session['usr'] = user_id
        session['usr'] = user_id
        session['currentUser'] = email
        print("Current User" + session['currentUser'])
        print("Current User" + session['currentUser'][:-6])
    except:
        return json.dumps({"True": 1})
    return json.dumps({"True": 2})

def loginWithEmailPasswordTest(email, password):
    # post_request = request.get_json(force=True)

    # # Assign value from the request
    # email = post_request['Username']
    # password = post_request['Password']
    #email = "jim2@gmail.com"
    #password = "123456"
    # successfulLogin = False
    email = filterEmail(email)
    try:
        # print(session['usr']) #if this doesn't error out, that means the user is logged in already
        print(session['usr'])
    except KeyError:
        try:
            user = auth.sign_in_with_email_and_password(email, password)
            user = auth.refresh(user['refreshToken'])
            user_id = user['idToken']
            # session['usr'] = user_id
            session['usr'] = user_id
            session['currentUser'] = email
            print( "Current user: " + session['currentUser'])
            #print(session['currentUser'][:-6])
        except:
            return False
    
    return True

# deletes the current session - should take them to home page?
@app.route("/logout", methods = ['POST'])
def logout():
    # session.pop['usr']
    session.pop('usr', None)
    session.pop('currentUser', None)
    return json.dumps({"True": 2})


# returns boolean if user is logged in
def isLoggedIn():
    isLoggedIn = True
    try:
        #print(session['usr'])
        print(session['usr'])
    except:
        isLoggedIn = False
    return isLoggedIn

@app.route("/addcollege", methods = ['POST'])
def addCollege():
    print("add function call")
    post_request = request.get_json(force=True)

    # Assign value from the request
    collegeName = post_request['CollegeName']
    
    colleges = db.child("users").child(session['currentUser'][:-6]).get().val()
    colleges[collegeName] = collegeName
    db.child("users").child(session['currentUser'][:-6]).update(colleges)
    return dashboard()

def addCollegeTest(collegeName):
    print("add function call")
    #post_request = request.get_json(force=True)

    # Assign value from the request
    # collegeName = post_request['CollegeName']
    
    colleges = db.child("users").child(session['currentUser'][:-6]).get().val()
    colleges[collegeName] = collegeName
    db.child("users").child(session['currentUser'][:-6]).update(colleges)


@app.route("/removecollege", methods = ['POST'])
def removeCollege():
    print("remove function call")
    post_request = request.get_json(force=True)

    # Assign value from the request
    collegeName = post_request['CollegeName']
    
    colleges = db.child("users").child(session['currentUser'][:-6]).get().val()
    colleges[collegeName] = "none"
    db.child("users").child(session['currentUser'][:-6]).update(colleges)
    return dashboard()

@app.route("/removecolleges", methods = ['POST'])
def removeColleges():
    post_request = request.get_json(force=True)

    # Assign value from the request
    collegeNames = post_request['CollegeName']
    for collegeName in collegeNames:
        colleges = db.child("users").child(session['currentUser'][:-6]).get().val()
        colleges[collegeName] = "none"
        db.child("users").child(session['currentUser'][:-6]).update(colleges)
    return json.dumps({"True": 2})

def removeCollegeTest(collegeName):
    print("remove function call")
    #post_request = request.get_json(force=True)

    # Assign value from the request
    #collegeName = post_request['CollegeName']
    
    colleges = db.child("users").child(session['currentUser'][:-6]).get().val()
    colleges[collegeName] = "none"
    db.child("users").child(session['currentUser'][:-6]).update(colleges)

def listColleges():
    colleges = db.child("users").child(session['currentUser'][:-6]).get().val()
    print(colleges)
    name_list = []
    for name in colleges.values():
        if name != "none":
            name_list.append(name)
    print("name list is ", end="")
    print(name_list)
    # create ret list of jsons, initialize to empty
    json_lst = []
    for element in name_list:
        # get_colleges() returns a list of jsons, but we'll only get one result out of it
        # so take the first json in the list and add it to our return list
        curr_college = get_colleges(["college_name", element])
        # make sure we actually found that school
        if len(curr_college) != 0:  
            print("found " + element)
            json_lst.append(curr_college[0])
        else:
            print("didn't find " + element)
    print(json_lst)
    return json_lst

def getEmail():
    print(isLoggedIn())
    if (isLoggedIn()):
        info = db.child("users").child(session['currentUser'][:-6]).get().val()
        return info["username"]

@app.route("/passwordreset", methods = ['POST'])
def sendPasswordReset():
    successful = json.dumps({"True": 2})
    try:
        if (isLoggedIn()):
            email = getEmail()
            print("Email " + email)
            auth.send_password_reset_email(email)
    except:
        successful = json.dumps({"True": 1})
    return successful

@app.route("/reset", methods = ['POST'])
def resetPasswordLogin():
    successful = json.dumps({"True": 2})
    try:
        post_request = request.get_json(force=True)
        email = post_request["Email"]
        auth.send_password_reset_email(email)
    except:
        successful = json.dumps({"True": 1})
    return successful

#testing method

#if __name__ == '__main__':
#     print("im here")
#       createUserWithEmailPasswordTest("animal.wu@gmail.com", "1234567")
# #     createUserWithEmailPasswordTest("jim2@gmail.com", "123456")
#       loginWithEmailPasswordTest("animal.wu@gmail.com", "1234567")
#     print(session['currentUser'])
#     # db.child("users").child(short)
#     # print(db.child("users").child(session['currentUser'][:-6]).get().val())
#     # db.child("users").child(session['currentUser'][:-6]).update({"college": "ucsd"})
#     # colleges = db.child("users").child(session['currentUser'][:-6]).get().val()
#     # colleges['ucsb'] = 'ucsb'
#     # addCollege('USC')
#     # addCollege('University of Southern California')
#     addCollegeTest('University of California, San Diego')
#     #removeCollegeTest('college')
#     listColleges()
#     print("Here's my email!")
    #   sendPasswordReset()
    #   logout()

#     # print(colleges)
#     logout()
#     if ('usr' in session):
#         print("something went wrong here")
#     else:
#         print("good job!")
#     print(session['currentUser'])


@app.route("/dashboard", methods = ['POST'])
def dashboard():
    try:
        db.child("users").get().val()
        #print(db.get().val())
        #listColleges()
        colleges = db.child("users").child(session['currentUser'][:-6]).get().val()
    except:
        post_request = request.get_json(force=True)

        # Assign value from the request
        colleges = post_request['currentUser']
    
    #print(colleges)
    name_list = []
    for name in colleges.values():
        if name != "none":
            name_list.append(name)
    query_lst = []
    for i in name_list[:-1]:
        query_lst.append("college_name")
        query_lst.append(i)
    print(query_lst)
    json_return = get_colleges_for_dashboard(query_lst, headers_dashboard)
    print(json_return)
    return json.dumps(json_return)

#method to send email for contact page
#sends email to redpandas920@gmail.com from itself
@app.route('/email', methods = ['POST'])
def sendEmail():
    port = 465  # For SSL
    password = os.environ.get("PASSWD")
    
    post_request = request.get_json(force=True)
    
    context = ssl.create_default_context()
    smtp_server = "smtp.gmail.com"
    email = "redpandas920@gmail.com"  # Enter your address

    email_from = post_request['Email']
    subject_email = post_request['Name']
    message_email = post_request['Message']

    msg = MIMEMultipart()
    msg['From'] = email_from
    msg['To'] = email
    msg['Subject'] = subject_email
    body = message_email
    body = MIMEText(body)
    msg.attach(body)

    with smtplib.SMTP_SSL("smtp.gmail.com:465") as server:
        server.login(email, password)
        server.sendmail(email_from, email, msg.as_string())

    return json.dumps({"True": 2})


