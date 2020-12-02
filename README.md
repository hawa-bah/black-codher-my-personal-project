# Black Codher Personal Project

Here's a boilerplate project directory with the initial setup for your Personal Project.

The expectation with this project is that you're able to fork the repository, and get started.

- [Black Codher Personal Project](#black-codher-personal-project)
  - [Project Structure](#project-structure)
    - [client](#client)
    - [server](#server)
  - [Getting Started](#getting-started)
    - [Fork Project](#fork-project)
    - [Clone Repo](#clone-repo)
    - [Populate The Database](#populate-the-database)
    - [Start The Development Server](#start-the-development-server)
    - [Example Application](#example-application)
  - [What's Next?!](#whats-next)

## Project Structure

This is the structure of the repository is:

- README.md
- client
- server

### client

The client folder is where you will store your front-end code. Currently this contains a new project created with `create-react-app` and an example of how to call an API that's in active development.

Put your React code here

### server

The server folder is where you will store your back-end code. There is currently a JSON file with some fake data, it is an example of how your data can be structured. This folder is where you'll add your Node.js code.

Put your Node code here

## Getting Started

### Fork Project

1. Click on `Fork`
2. Select your Username

You can also refer to the [GitHub Fork Tutorial](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo)

This will add the `black-codher-personal-project` to your GitHub account.

### Clone Repo

1. Go to your forked repo
2. Click Code
3. Click HTTPS
4. Copy the text starting with `https://github.com/<your-repo-name>/black-codher-personal-project` (replace <your-repo-name> with the name of your GitHub username)
5. On your command line / terminal type `git clone https://github.com/<your-repo-name>/black-codher-personal-project` (replace <your-repo-name> with the name of your GitHub username)

### Populate The Database

You need to create and populate an initial collection in your local MongoDB server:

1. Open a `mongo` shell and run `db use black-codher-personal-project`. Close the shell or open a second terminal.
2. Type `mongoimport -h 127.0.0.1:27017 -d black-codher-personal-project -c users --file ./server/models/data.json --jsonArray`

### Start The Development Server

You can start the client side code (front-end), server side (back-end) and database separately using the commands in their respective folders. If you prefer to start all three together (this is the most convienient way), you can do so with the following commands:

1. `npm install && npm install --prefix client`
2. `npm run develop`

Please note that you run `npm install && npm install --prefix client` during your first installation, subsequently you will only need to run `npm run develop` to get your development environment up and running
### Example Application

We have created an example application that will display a list of users that are stored in your local database.

If all's well with the above steps, you should see a list of names. If your browser shows a "No users found" message, re-check all the steps to ensure your database is populated and connected properly.

## What's Next?!

Now it's time to start building your project.
