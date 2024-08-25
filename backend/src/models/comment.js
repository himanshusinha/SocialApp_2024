const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const commentSchema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    postId: {type: Schema.Types.ObjectId, required: true, ref: 'Post'},
    comment: {type: String, required: true},
  },
  {timestamps: true},
);

module.exports = model('Comment', commentSchema);
