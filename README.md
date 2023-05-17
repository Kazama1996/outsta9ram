# outsta9ram

A instagram like application, user can post picture and interact with other user by making comment or making a like to a post

## 1.Tools

- ReactJS to render the UI.
- Express to implement the backend RESTful API.
- Mongoose(A MongoDB ODM) to store the data e.g. user profile / follower / comment.
- JWT in HTTP-only cookie to verify the user and protect the backend api.
- AWS S3 to save the post image and avatar, make this more scalable
- Redis to cache the data which is often used
- Docker to containerize the whole app use docker compose

## 2.Useage

Whether your local machine have docker or not , you need to fill all the enviroment variable(e.g.URL of your mongoDB database, mongoDB password , AWS S3 bucket URL etc ) in the /outsta9ram/server/config.env, After that you can follow the instruction below to start this app.

Suppose your local machine do not have docker, you need to start the server first (If your local machine have docker, skip this plz~)

1. Switch to the server directory
   > cd server
2. Install all the dependencies
   > npm install
3. Start the server
   > npm start

After starting the server, you need to start the React application

4. Switch to the client directory
   > cd client
5. Install all the dependencies
   > npm install
6. Start the react application
   > npm start

Suppose your local machine has docker.
If you don't have docker compose, Go to [this](https://linux.how2shout.com/install-and-configure-docker-compose-on-ubuntu-22-04-lts-jammy/) to get the docker compose installation guide, After that type the following commend in the /outsta9ram.

1. Start all services (e.g. frontend, backend, mongoDB)
   > docker-compose up --build -d
2. If you want to shut down this app type the following command:
   > docker-compose down -v

When you finish all instructions above, go to your browser and type "localhost:3000" in the URL bar, then you can enjoy ~~

## 3.Database Design

This is the blueprint of my database design.

![image](https://github.com/Kazama1996/outsta9ram/blob/main/Database%20Design.png)

## 4.Store the User searching history via redis

I use redis to design the Queue-Set to store the history of searching user, In this data structure, it contains a queue to store the history of user searching, and use set to avoiding the duplicate item. Here is my flowchart of this data structure.   
![image](https://github.com/Kazama1996/outsta9ram/blob/main/Queue-Set%20blueprint.png)

## 5.TODO

- Server
  1. ~~cache data e.g. user searching history with redis~~
  2. Unit test with Mocha
  3. fetch post for feed page
  4. ~~Dockerize the whole app use docker compose~~
- Client
  1. Feed Page for the post
  2. refactor the all css
