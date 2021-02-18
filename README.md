# TARI: Budget ahead, travel more

The main goal of this application is to help users to manage finances while traveling. Once created an account, they will be able to set budgets for future trips. They can also track their expenses by submitting and categorising transactions, while they check the status of their budgets. The web has been built with MERN full stack and it has been deployed with Heroku.

#### DEMO:

https://black-codher-hawa.herokuapp.com/

#### GIFS using the web application

##### Creating a plan

![Creating a plan](https://github.com/hawa-bah/black-codher-my-personal-project/blob/main/client/src/assets/images-Readme/create-plan.gif)

##### Submiting transactions

![Submiting transactions](https://github.com/hawa-bah/black-codher-my-personal-project/blob/main/client/src/assets/images-Readme/using-transactions.gif)

##### Viewing your budgets

![Viewing your budgets](https://github.com/hawa-bah/black-codher-my-personal-project/blob/main/client/src/assets/images-Readme/view-budgets.gif)

### Features

1. Register and Login. The system validaties the inputs. Some of the pages are only accessible for users who have registred and logged in.
2. Plan ahead a trip and create a card to set budgets for a specific trip. Cards can be edited and deleted.
3. Submit transactions while travelling to track expenses specifying parameters such as category spent on and date spent.
4. Check the status of budgets by viewing information such as amount spent, amount left and number of transactions classified on a particular budget.
5. View a list of transactions. Filter and sort them too.

## TECH

### The stack

MongoDB, HTML, CSS, Reactjs, JavaScript, Nodejs, Redux

### Project Structure

This is the structure of the repository:

- README.md
- client
- server

### API endpoints:

#### GET

- `/api/expense/:ref`
- `/api/balance/:trip/:ref`
- Get all the transactions of a trip for a specific user `/api/expenses/:tripName/:ref`
- Get all the infoCards of a user `/api/budget/:ref`
- Get all the information of a trip for a specific user `/api/budget/category/:tripName/:ref`

#### POST

- Submit a transaction `/api/expense`
- Create a infoCard with budgets for a trip `/api/budget`

#### DELETE

- Delete a transaction `/api/expenses/transactions/:id`

### Getting Started

#### Start The Development Server

As the application stores all the data in a mongoDB database, it will be important that you have created a mongo clustard to run the project locally.

Once cloned you can start the application and run it locally, both (front-end) and (back-end) with the following commands:

1. `cd black-codher-my-personal-project`
2. `npm run start`
