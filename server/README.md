# Black Codher Personal Personal Project - Server side (backend)

All of your back end code should be in this folder.

Once you have your development environment up and running you'll be able to see the app running here:

```
http://localhost:5000
```

## Example App

In the example we have created a simple CRUD (create, read, update and delete) application and you can find the following:

1. How to connect to your mongo database
2. How to set up your schema
3. Four routes (`GET`, `POST`, `UPDATE` and `DELETE` requests)

Once the example is up and running, you can hit the below `user` endpoint: 

```
http://localhost:5000/api/user
```

and you should see an array of objects that looks similar to the below (but a bit more squashed):

```
[
  {
    "_id": "5fc41c0e17878f1e2d5a2209",
    "first_name": "Gary",
    "last_name": "McPherson",
    "location": "London",
    "__v": 0
  },
  {
    "_id": "5fc41c1f17878f1e2d5a220a",
    "first_name": "Charlene",
    "last_name": "Hunter ",
    "location": "London",
    "__v": 0
  },
  {
    "_id": "5fc41c2e17878f1e2d5a220b",
    "first_name": "Tanya",
    "last_name": "Powell ",
    "location": "London",
    "__v": 0
  },
  {
    "_id": "5fc41c3917878f1e2d5a220c",
    "first_name": "Oyin",
    "last_name": "Adebayo ",
    "location": "Birmingham",
    "__v": 0
  }
]
```

The `user` endpoint is our example of a `GET` request
