import axios from "axios";

// does this carry over from Jobly, or do I need to rename process.env.**** ?
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// *** the above works perfectly fine locally

// const BASE_URL = "https://epic-viewer-capstone.herokuapp.com";
// *** the above does not work if the https:// is omitted, but does with it;
//        however, a refresh of any component returns 404

const BASE_URL = "";

// add check if local/development; if so, has to run on local host


/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class EpicViewerApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/api/${endpoint}`;
    // const url = `/api/${endpoint}`;

    console.debug("New URL:", url);
  
    const headers = {Authorization: `Bearer ${EpicViewerApi.token}`};
    const params = (method === "get") ? data : {};

    try {
      return (await axios({url, method, data, params, headers})).data;
    } catch(e) {
      console.error("API ERROR:", e.response);
      let message = e.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get authors (filtered by name (NB-specifically, shortName) if not undefined) */

  static async getAuthors(shortName) {
    let res = await this.request(`authors`, { shortName });
    return res.authors;
  }
 
  /** Get details on an author by id */

  static async getAuthor(id) {
    let res = await this.request(`authors/${id}`);
    return res.author;
  }

  /** Get works (with search filters if not undefined) */

  static async getWorks(shortTitle) {
    let res = await this.request(`works`, {shortTitle});
    return res.works;
  }

  /** Get details on a work by id */

  static async getWork(id) {
    let res = await this.request(`works/${id}`);
    return res.work;
  }

  /** Get lines (with search filters if not undefined) */

  static async getLines(data) {
    let res = await this.request(`lines`, data);
    return res.lines;
  }

  /** Get details on a line by id */

  static async getLine(id) {
    let res = await this.request(`lines/${id}`);
    return res.line;
  }

  /** Get token for login from username, password */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  // to be added at some point, whether inital or future development:
  // favoriteLine
  // favoriteWork
  // favoriteAuthor
}

export default EpicViewerApi;