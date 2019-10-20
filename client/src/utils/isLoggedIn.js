import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

export default function () {
  const token = localStorage.getItem('jwtToken');
  const user = localStorage.getItem('user');
  const sessionToken = Cookies.get('session');

  if (!token || !user || !sessionToken) {
    return false;
  }

  if (!['rem', 'admin'].includes(user)) {
    return false;
  }

  const { username } = jwt_decode(token);
  return username === user;
}
