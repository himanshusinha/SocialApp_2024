require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const connectDB = require('./src/config/database');
const my_routes = require('./src/routes/users_routes/user_route'); // Ensure this path is correct
const postRoutes = require('./src/routes/post_routes/post_route');
const likeRoutes = require('./src/routes/like_routes/like_route');
const commentRoutes = require('./src/routes/comment_routes/comments_route');
const app = express();
const port = 3000;

connectDB().then(() => {
  // Middleware for parsing JSON bodies
  app.use(express.json());

  // Middleware for parsing URL-encoded bodies
  app.use(express.urlencoded({extended: true}));

  // Routes
  app.use('/', my_routes);
  app.use('/', postRoutes);
  app.use('/', likeRoutes);
  app.use('/', commentRoutes);

  // Start the server
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
});
