import http from 'http';
import { Server } from 'socket.io';

export default ({ app, logger, listen }:{ app:any, logger:any, listen:any }) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  listen(io);

  return server;
}