import axios from "axios";
export class Api {
  private static service = axios.create({
    timeout: 10 * 1000,
  });
  
  static get = async (url: string): Promise<any> => {
    try {
      const res = await this.service.get(url, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });
      if (!res.data) {
        return res;
      }
      const data = res.data;
      return data;
    } catch (error) {
      return error;
    }
  };
}