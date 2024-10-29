import http from "../http-common";

class UserDataService {
  async verificationEmail(data) {
    return await http.post("/verification/email", data);
  }
  async verificationEmailChk(data) {
    return await http.patch("/verification/email", data);
  }
  async createUser(data) {
    return await http.post("/user", data);
  }
  async login(data) {
    return await http.post("/auth/login", data);
  }
  async findId(name, phoneNumber) {
    return await http.get(`/user/id?name=${name}&phoneNumber=${phoneNumber}`);
  }
  async findpassword(data) {
    return await http.post("/user/verification", data);
  }
  async resetPwd(data) {
    return await http.patch("/user/password", data);
  }
  async getUserInfo() {
    return await http.get("/user/info");
  }
  async patchUserInfo(data) {
    return await http.patch("/user/info", data);
  }
  async patchUserPwd(data) {
    return await http.post("/user/change-password", data);
  }
  async logout() {
    return await http.post("/auth/logout");
  }
  async getAffiliation() {
    return await http.get("/code/affiliation");
  }
  async joinIdCommonCheck(id) {
    return await http.get(`/user/check/${id}`);
  }
}

export default new UserDataService();
