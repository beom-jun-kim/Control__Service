import http from "../http-common";

class FindLoitering {
  async getAllCctv() {
    return await http.get("/cctv/info");
  }
  async getSelectBox() {
    return await http.get("/labeling/select-options");
  }
  async getDisapSearch(
    gender,
    ageGroup,
    upperType,
    upperColor,
    lowerType,
    lowerColor,
    startDate,
    endDate,
    accessories,
    cctvSids,
  ) {
    return await http.get(
      `/cctv/search?gender=${gender}&ageGroup=${ageGroup}&upperType=${upperType}&upperColor=${upperColor}&lowerType=${lowerType}&lowerColor=${lowerColor}&startDate=${startDate}&endDate=${endDate}&accessories=${accessories}&cctvSids=${cctvSids}`
    );
  }
}

export default new FindLoitering();
