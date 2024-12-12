# Guide to Contributing to Seraphim

## Team Norms and Values

Team members will commit to the following norms and values of the team:

* We will guarantee to listen to and respect each other’s ideas and opinions, understanding that each team member has their own perspectives.
* We will follow the guidelines of scrum and agile software development.
* Every member should attend all meetings, such as daily standups unless there is an urgent emergency or issue on hand. 
* Every member will try their best to communicate thoroughly through discord channels/chats, video conferencing, email, and others. It is important for everyone to update each other on their progress and convey their current thoughts. 
* All members should respond to any messages directed to them within one day. 
* If you need help or are experiencing any issues, ask for help from team members. If the issue cannot be solved on our own, we will contact the professor or course assistant for help. 
* If there is any serious conflict among team members, they should notify everyone else and everyone should come together to resolve the issue by sharing their own ideas then trying to integrate a bit of everyone’s to be fair and reach a consensus.
* If any member is neglecting their obligations, we will first remind them of their responsibilities that need to be completed. If this issue surfaces again, the team will contact the professor and course assistant for further discipline. 

## Sprint Cadence

* A sprint will take approximately 1-4 weeks to complete. 
* Members will improve the product backlog, prepare the sprint backlog, and create new tasks for each sprint. 

## Daily Standups 

* Mon-Fri at 7:00 PM. They will last about 5-10 minutes.
* Members are expected to be present synchronously.
* Members will not cover for other members who do not participate.
* Members who do not make any progress on a task will be reported to the manager. 

## Coding Standards
* Each member will use Visual Studio Code as an editor to standardize all coding.
* Don’t code in a too simple or complex way. Start with minimum code that can later be added to.
* Only push working code into the main branch through small commits. Work on experimental code on branches. 
* Every team member's code must be peer-reviewed by at least one other member before being merged into the main branch.
* Provide descriptive commit messages.
* Write self-documenting code with descriptive naming of files, variables, and functions.
* Don’t leave dead/commented-out code behind. 

## Git Workflow

* We will follow the feature branch workflow where the working, complete code is found in the main branch and experiments for tasks will be performed in the branches.
* Branches will be merged when completed and reviewed. 
* Backlogs will be updated under the project in `GitHub`. 

## Rules of Contributing

* Each member will complete their respective tasks and duties assigned to them on the task board by the end of the sprint. 
* The main branch must not be used for any experimental designs, only containing working code. Branches will be used to experiment with code. 
* When merging into the main branch, new code must be reviewed and work correctly. 
* Ensure you have a good understanding of the code and documentation before you start contributing.

## Setting Up the Local Development Environment

1. Clone the repository from `GitHub` to the local desktop. 
2. Navigate to the project directory
3. Navigate into the front-end directory and install all tools, dependencies, and other necessary files (e.g. `git`) with `npm install`. 
    * Note:
        You will need to make a .env file in this directory and include this:
            ```
            REACT_APP_SERVER_HOSTNAME="http://localhost:8000"
            ```
3. Repeat previous step with back-end directory.
3. Run `npm start` in back-end and front-end directories to launch both front end and back end.

## Building and Testing the Project

### How to run the front-end of the project:
1. In terminal, locate the project directory. 

2. Move to the front-end directory of the project. 

3. Run `npm install` to install all the dependencies listed in `package.json`. 

4. In addition to the listed dependencies, run `npm install react-router-dom` and `npm install react-icons` separately to include code and elements needed in this project.

5. Make a .env file in the same directory and include this:
    ```
    REACT_APP_SERVER_HOSTNAME="http://localhost:8000"
    ```
6. Run `npm start` to run the app in development mode. It will launch [http://localhost:3000/](http://localhost:3000/), which will enable you to view the front-end in the browser.

7. Go to a new tab in terminal where you should be at the front-end directory. Run `npx tailwindcss -i ./src/index.css -o ./src/output.css --watch` to view real-time changes in tailwind (styling) whenever the file is saved. 

8. The front-end is all set to code and view by now. 

### How to run the back-end of the project:
1. Move to the back-end directory of the project. 

2. Run `npm install` to install the dependencies listed in the `package.json` configuration file. 

3. Make a .env file in the same directory and include the following: 
    ```
    REACT_APP_SERVER_HOSTNAME=http://localhost:8000/
    REACT_APP_FRONTEND_HOSTNAME=http://localhost:3000
    ```

4. Run `npm start` to start up the server. Once it completes, the server should be running on port 8000 by default where the URL is [http://localhost:8000/](http://localhost:8000). Since the command already calls `nodemon server`, there is no need to install `nodemon` to run it to view changes in the server whenever the code changes.

### How to test the back-end with unit testing: 
1. Move to the back-end directory of the project. 

2. Make sure to install the mocha, chai, supertest, and c8 dependencies with `npm install --save-dev mocha chai supertest c8`. 

3. Run `npm test` to run all of the tests and show their outcomes in the terminal. 