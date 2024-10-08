export const SERVICE_ROUTES = {
  LOGIN: '/login',
  SIGN_UP: '/signup',
  OTP_VERIFY: '/otpVerify',
  CREATE_POSTS: '/createPost',
  LIKE_DISLIKE: '/likeDislike',
  ADD_POSTS: '/createPost',
  MY_POSTS: '/myPosts',
  FILE_UPLOAD: '/upload',
  ALL_POSTS: '/allPost',
  ADD_COMMENTS: '/addComment',
  DELETE_COMMENTS: '/deleteComment',
  POST_COMMENTS: '/postComments',
};
export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
};
export const replaceUrl = (url, data) => {
  var regex = new RegExp(':(' + Object.keys(data).join('|') + ')', 'g');
  return url?.replace(regex, (m, $1) => data[$1] || m);
};
