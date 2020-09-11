# <h1 align="center">College Shark</h1>
#### <p align="center">www.college-shark.com
<p align="center">
<img src=/src/gifs/homepage_gif.gif>
</p>

## Table of Contents

* [Introduction](https://github.com/gmihir/college-shark#Introduction)
* [Features](https://github.com/gmihir/college-shark#Features)
* [How It Works](https://github.com/gmihir/college-shark#HowItWorks)
* [Build Instructions](https://github.com/gmihir/college-shark#BuildInstructions)
* [Contributors](https://github.com/gmihir/college-shark#Contributors)

:warning: Note: To see more extensive version control history, please visit https://github.com/ashwinxkumar01/apps-college.

<a name="Introduction"></a>
## Introduction

Explore, plan, and track your college application journey. College Shark is the most comprehensive college application tracker available and is 100% free for students to use.

Visit at www.college-shark.com

<a name="Features"></a>
## Features

### Explore
Take advantage of our highly customizable filters to evaluate characteristics such as acceptance rate, average SAT/ACT scores, tuition, etc. and find the perfect college **for you**. 

<p align="center">
  <img src=/src/gifs/main_gif.gif>
</p>

### Track
Add and track all colleges you’re applying to on the ‘My Colleges’ page, where you can choose categories like application progress, deadlines, and tuition to streamline your application process.

<p align="center">
  <img src=/src/gifs/dashboard_gif.gif>
</p>

### Analyze
Analyze any of the colleges in our database and receive highly detailed information about essay prompts, tuition, average scores, and more to make choosing colleges faster and easier.
<p align="center">
  <img src=/src/gifs/individual_gif.gif>
</p>

<a name="HowItWorks"></a>
## How It Works

College Shark is built on a Azure SQL, Firebase, Python Flask, and React stack. 

### Firebase noSQL Database

The Firebase Database is a hierarchical noSQL database hosted on Google’s servers, and for our project, the Pyrebase wrapper class (https://github.com/thisbejim/Pyrebase) was used to assist populating the database. 

The primary purpose of the Firebase Database is to store the live, dynamic user information passed to the Flask backend by the React frontend. User information and authentication is handled here and is securely encrypted, and it stores key categories such as a user’s colleges, essay status, profile information, and more. The API is used to send and receive information from the database, and most of the information is sent in JSON format.

### Azure SQL Database
The SQL The SQL database is used to hold all information about colleges, and is indexed to optimize read operations. Queries are formed in the individual APIs and are written to maximize performance. This relational database was populated with data acquired by combining existing datasets as well as some web scraping.
### API 
Below is a sample of the API’s main routes, which is hosted on a Flask server.
| Route        | Params         | Description  |
| ------------- |:-------------:| -----:|
| /filter      | param_range, is_descending | Queries for colleges matching given filters.  |
| /individual     | college_name      |   Retrieves all information for a certain college. |
| /essays| college_name      |    Retrieves essay information for a certain college. |
| /addcollege| college_name, user_email      |    Adds a user-selected college to the noSQL database. |
| /removecollege| college_name, user_email|    Removes a user-selected college from the noSQL database. |
| /userprofile| user_email      |    Retrieves the information of a user. |


### Frontend

The frontend was built in React, using various components. The project also used MaterialUI and Bootstrap 4.
<a name="BuildInstructions"></a>
## Build Instructions

Ensure Node.js and Python 3 are installed on your computer. Then, run the following commands in the terminal after cloning this repository:

```
npm install react-router-dom
npm install @material-ui/core
npm install @material-ui/icons
npm install react-bootstrap
npm install @fortawesome/react-fontawesome
npm install @material-ui/styles
npm install react-select
npm install google-maps-react
npm install chart.js
npm install react-chartjs-2
npm install primereact
npm install primeicons
```

Now that you have all of the dependencies installed, please run the following commands to run the project locally.

#### macOS
```
npm start
```
Open another terminal window and run the following commands:

```
python3 -m venv venv
source venv/bin/activate
pip install flask python-dotenv pyrebase pypyodbc flask_cors
source .bash-source
flask run
```

#### Windows
```
npm start
```

Open another terminal window and run the following commands:
```
python -m venv venv (or py -m venv venv)
.\venv\Scripts\activate
```
If using git bash, now run the following command: 

```
source ./venv/Scripts/activate
```

Continue and run these commands:
```
. .\bashsource.ps1
flask run
```
Congratulations! The app should now be running on ```https://localhost:3000```

<a name="Contributors"></a>
## Contributors

Amitesh Sharma : https://github.com/amiteshksharma

Andrew Kim : https://github.com/Andrew-Kim-47

Ashwin Kumar : https://github.com/ashwinxkumar01

Baha Keskin : https://github.com/keskinmbaha

Kai Wu : https://github.com/skaiwu

Mihir Gupta : https://github.com/gmihir

Nico Vanny : https://github.com/nvanny
