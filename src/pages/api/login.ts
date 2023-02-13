import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"
import {findUser} from '../../setting/userInfo'
import {secretKey} from '../../setting/env'

export default function Login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('secretKey')
    const request = JSON.parse(req.body);
    const userData = findUser(request.userId);
    if (userData) {
      if (request.password === userData.password) {
        const payload = {
          userId: request.userId,
        };
        const token = jwt.sign(payload, secretKey, { expiresIn: "23h" });
        return res.status(200).json({ message: "ログイン成功", status:true,  token });
      } else {
        return res
          .status(400)
          .json({ message: "ログイン失敗" , status:false});
      }
    } else {
      return res
        .status(400)
        .json({ message: "ログイン失敗" , status:false});
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "ログイン失敗" , status:false});
  }
}
