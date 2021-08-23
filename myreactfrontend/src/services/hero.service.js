import http from "../http-common";

class HeroesDataService {
  getAll() {
    return http.get("/heros");
  }

  get(id) {
    return http.get(`/heros/${id}`);
  }

  create(data) {
    return http.post("/heros", data);
  }

  update(id, data) {
    return http.put(`/heros/${id}`, data);
  }

  delete(id) {
    return http.delete(`/heros/${id}`);
  }
}

export default new HeroesDataService();
