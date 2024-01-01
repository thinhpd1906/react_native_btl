import service from "../baseRequest"

export function signUp(data) {
    return service({
      url:  "/signup",
      method: "post",
      data,
    });
}

export function login(data) {
  return service({
    url:  "/login",
    method: "post",
    data,
  });
}


export function checkVerifyCode(data) {
  return service({
    url: "/check_verify_code",
    method: "post",
    data
  })
}

export function changeProfileAfterSignUp(data) {
  return service({
    url: "/change_profile_after_signup",
    method: "post",
    data: data
  })
}

export function checkVerifyCodeApi(data) {
  return service({
    url: "/check_verify_code",
    method: "post",
    data: data
  })
}
export function getVerifyCodeApi(data) {
  return service({
    url: "/get_verify_code",
    method: "post",
    data: data
  })
}
export function resetPasswordApi(data) {
  return service({
    url: "/reset_password",
    method: "post",
    data: data
  })
}