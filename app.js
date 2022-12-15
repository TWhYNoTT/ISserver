const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose")
const socketIO = require("socket.io");
const registerRouter = require("./routes/Register");
const authRouter = require("./routes/Auth");
const getUserData = require("./routes/GetUserData");
const post = require("./routes/Post");
const message = require("./routes/Message");
const app = express();
const server = require("http").createServer(app)

const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ""
    }
});



mongoose.connect(`mongodb+srv://whynot:Cool12.23@cluster0.ogrmohg.mongodb.net/ISdb?retryWrites=true&w=majority`)
    .then(() => { console.log("Connect to database..") })
    .catch(console.log);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/register", registerRouter);
app.use("/api/login", authRouter);
app.use("/api/getuserdata", getUserData);
app.use("/api/post", post);
app.use("/api/message", message);
let online = []
io.on("connection", (socket) => {
    socket.on("goonline", (id) => {
        online.push(id);
        socket.join(id);
        io.emit("getusersonline", online);
        socket.ID = id;
    });
    socket.on("sendmessage", (message) => {
        io.to(message.to).emit("newmessage", {
            messageFrom: message.from,
            messageBody: message.body
        })



    })
    socket.on("disconnect", (x) => {
        var index = online.indexOf(socket.ID);
        if (index !== -1) {
            online.splice(index, 1);
        }
        io.emit("getusersonline", online);

    });
})

const port = process.env.PORT || 3000;




server.listen(port, () => { console.log(`Listening to port ${port}...`) });
