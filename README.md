# outsta9ram-An instagram clone

## Tools

- ReactJS to render the UI.
- ExpressJS to implement the backend router.
- Mongoose(A MongoDB ORM) to store the data e.g. user profile / follower / comment.
- JWT in HTTP-only cookie to verify the user and protect the backend route.
- AWS S3 to save the post image and avatar, make this more scalable

## TODO

- Server
  1. cache data e.g. user searching history with redis
  2. Unit test with Mocha
  3. fetch post for feed page
- Client
  1. Feed Page for the post
  2. refactor the all css
