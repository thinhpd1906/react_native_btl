import service from "../baseRequest"

export function getInfor(data) {
    return service({
      url:  "/get_user_info",
      method: "post",
      data,
    });
}