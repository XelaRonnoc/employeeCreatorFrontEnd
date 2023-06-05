# Employee Creator FrontEnd (REACT TS)

{add test badges here, all projects you build from here on out will have tests, therefore you should have github workflow badges at the top of your repositories: [Github Workflow Badges](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)}

## Demo & Snippets

To Do:

-   Include hosted link
-   Include images of app if CLI or Client App

---

## Requirements / Purpose

### MVP

-   Create a web application to create, list, modify and delete employees.
-   The application should consit of a Spring RESTful API(See repo linked at bottom) and A React Typescript frontend (this repo)
-   Use React Redux
-   Must be in TypeScript
-   Can utilise any opensource library
-   must have basic front end validation (e.g. required and max length)
-   Must be responsive
-   must be hosted using something such as Heroku, AWS, or Azure.

### Purpose of Project

The purpose of this project is to further develop my skills in REACT typescript utilising a wide array of React libraries including Redux, React Hook form, and tanstack query. Talking to a Spring and MySql backend in order to be able to create, see, and update employees in the employees database from the front end.

Additionally this allows for increased exposure to front end unit and E2E testing in REACT.

### stack

The stack utilised is a Spring and MySQL backend with a React Type Script front end.
This was chosen in order to be able to both improve my skills using Spring (and Java in general) as well as continue to further improve in my ability in React and Typescript front ends. Additionally It will improve skills in E2E testing both from frontend and backend and testing in Java which i have less experience in than I do testing in JavaScript.

---

## Build Steps

To Do:

-   how to build / run project
-   use proper code snippets if there are any commands to run

---

## Design Goals / Approach

To Do:

-   Design goals
-   why did you implement this the way you did?

---

## Features

To Do:

-   What features does the project have?
-   list them...

---

## Known issues

To Do:

-   Remaining bugs, things that have been left unfixed
-   Features that are buggy / flimsy

---

## Future Goals

-   What are the immediate features you'd add given more time

---

## Change logs

### 05/06/2023 - adding testing
- testing library setup
- begun creating front end tests

### 04/06/2023 - added redux store and yup form validation

 -  added Yup form vaidation for the add and update form
 -  added a redux store that allows the edit form to avoid having to talk to the DB and instead can just search the redux store by id
 -  added method for adding ongoing employees (Still has some validation issues although this does not effect functionality but isn't good UX)

### 03/06/2023 - Styling

-   added styling for the edit and add employee form

### 02/06/2023 - Bug Fixes on Edit Employee Form, Styling

-   Fixed a bug where upon editing an employee only the first letter of the contract type and time would be sent to backend
-   added styling to list, header, and card componenets using styled components

### 01/06/2023 - Improvements to edit/add employee form

-   implemented new data structure from API
-   created autofill functionallity for edit forms
-   allow the same form component to both do edit and create employees depending on url vairable

### 31/05/2023 - Front end Setup, created employee list, and add employee form.

-   Set up REACT front end installing and configuring required libraries.
-   Created a list feature that retrieves all employees from backend and displays a list
    of employee cards.
-   created a create employee form that can be used to create a new employee that is then added to the backend.

---

## What did you struggle with?

### 05/06/2023
-   Front end mocks for specific functions. I cannot for the life of me get this working with vitest currenty. An absolute nightmare. The test is still calling the actual api instead of the mock function.

---

## Licensing Details

To Do:

-   What type of license are you releasing this under?

---

## Further details, related projects, reimplementations

-   See API at https://github.com/XelaRonnoc/employeeCreatorBackend
