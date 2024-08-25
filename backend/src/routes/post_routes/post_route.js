const express = require('express');
const router = express.Router();

const post_controller = require('./post_controller');
const uploadMiddleWare = require('../../middleware/fileUpload');
const auth = require('../../middleware/auth');

router.post(
  '/createPost',
  auth,
  uploadMiddleWare.array('file', 5),
  post_controller.createPost,
);
router.get('/allPost', auth, post_controller.allPosts);
router.get('/myPosts', auth, post_controller.myPosts);
router.post(
  '/upload', // Ensure this matches the form's action
  uploadMiddleWare.single('file'),
  post_controller.fileUpload,
);

module.exports = router;
