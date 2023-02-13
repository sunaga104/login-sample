import type { NextApiRequest, NextApiResponse } from "next";
import auth from '../../utils/auth'

function Action(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    return res.status(200).json({ message: "成功"});
  } catch (err) {
    return res.status(400).json({ message: "失敗"});
  }
}

export default auth(Action)
