const USER_INFO = 'userInfo';
export function setUserInfo(info) {
  localStorage.setItem(USER_INFO, JSON.stringify(info));
  return true;
}

export function getUserInfo() {
  const info = JSON.parse(localStorage.getItem(USER_INFO));
  return info || {};
}

export function removeUserInfo() {
  localStorage.removeItem(USER_INFO);
  return true;
}
