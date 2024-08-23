const LikeModel = require('../../models/like');
const PostModel = require('../../models/post');

const likeDislike = async (req, res) => {
  const {postId, userId} = req.body;

  if (!postId || !userId) {
    return res
      .status(400)
      .json({status: false, error: 'postId and userId are required'});
  }

  try {
    const existingLike = await LikeModel.findOne({postId, userId});

    if (!existingLike) {
      await LikeModel.create(req.body);
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        {$inc: {likeCount: 1}},
        {new: true},
      );
      console.log('Post after like:', updatedPost); // Log the updated post
      return res.status(200).json({message: 'Like added successfully..!!'});
    } else {
      await LikeModel.findByIdAndDelete(existingLike._id); // Correct method for deletion
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        {$inc: {likeCount: -1}},
        {new: true},
      );
      console.log('Post after unlike:', updatedPost); // Log the updated post
      return res.status(200).json({message: 'Like removed successfully..!!'});
    }
  } catch (error) {
    console.error('Error in likeDislike:', error); // Log the error details
    return res
      .status(500)
      .json({status: false, error: error.message || 'Internal server error'});
  }
};

const postLikes = async (req, res) => {
  console.log('post likes', req.query);
  const {postId, page, limit} = req.query;

  const totalComments = await LikeModel.countDocuments({postId});
  const totalPages = Math.ceil(totalComments / limit);
  const startIndex = (page - 1) * limit;

  try {
    const result = await LikeModel.find({postId: postId})
      .populate({path: 'userId', select: 'userName fullName'})
      .skip(startIndex)
      .limit(limit)
      .exec();
    res.send({
      data: result,
      status: true,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(403).json({status: false, error: error});
  }
};

module.exports = {
  likeDislike,
  postLikes,
};
