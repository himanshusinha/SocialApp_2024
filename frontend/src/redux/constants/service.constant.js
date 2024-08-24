export const SERVICE_ROUTES = {
  LOGIN: '/login',
  SIGN_UP: '/signup',
  OTP_VERIFY: '/otpVerify',
  CREATE_POSTS: '/createPost',
  ALL_POSTS: '/allPost',
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
