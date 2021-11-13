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
    * Note the IP of the cluster, and update the IP address of the database connection in this repo under config/database.config.js. Additionaly replace your username and password with the values you entered in earlier. \
        ![IP Address](resources/ip.png)
        ```
        'mongodb://{username}:{password}@{ipadress}:27017/{dbname}'
        ```
    * [MongoDb Connection String Format Docs](https://docs.mongodb.com/manual/reference/connection-string/): This link shows how to format special character in your connection string password
4. Deploying the ExpressJS API
    * Head to the Topology tab under the Developer view
    * Right click anywhere and select add to project from catalog
    * Search nodeJS and hit the first tile and hit create application
    * Provide the Github repo link of your forked repo, this repo should contain the updated IP of your mongodb database\
    ![Node Config](resources/nodeconfig.png)
    * Hit Create, click on the newly created pod, and wait for the build to finish
    * Visit the endpoint, by clicking the link on the pod\
    ![Link](resources/arrow.png)
    * if you have followed all steps correctly you should see the following output in the browser
    ```
    {"welcome":"This is the Honors Carolina Resume App backend ExpressJS API. From here you can CRUD resumes stored in MongoDB."}
    ```
    * Congratulations the backend is now deployed!
