import time
import json
from flask import Flask
import mysql.connector

app = Flask(__name__)

db_sql = mysql.connector.connect(
    host="sql3.freesqldatabase.com",
    user="sql3334027",
    passwd="3VGxcUIijX",
    database="sql3334027"
)

#TO QUERY, CALL get_colleges()
# pass in: list of strings, anything with numbers or dates indicate with +/- (always inclusive)
# date format needs to be DD.MM.YYYY
#returns list of JSON objects with college information


# GLOBAL LISTS
numbers = ['acceptance_rate', 'national_ranking', 'population', 'tuition', 'fee', 'ed_date', 'ea_date', 'rd_date',
               'scholarship_date']
dates = ['ed_date, ea_date', 'rd_date', 'scholarship_date']
headers = ["college_name", "recorder", "resume", "official_transcripts", "mid_year_report", "letters_of_rec",
           "letters_people",
           "sat/act", "sat_essay", "act_essay", "self_report_act", "subject_tests", "self_report_subject",
           "general_essay", "supplemental_essay", "acceptance_rate", "national_ranking", "population",
           "tuition", "ed_date", "ea_date", "rd_date", "scholarship_date", "interview", "fee", "application"
           ]


# method to query the SQL database with standard SQL syntax
# returns a list
# colleges is the table where accurate information is stored
def get_query(query):
    mycursor = db_sql.cursor()

    mycursor.execute(query)
    myresult = mycursor.fetchall()

    return myresult


# pass in: list of strings, anything with numbers or dates indicate with +/- (always inclusive)
# date format needs to be DD.MM.YYYY
def get_colleges(query_lst):
    query = "SELECT * FROM colleges_final"

    if len(query_lst) == 0:
        return query

    query += " WHERE"

    for i in range(0, len(query_lst), 2):
        if query_lst[i] in dates:
            epoch = get_epoch(query_lst[i + 1][1:])
            query_lst[i + 1] = query_lst[i + 1][0] + str(epoch)
        if query_lst[i] in numbers:
            if query_lst[i + 1][0] == "+":
                query += " " + query_lst[i] + " >= " + query_lst[i + 1][1:]
            else:
                query += " " + query_lst[i] + " <= " + query_lst[i + 1][1:]
        else:
            query += " " + query_lst[i] + "=" + query_lst[i + 1]

        if i != len(query_lst) - 2:
            query += " AND"

    print(query)
    results = get_query(query)
    toBeSorted = []

    # convert to json
    for element in results:
        toBeSorted.append(College(element))

    sortedArr = mergeSort(toBeSorted)

    json = []

    for college in sortedArr:
        json.append(college.get_json)

    return json


def sortBy(jsonArr, param):
    collegeArr = []
    for c in jsonArr:
        collegeArr.append(College(c))

    return mergeSort(collegeArr, param)


def get_epoch(date_time):
    date_time += ' 00:00:00'
    pattern = "%d.%m.%Y %H:%M:%S"
    epoch = int(time.mktime(time.strptime(date_time, pattern)))
    return epoch


def get_json(query_result):
    json_obj = {}
    for i in range(len(query_result)):
        json_obj[headers[i]] = query_result[i]
    return json.dumps(json_obj)

#QUERY TESTING
lst = get_colleges(["national_ranking", "+15", "national_ranking", "-30"])

for i in lst:
   print(i)

class College(object):
    def __init__(self, query_result):
        self.info = query_result

    def get_json(self):
        json_obj = {}
        for i in range(len(self.info)):
            json_obj[headers[i]] = self.info[i]
        return json.dumps(json_obj)

    def order(self, college_obj, param):
        index = headers.index(param)
        return self.info[index] > college_obj.info[index]


def mergeSort(arr, param="national_ranking"): 
    if len(arr) >1: 
        mid = len(arr)//2 #Finding the mid of the array 
        L = arr[:mid] # Dividing the array elements  
        R = arr[mid:] # into 2 halves 
  
        mergeSort(L) # Sorting the first half 
        mergeSort(R) # Sorting the second half 
  
        i = j = k = 0
          
        # Copy data to temp arrays L[] and R[] 
        while i < len(L) and j < len(R): 
            if L[i].order(R[j]): 
                arr[k] = L[i] 
                i+=1
            else: 
                arr[k] = R[j] 
                j+=1
            k+=1
          
        # Checking if any element was left 
        while i < len(L): 
            arr[k] = L[i] 
            i+=1
            k+=1
          
        while j < len(R): 
            arr[k] = R[j] 
            j+=1
            k+=1
  

    



@app.route('/time')
def get_current_time():
    return {'time': time.time()}
