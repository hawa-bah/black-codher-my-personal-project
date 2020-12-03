# Black Codher Personal Project

Here's a boilerplate project directory with the initial setup for your Personal Project.

The expectation with this project is that you're able to fork the repository, and get started.

- [Black Codher Personal Project](#black-codher-personal-project)
  - [Project Structure](#project-structure)
    - [client](#client)
    - [server](#server)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
      - [Mongo added to system path (Windows only)](#mongo-added-to-system-path-windows-only)
      - [MongoDB Database Tools installed](#mongodb-database-tools-installed)
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

### Prerequisites

#### Mongo added to system path (Windows only)

1. Type `mongo --help` to check MongoDB is on the system path. If you see the help text displayed, skip to the next prerequisite.
2. Navigate to your MongoDB installation folder and copy the full path to the bin folder (default should be `C:\Program Files\MongoDB\Server\4.4\bin`)
3. Add the MongoDB bin folder to the system path
   1. Type 'environment' in the Windows Search box and open "Edit the system environment variables" (or right-click "This PC" > Properties > Advanced System Properties)
   2. Click "Environment Variables..."
   3. Select "Path" under "System variables" and click "Edit"
   4. Click "New"
   5. Paste the path you copied above, or click "Browse..." to locate the folder on your system
   6. Click "OK"
   7. Click "OK"
   8. Click "OK"
4. Ensure MongoDB service is running
   1. Type 'Services' in the Windows Search box and open "Services".
   2. Scroll down the list and ensure "MongoDB" is running. Click to select the service and click the "play" icon to start if not.
#### MongoDB Database Tools installed

1. Check `mongoimport` is installed by running `mongoimport --help` in your command prompt. If you see the help text displayed, continue to the next prerequisite. If you see a `command not recognized` error message, continue to next step.
2. Follow the installation instructions for [macOS](https://docs.mongodb.com/database-tools/installation/installation-macos/#installation) or [Windows](https://docs.mongodb.com/database-tools/installation/installation-windows/#installation)

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

1. Type `cd black-codher-personal-project` to navigate to your project root directory
2. Type `mongo` to open a MongoDB shell
3. Type `use black-codher-personal-project` to create your database
4. Type `exit` to close the shell
5. Type `mongoimport -h 127.0.0.1:27017 -d black-codher-personal-project -c users --file ./server/models/data.json --jsonArray` _Make sure this command is run from your project's root directory!_

### Start The Development Server

You can start the client side code (front-end), server side (back-end) and database separately using the commands in their respective folders. If you prefer to start all three together (this is the most convienient way), you can do so with the following commands:

1. `npm install && cd client && npm install && cd ..`
2. `npm run develop`

Please note that you run `npm install && cd client && npm install && cd ..` during your first installation, subsequently you will only need to run `npm run develop` to get your development environment up and running
### Example Application

We have created an example application that will display a list of users that are stored in your local database.

If all's well with the above steps, you should see a list of names. If your browser shows a "No users found" message, re-check all the steps to ensure your database is populated and connected properly.

## What's Next?!

Now it's time to start building your project.
