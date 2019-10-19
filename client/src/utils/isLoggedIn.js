import jwt_decode from 'jwt-decode';

export default function () {
  const token = localStorage.getItem('jwtToken');
  const user = localStorage.getItem('user');
  if (!token || !user) {
    return false;
  }

  if (!['rem', 'admin'].includes(user)) {
    return false;
  }

  const { username } = jwt_decode(token);
  return username === user;
}
