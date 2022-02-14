# WINNER: Create surveys, pick a winner

The main goal of this application is to allow users to create and respond to surveys. The stack consists of [Ruby on Rails](https://rubyonrails.org/) and [React](https://reactjs.org/) and it is deployed to [Heroku](https://www.heroku.com/).

## TABLE OF CONTENTS

- [Demo](#Demo)
- [Tech](#Tech)
  - [Sources](#Sources)
  - [API endpoints](#API-endpoints)

## DEMO

https://jml-winner.herokuapp.com/

## FEATURES

1. Registration and User Management.

![Screen Shot 2022-02-11 at 9 03 59 AM](https://user-images.githubusercontent.com/6218859/153639970-6d04eea4-0278-4b94-83cc-356a0dfb009e.png)

## TECH

Technologies used: Ruby on Rails, Reactjs, Postgres, HTML, CSS.

### SOURCES

The Rails backend for this project was adapted from [Votey](https://github.com/jasonmlutz/votey); the React frontend was adapted from [Survey](https://github.com/jasonmlutz/survey).

### API ENDPOINTS

#### Survey Creation and Management

##### Surveys

- `GET /api/surveys` - Get all surveys
- `POST /api/surveys` - Create a new survey
- `GET /api/surveys/:id` - Get a specified survey
- `PUT /api/surveys/:id` - Edit the title of an existing survey
- `DELETE /api/surveys/:id` - Delete an existing survey; Rails associations triggers deletion of associated Question and ResponseOption database entries

##### Questions

- `POST /api/surveys/:survey_id/questions` - Create a new question on a specified survey
- `GET /api/surveys/:survey_id/questions` - Get all questions on a specified survey
- `PUT /api/questions/:id` - Edit the title and/or position of an existing question
- `DELETE /api/questions/:id` - Delete an existing question; Rails associations triggers deletion of associated ResponseOption database entries

##### ResponseOptions

- `POST /api/questions/:question_id/response_options` - Create a new response option to a specified question
- `GET /api/questions/:question_id/response_options` - Get all response options to a specified question
- `PUT /api/response_options/:id` - Edit the title and/or position of an existing response option
- `DELETE /api/response_options/:id` - Delete an existing response option

#### User and Session Management

##### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users;
- `GET /api/users/:id` - Get a specified user
- `DELETE /api/users` - Delete a specified user

##### Sessions

- `POST /api/session` - Create a new session when creating a new user or for a returning user.
- `GET /api/session` - Fetch the user associated with the current session.
- `DELETE /api/session` - Delete the session, resetting the relevant tokens and facilitating user logout.
