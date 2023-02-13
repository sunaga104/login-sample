import jwt from "jsonwebtoken";
import {secretKey} from '../setting/env'

const auth = (handler) => {
  console.log('入りました')
  return async (req, res) => {
    if (req.method === "GET") {
      return handler(req, res);
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "トークンがありません" });
    }
    try {
      console.log(jwt.verify(token, secretKey))
      const decoded = jwt.verify(token, secretKey);
      return handler(req, res);
    } catch (error) {
      console.log(error)
      return res
        .status(401)
        .json({ message: "トークンが正しくないので、ログインしてください" });
    }
  };
};
export default auth;