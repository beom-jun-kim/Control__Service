import http from "../http-common";

class Control {
  async getGuardianList(search, page, size) {
    return await http.get(
      `/gcon-user?search=${search}&page=${page}&size=${size}`
    );
  }
  async getGuardianUserDetail(id) {
    return await http.get(`/gcon-user/${id}`);
  }
  async getGuardianUserList(id) {
    return await http.get(`/gcon-user/guardian/${id}`);
  }
}

export default new Control();
