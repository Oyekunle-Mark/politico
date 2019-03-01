[![Build Status](https://travis-ci.com/Oyekunle-Mark/politico.svg?branch=ch-api-integration-163505391)](https://travis-ci.com/Oyekunle-Mark/politico)
[![Coverage Status](https://coveralls.io/repos/github/Oyekunle-Mark/politico/badge.svg?branch=ch-improve-test-163646971)](https://coveralls.io/github/Oyekunle-Mark/politico?branch=ch-improve-test-163646971)
<a href="https://codeclimate.com/github/Oyekunle-Mark/politico/maintainability"><img src="https://api.codeclimate.com/v1/badges/67b6bb0468e626ffbcbf/maintainability" /></a>

# Politico
**The Andela Developer Challenge Project**.

Politico enables citizens give their mandate to politicians running for different government offices 
while building trust in the process through transparency. 

This project is a voting app with the following features:
* Users can sign up. 
* Users can login. 
* Admin (electoral body) can create political parties. 
* Admin (electoral body) can delete a political party. 
* Admin (electoral body) can create different ​ political offices​.
* Admin (electoral body) can register candidates to run for offices.
* Admin (electoral body) can edit political parties.
* Users can vote for only one politician per ​ political office​.  
* Users can see the results of election.
* Users can see who they have voted in the past


## Installation Guide
```
$ git clone https://github.com/oyekunle-mark/politico
$ cd politico
$ npm install
```

### Starting the development server
To start the development server use:
```
npm run start
```

### Tests
To run tests use:
```
npm run test
```

### Style guide
This project uses the airbnb style guide. Use,
```
npm run lint
```
to check conformance.


## Dependencies
This project makes use of a number a dependencies, they are:
* express
* pg
* bcrypt
* jsonwebtoken
* body-parser
* cloudinary
* multer
* multer-storage-cloudinary
* dotenv
* swagger-ui-express
* trim-request
* morgan
Find a full list of all dependencies and development dependencies in the package.json file.


## UI Templates
The UI templates of the Politico project are hosted on GitHub pages and are located here.
[Politico](https://oyekunle-mark.github.io/politico/)

## API Endpoints
The API are hosted on Heroku and could be found here [Politiko](http://politiko.herokuapp.com/api/v1/).
That is also the link to the API documentation


## Pivotal Tracker Board
The Pivotal Tracker Agile project management tool was used during project development. Here is the project dashboard.
[PT-Board](https://www.pivotaltracker.com/n/projects/2239436)


## Author
*Oyekunle Oloyede*
