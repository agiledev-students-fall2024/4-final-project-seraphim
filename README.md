# Seraphim

## Description

This semester, I would like to build Seraphim, a web application designed to empower users by enabling them to express their creativity and showcase their interests, including music tastes, art, TV shows, movies, animations, styles, subcultures, and personal experiences.

Seraphim seeks to address the need for a supportive and secure online space where individuals, especially women and minority groups, can connect with others and customize their profiles to reflect their unique identities. The application solves the problem of online harassment and objectification by providing a platform where users can freely share their thoughts and experiences without fear of being belittled or targeted.

In a digital age where online interactions can be filled with negativity, harassment, and offensiveness, Seraphim aims to create a positive community where everyone can confidently and authentically express themselves. By focusing on security, support, and users, Seraphim ensures that everyone will have a space where they feel valued and respected.

The target audience for Seraphim is creative people who want to showcase their uncensored selves online without having to deal with objectification, harassment, negativity, or trolls. This includes women, men, and others of appropriate ages, creative individuals and hobbyists like artists, video creators, directors, fashion designers, singers, bakers, writers, etc., and community-seekers like those heavily involved in fandoms/fanbases.

## Product Vision Statement

Seraphim is a creative social platform designed to foster authentic self-expression and connection in a supportive, secure environment. We envision a digital space where users can confidently share their creativity and interests—be it music, fashion, art, or personal anecdotes—without fear of harassment, objectification, or negativity. Our MVP will enable thorough profile customization, robust safety features, creative showcasing through blogging, and genuine interaction through unique communities. Seraphim aims to cultivate a positive online community where each individual is valued and respected, empowering users to express their true selves freely.

## Usage

### How to set up the project:
1. Clone the [project repository](https://github.com/agiledev-students-fall2024/4-final-project-seraphim) from `GitHub` to your local desktop. You may use Visual Studio Code or your preferred code editor. 

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

**Note:** The `supertest` module is used for our back-end unit testing. 

## Team Members

* [Sahar Bueno-Abdala](https://github.com/saharbueno)

* [Claire Kim](https://github.com/radishsoups)

* [Yikai Ding](https://github.com/dyk2003)

* [Wilson Xu](https://github.com/wilsonxu101)

* [Jennifer Yu](https://github.com/jenniferyuuu)

## Contributing

Information about contributing can be found [here](https://github.com/agiledev-students-fall2024/4-final-project-seraphim/blob/master/CONTRIBUTING.md).
