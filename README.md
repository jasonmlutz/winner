# WINNER: Create surveys, pick a winner

The main goal of this application is to allow users to create and respond to surveys. The stack consists of [Ruby on Rails](https://rubyonrails.org/) and [React](https://reactjs.org/) and it is deployed to [Heroku](https://www.heroku.com/).

## TABLE OF CONTENTS

- [Demo](#Demo)
- [Features](#Features)
- [Tech](#Tech)
- [User Interface](#User-Interface)

## DEMO

https://jml-winner.herokuapp.com/

## FEATURES

#### Registration and Session Handling. 
A visitor to the site may view the listing of registered users, each user's profile, and the listing of published surveys without needing to register. To access other resources, such as responding to a survey or creating a new survey, registration is required. Creation and storage of hashed passwords, user authentication, and session management is handled by Rails. Access to certain resources is limited even to logged in users. For example, the current user's profile page shows unpublished surveys; such data about other users is neither rendered nor exposed by Rails.

#### Survey Creation and Management. 
A registered user can create a survey and add questions and response options. The text of each item can be edited, and the order of the questions and response options can be adjusted. All or part of a survey can be deleted. The app saves the survey automatically with each edit, and only the author of the survey can make these changes. If a survey has a title, at least one question, and each question has at least two response options, the survey is eligible to be published, at which point it is accessable by all users.

#### Response Creation.
A registered user may submit a response to any published survey. The app prevents submitting a response until each question in the survey has been answered. All responses are accessible to all registered users. Each survey links to a listing of all responses to the survey, and each users public profile links to each of the users responses.

## TECH

Technologies used: Ruby on Rails, Reactjs, Postgres, HTML, Tailwind CSS.

### SOURCES

The Rails backend for this project was adapted from [Votey](https://github.com/jasonmlutz/votey); the React frontend was adapted from [Survey](https://github.com/jasonmlutz/survey). Portions of the styling were adapted from [Tail-kit](https://www.tailwind-kit.com/).

### API ENDPOINTS

#### Survey Creation and Management

##### Surveys

- `GET /api/surveys` - Get all surveys
- `POST /api/surveys` - Create a new survey
- `GET /api/surveys/:id` - Get a specified survey
- `PUT /api/surveys/:id` - Edit the title of an existing survey; publish the survey.
- `DELETE /api/surveys/:id` - Delete an existing survey; Rails associations triggers deletion of associated Question and ResponseOption database entries
- `GET /api/users/:user_id/surveys` - Return all surveys authored by the specified user; unpublished surveys are only returned in the case that the specified user is the current user of the app
- `GET /api/publish_status/:id` - Get information to determine whether a specified survey meets the criteria for publishing

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

#### Response Creation and Management

##### Responses

- `POST /api/responses` - Create a new response associated to a specified respondent and survey
- `GET /api/responses/:id` - Get a specified response
- `DELETE /api/responses/:id` - Delete a specified response

##### Answers

- `POST /api/responses/:response_id/answers` - Add a new answer to a specified response; this endpoint can accept multiple answers so that creating a response to a survey requires exactly one call to this endpoint
- `GET /api/responses/:response_id/answers` - Get all answers in a specified response

#### User and Session Management

##### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users;
- `GET /api/users/:id` - Get a specified user
- `DELETE /api/users` - Delete a specified user

##### Sessions

- `POST /api/session` - Create a new session and login a new or returning user
- `GET /api/session` - Fetch the user associated with the current session
- `DELETE /api/session` - Delete the session, setting current user to `null` and facilitating user logout

### USER INTERFACE
