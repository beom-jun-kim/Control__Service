import http from "../http-common";

class Manage {
  async getManageUserList(name, page, size) {
    return await http.get(
      `/user/list?username=${name}&page=${page}&size=${size}`
    );
  }
  async getRoleList() {
    return await http.get("/role/list");
  }
  async patchRole(data) {
    return await http.patch("/user/role",data);
  }
}

export default new Manage();
