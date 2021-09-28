import axios from "axios";
const url = "/api/post";

export default class API {
  // Get all the posts from the server
  static async getAllPost() {
    const res = await axios.get(url);
    return res.data;
  }
  // Get a single post by ID
  static async getPostById(id) {
    const res = await axios.get(url + "/" + id);
    return res.data;
  }
  // Insert post into the database
  static async getPostById(id) {
    const res = await axios.get(url, post);
    return res.data;
  }
  // Update post into database
  static async updatePost(post) {
    const res = await axios.patch(url + "/" + id, post);
    return res.data;
  }
  // Delete a post from database
  static async deletePost(id) {
    const res = await axios.delete(url + "/" + id);
    return res.data;
  }
}
