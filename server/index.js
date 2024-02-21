require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
//db
const connectDB = require("./db/connect");
//routes
const userRouter = require("./routes/User");
const chatRouter = require("./routes/Chat");
const messageRouter = require("./routes/Message");
const cookieParser = require("cookie-parser");
//env
const PORT = process.env.PORT || 6000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Jai Ganesh Ji");
});

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`.yellow);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
