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