This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the app locally

Ensure you are in the application-hub directory.

First, run the command: 

  npm install
  
Then, install all the following dependencies USING YARN: 

  1. yarn add react-router-dom
  2. yarn add @material-ui/core
  3. yarn add @material-ui/icons
  4. yarn add react-bootstrap
  5. yarn add @fortawesome/react-fontawesome
  6. yarn add @material-ui/styles
  7. yarn add react-select
  8. npm install react-bootstrap

Then, run the command in one terminal:

  yarn start
  
Once the build completes, follow these steps to run the backend (in another terminal):

  Make sure you are inside the root directory of the project as well (application-hub)

  1. If you are on mac, run the following commands: 
  
    python3 -m venv venv
    source venv/bin/activate
  
  If you are on windows, run these commands:
  
    python -m venv venv (or py -m venv venv)
    .\venv\Scripts\activate
    
  if on git bash (Windows issue), run this command:
  
    source ./venv/Scripts/activate
    
  2. In the (venv) in the powershell, now run this command:
  
    pip install flask python-dotenv pyrebase pypyodbc flask_cors (pyrebase4 if on windows)
    
  Then run the bash-source:
  
    source .bash-source 
    
            or
            
    . .\bashsource.ps1
    
  3. Run this last command: 
  
    flask run
    
  if that command does not work, run this command (Windows issue most likely):
  
    python -m flask run
    
  Now the server should load and localhost:3000 will work with the backend. If there is any error on the install
  To leave the venv in terminal, simply type 'deactivate' (without the quotes)
  
  IMPORTANT NOTES
  
  1. If the home page renders in a weird look, refresh the page and see if it fixes it
 
    

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
