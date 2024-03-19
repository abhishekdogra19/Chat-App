require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { Server } = require("socket.io");
const path = require("path");
//db
const connectDB = require("./db/connect");
//routes
const userRouter = require("./routes/User");
const chatRouter = require("./routes/Chat");
const messageRouter = require("./routes/Message");
const cookieParser = require("cookie-parser");

//env
const PORT = process.env.PORT || 6000;
connectDB();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://chat-app-zpvi.onrender.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions));

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"), (err) => {
    if (err) {
      console.error("Error sending file:", err);
    }
  });
});
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`.yellow);
    });
    const io = new Server(server, {
      cors: {
        origin: "https://chat-app-zpvi.onrender.com",
      },
      pingTimeout: 60000, //The amount of time it will wait while being inactive.
    });
    io.on("connection", (socket) => {
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log("Socket Connected");
        socket.emit("connection");
      });

      socket.on("join chat", (Room) => {
        socket.join(Room);
      });
      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stopTyping", (room) => socket.in(room).emit("stopTyping"));

      socket.on("newMessage", (newMessageReceived) => {
        let chat = newMessageReceived.chat;
        if (!chat.users) return console.log("Chat.users not defined");

        chat.users.forEach((user) => {
          if (user._id === newMessageReceived.sender._id) return;
          socket.in(user._id).emit("message recieved", newMessageReceived);
        });
      });
      socket.on("disconnect", () => {
        console.log("user disconnected");
        socket.leaveAll();
      });
    });
  } catch (error) {
    console.log(error);
  }
};
start();
