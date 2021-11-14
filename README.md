# Honors Carolina Resume Database
Rahul Narvekar, Habib Khadri, Saurav Bahali ,Charles Chow

## Project Purpose

The Honors Carolina Resume App simply searches resume templates based off key skill or subject tags. The resulting peer vetted resumes aid student in creating their own resumes. While resumes are a start, this app hopes to help in the creation of all recruiting documents.

## Getting Started
### Prerequisites
* Carolina Cloud Apps OpenShift Account
* Be on UNC's network, either via on Campus or via VPN
* [Openshift CLI](https://docs.openshift.com/container-platform/4.2/cli_reference/openshift_cli/getting-started-cli.html)
* [MongoDB Compass](https://www.mongodb.com/try/download/compass)
* [NodeJS](https://nodejs.org/en/download/), latest version is fine
* ReactJS, global installation

### Installing
1. Initialize both the front end and back end in separate git repositories and push them to your preferred source control repo, we used two separate github repos
2. Login to Carolina Cloud Apps, deploying the application will consist of two majors steps:
    * Initializing MongoDB
    * Deploying the ExpressJS API
    * Deploying the Front End React App
    * Enabling SSL for HTTPS
3. Initializing MongoDB
    * Head to the Topology Tab under the Developer View
    * Select Database from the tiles that appear
    * Select MongoDB from the tiles that appear and hit instantiate template on the modal that opens
    * Accept all default values in the form, for the purpose of this demonstration these values have been replaced with dummmy values. Please make sure you remember or note these values as you will need them later\
        ![Database Config](resources/dbConfig.png)
    * Hit create
    * Once the status of the pod shows up as active, head to the resource tab, and then hit view logs on the pod, followed by the terminal tab\
        ![View Logs](resources/viewLogs.png)
    * In the terminal type the following command
        ```
        mongo -u "username entered during setup" -p "password entered during setup" admin
        ```
    * If the connection is successful you should see this in the terminal
        ```
        MongoDB shell version v3.6.3
        connecting to: mongodb://127.0.0.1:27017/admin
        MongoDB server version: 3.6.3
        Welcome to the MongoDB shell.
        For interactive help, type "help".
        For more comprehensive documentation, see
                http://docs.mongodb.org/
        Questions? Try the support group
                http://groups.google.com/group/mongodb-user
        ```
    * Go back to the topology and click the mongodb pod, from there hit the mongodb service\
        ![Database Service](resources/service.png)
    * Note the IP of the cluster, and update the IP address of the database connection in this repo under config/database.config.js. Additionally replace your username and password with the values you entered in earlier. \
        ![IP Address](resources/ip.png)
        ```
        'mongodb://{username}:{password}@{ipaddress}:27017/{dbname}'
        ```
    * [MongoDb Connection String Format Docs](https://docs.mongodb.com/manual/reference/connection-string/): This link shows how to format special character in your connection string password
4. Deploying the ExpressJS API
    * Head to the Topology tab under the Developer view
    * Right click anywhere and select add to project from catalog
    * Search nodeJS and hit the first tile and hit create application
    * Provide the Github repo link of your back end repo, this repo should contain the updated IP of your mongodb database\
    ![Node Config](resources/nodeconfig.png)
    * Hit Create, click on the newly created pod, and wait for the build to finish
    * Visit the endpoint, by clicking the link on the pod\
    ![Link](resources/arrow.png)
    * if you have followed all steps correctly you should see the following output in the browser
    ```
    {"welcome":"This is the Honors Carolina Resume App backend ExpressJS API. From here you can CRUD resumes stored in MongoDB."}
    ```
    * Congratulations the backend is now deployed!
5. Deploying the Front End
    * Follow all of the same steps for Deploying the Express API, except provide the link for your front end repo instead!
6. Enable SSL
    * This step is required to enable HTTPS
    * Go to the administrator view and go to the Networking Tab
    * From there find the routes for both your front end and back end node applications
    * And add the following lines to YAML configuration under the spec section of both routes
    ```
    tls:
        termination: edge
        insecureEdgeTerminationPolicy: None
    ```

### Running Your Project Locally
1. To run the project locally the follwoing things must be done:
    * Send traffic to MongoDb Over localhost
    * run the react application over localhost
    * run the express app over localhost
2. Send traffic to MongoDb over localhost
    * Grab your OpenShift cli auth token and login to OpenShift via the CLI
    * Grab the name of the pod that is running the MongoDb Instance
    ```
    oc get pods
    ```
    This will return
    ```
    NAME                     READY     STATUS       RESTARTS   AGE
    mongodb-1-XXXXX          1/1       Running      0          12h
    my-node-app-10-build     0/1       Completed    0          10h
    ```
    * Grab the mongodb pod name from the output. From here you can portforward all traffic from Mongo on to a local port
    ```
    oc port-forward mongodb-1-XXXXX 34000:27017
    ```
    This command will take all traffic from port 27017 on the mongodb pod and route it on localhost:34000
3. Run the React App
    * cd into the front end directory
    * run this command to start the local sever
    ```
    npm run start
    ```
4. Run the React App
    * cd into the front end directory
    * change the mongodb connection string to as follows, in the backend database.config.js
    ```
    'mongodb://{username}:{password}@localhost:34000/{dbname}'
    ```
    * run this command to start the local sever
    ```
    node server.js
    ```

## Testing
This app uses Jest to test front end and Mocha for backend. Tests can be run with 'npm test'. Currently, there is no dedicated test environment, so tread with caution.
Add -- --coverage when testing front end for information on code coverage. Backend returns code coverage by default.
Tests will continue to be added as project expands.

## Deployment
* As it stands the production system lives on Carolina Cloud Apps, through student user accounts
    * Front End: Charles Chow's Carolina Cloud Apps Account
    * Back End: Rahul Narvekar's Carolina Cloud Apps Account
* We are currently working with Information Technology Services and with Honors Carolina to obtain a service account to deploy the application to
* From there we intend to setup a Continuous Integration system enabled on new commits
* As it stands we are manually triggering new builds on pods after we update our repositories on Github

## Technologies Used
* Front End: ReactJS
* Back End: ExpressJS + MongoDB
* Hosting: Carolina Cloud Apps' based on Redhat's OpenShift Container Platform

## Contributing

### System Accesses
* A new developer will need to request access to this repository
* Need access to Carolina Cloud Apps, UNC VPN, and to the OpenShift Service Account when that is created

### Coding Conventions
* All front and back end code is commented to ensure readability and all files are named according to the same convention
* The front end has variables for react state handles grouped together by where they are used in the code

[Our project website](https://honors-carolina-resume-app.web.app/)

## Authors
* Rahul Narvekar: Front End Lead
* Saurav Bahali: Back End Lead
* Charles Chow: DevOps Lead
* Habib Khadri: Project Manager
* Todd Ginsburg: Group Mentor

## License
Copyright <2021> <COPYRIGHT Honors Carolina>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Acknowledgements
Thank you to our mentor Todd Ginsburg, and our client contact Amanda Brumfield for supporting us throughout the initial development of the application.
