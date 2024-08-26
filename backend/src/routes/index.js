const express = require('express');
const rootRouter = express.Router();

const users = require('./users_routes/user_route'); // Ensure this path is correct
const posts = require('./post_routes/post_route'); // Ensure this path is correct
const likes = require('./like_routes/like_route');
const comments = require('./comment_routes/comments_route');
const chats = require('./chat_routes/chat_route');
const messages = require('./message_routes/message_routes');

rootRouter.use('/', users);
rootRouter.use('/', posts);
rootRouter.use('/', likes);
rootRouter.use('/', comments);
rootRouter.use('/', chats);
rootRouter.use('/', messages);

module.exports = rootRouter;
