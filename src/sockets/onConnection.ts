import { Socket } from "socket.io";
import { io } from "../app";
import { parse } from "cookie";
import { verifyJwtToken } from "../utils/createToken";

export const onConnection = async (socket: Socket) => {
  try {
    const reqCookie = socket.request.headers.cookie;
    if (!reqCookie) return socket.disconnect(true);
    const token = parse(reqCookie).token;
    const payload = verifyJwtToken(token);
    // deepcode ignore PureMethodReturnValueIgnored: <thi is not regular array join>
    socket.join(payload.id);
  } catch (err) {
    console.log("socket error:", err);
    socket.disconnect(true);
  }
};
