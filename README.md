# TARI: Budget ahead, travel more

The main goal of this application is to help users to manage finances while traveling. Once created an account, they will be able to set budgets for future trips. They can also track their expenses by submitting and categorising transactions, while they check the status of their budgets. The web has been built with [MERN](https://www.mongodb.com/mern-stack) full stack and it has been deployed with [Heroku](https://www.heroku.com/).

#### DEMO:

https://black-codher-hawa.herokuapp.com/

![Creating a plan](https://github.com/hawa-bah/black-codher-my-personal-project/blob/main/client/src/assets/images-Readme/create-plan.gif)

see more in the [user interface](#User-Interface) section

### Features

1. Register and Login. The system validates the inputs. Some of the pages are only accessible for users who have registered and logged in.
2. Plan ahead of a trip and create a card to set budgets for a specific trip. Cards can be edited and deleted.
3. Submit transactions while traveling to track expenses specifying parameters such as category spent and date spent.
4. Check the status of budgets by viewing information such as amount spent, the amount left, and the number of transactions classified on a particular budget.
5. View a list of transactions. Filter and sort them too.

## TECH

MongoDB, HTML, CSS, Reactjs, JavaScript, Nodejs, Redux

### Project Structure

This is the structure of the repository:

- client/src

  - assets : images used in the project
  - components: React components for the user interface
  - pages
  - Redux : related to state management
  - services
  - stylesheets : css files

- server
  - index.js : point of entry
  - routes : includes the API end points definition
  - models : Mongoose database Schemas
  - auth : related to registration and login system

### API endpoints:

 <!-- NO NEED TO PUT ALL OF THEM ONLY THE MAIN ONES -->

#### TRANSACTIONS

- `GET /api/expenses/:tripName/:ref` - Get all the transactions of a trip for a specific user
- `DELETE /api/expenses/transactions/:id` - Delete a transaction
- `POST /api/expense` - Submit a transaction

#### BUDGETS

- `GET /api/budget/:ref` - Get all the infoCards of a user
- `GET /api/budget/category/:tripName/:ref` - Get all the information of a trip for a specific user
- `POST /api/budget` - Create a infoCard with budgets for a trip

#### USERS

- `POST /api/register` - Register a user. Check that email has not been registrated yet, and both passwords coincide.

#### GET

- `/api/expense/:ref`
- `/api/balance/:trip/:ref`

## Getting Started

As the application stores all the data in a mongoDB database, it will be important that you have created a mongo clustard to run the project locally. You can choose to create and an account in [here](https://account.mongodb.com/account/login?n=%2Fv2%2F5fc013e408c77a31a78ba7df&nextHash=%23clusters). You can get more information reading the [docs](https://docs.mongodb.com/).

Once cloned you can start the application and run it locally, both (front-end) and (back-end) with the following commands:

1.  Go to the root folder
    `cd black-codher-my-personal-project`

<!-- make user create an secreat_KEy in env -->

2. create your environment variables. You will need

```
export SECRET_KEY=<YOUR_SECRET_KEY>
export MONGO_URI=<YOUR_MONGODB_URI_TO_CONNECT_YOUR_APPLICATION>
```

<!-- mongo db uri -->

3. Run the application.
   ```
   npm run start
   ```
   Your application will be running in `localhost:3000`

## User Interface

##### Creating a plan

![Creating a plan](https://github.com/hawa-bah/black-codher-my-personal-project/blob/main/client/src/assets/images-Readme/create-plan.gif)

##### Submiting transactions

![Submiting transactions](https://github.com/hawa-bah/black-codher-my-personal-project/blob/main/client/src/assets/images-Readme/using-transactions.gif)

##### Viewing your budgets

![Viewing your budgets](https://github.com/hawa-bah/black-codher-my-personal-project/blob/main/client/src/assets/images-Readme/view-budgets.gif)
