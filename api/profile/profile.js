import service from "../baseRequest"

export function getUserInfoApi(data) {
    return service({
      url:  "/get_user_info",
      method: "post",
      data,
    });
}
export function getUserFriendsApi(data) {
  return service({
    url:  "/get_user_friends",
    method: "post",
    data,
  });
}

export function changeInfoAfterSignupApi(data) {
  return service({
    url:  "/change_profile_after_signup",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function setUserInfor(data) {
  return service({
    url:  "/set_user_info",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}