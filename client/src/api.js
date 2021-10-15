import axios from "axios";
const post_url = "/api/post";
const task_url = "/api/task";

export default class API {
  // Get all the posts from the server
  static async getAllPost() {
    const res = await axios.get(post_url);
    return res.data;
  }
  // Get a single post by ID
  static async getPostById(id) {
    const res = await axios.get(`${post_url}/${id}`);
    return res.data;
  }
  // Insert post into the database
  static async addPost(post) {
    const res = await axios.post(post_url, post);
    return res.data;
  }
  // Update post into database
  static async updatePost(id, post) {
    const res = await axios.patch(`${post_url}/${id}`, post);
    return res.data;
  }
  // Delete a post from database
  static async deletePost(id) {
    const res = await axios.delete(`${post_url}/${id}`);
    return res.data;
  }

  // Get all the tasks from the server
  static async getAllTask() {
    const res = await axios.get(task_url);
    return res.data;
  }
  // Get a single task by ID
  static async getTaskById(id) {
    const res = await axios.get(`${task_url}/${id}`);
    return res.data;
  }
  // Insert task into the database
  static async addTask(task) {
    const res = await axios.post(task_url, task);
    return res.data;
  }
  // Update task into database
  static async updateTask(id, task) {
    const res = await axios.patch(`${task_url}/${id}`, task);
    console.log(res.data);
    return res.data;
  }
  // Delete a task from database
  static async deleteTask(id) {
    const res = await axios.delete(`${task_url}/${id}`);
    return res.data;
  }
}
