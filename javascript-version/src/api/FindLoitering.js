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
    page
  ) {
    const params = new URLSearchParams();

    if (gender) params.append("gender", gender);
    if (ageGroup) params.append("ageGroup", ageGroup);
    if (upperType) params.append("upperType", upperType);
    if (upperColor) params.append("upperColor", upperColor);
    if (lowerType) params.append("lowerType", lowerType);
    if (lowerColor) params.append("lowerColor", lowerColor);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (accessories) params.append("accessories", accessories);
    if (cctvSids) params.append("cctvSids", cctvSids);
    if (page) params.append("page", page);

    const url = `/cctv/search?${params.toString()}`;

    return await http.get(url);
  }
}

export default new FindLoitering();
