import axios from "axios";
import Cookie from "js-cookie";

// get token from user
function AuthHeader() {
  const user = Cookie.getJSON("user");
  //console.log(user.token);

  if (user && user.token) {
    return { authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}
//

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEN_URL,
  headers: AuthHeader(),
});

// intercepting invalid token
instance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 403) {
      Cookie.remove("user");
      window.location = "/login";
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default instance;
