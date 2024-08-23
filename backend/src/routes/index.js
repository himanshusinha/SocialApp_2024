const express = require('express');
const rootRouter = express.Router();

const users = require('./users_routes/user_route'); // Ensure this path is correct
const posts = require('./post_routes/post_route'); // Ensure this path is correct
const likes = require('./like_routes/like_route');
const comments = require('./comment_routes/comments_route');

rootRouter.use('/', users);
rootRouter.use('/', posts);
rootRouter.use('/', likes);
rootRouter.use('/', comments);

module.exports = rootRouter;
