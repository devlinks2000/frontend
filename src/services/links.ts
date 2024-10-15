import { LinksState } from "../context/link";
import HttpService, { IHttpInstance } from "../utils/network/http";

class LinkService {
  APIv1: IHttpInstance;

  constructor() {
    this.APIv1 = new HttpService("");
  }

  async getSecureLink() {
    const link = await this.APIv1.http.get("privateLink");

    return link.data;
  }

  async createLink(data: LinksState) {
    const link = await this.APIv1.http.post("link", JSON.stringify(data));

    return link.data;
  }
  async getLinkById(id: string) {
    const link = await this.APIv1.http.get(`link?id=${id}`);
    return link.data;
  }
}

export default new LinkService();
