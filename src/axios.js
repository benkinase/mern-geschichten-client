import axios from "axios";
import Cookie from "js-cookie";

// get token from user
function AuthHeader() {
  const user = Cookie.getJSON("user");

  if (user && user.token) {
    return { authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}
//"http://localhost:5000/",
// create axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: AuthHeader(),
});

export default instance;
