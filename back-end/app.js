const express = require("express");
const userModel = require("./models/user.js");
const services = require("./service.js");
const cors = require("cors");


const server = express();
server.use(express.json());
server.use(cors());


server.get("/", (req, res) =>{
    res.send("Express'ten merhaba");
});



server.get("/user/list", services.authorization, services.listUser);
server.post("/login",services.login);
server.post("/user/add", services.authorization, services.addUser);
server.post("/user/edit", services.authorization, services.editUser);
server.post("/user/delete", services.authorization, services.deleteUser);
server.get("/user/:id",services.authorization, services.userDetail);

userModel.sync();
server.listen(3000, () => {
    console.log("http://localhost:3000 adresine gelen istekler dinleniyor.");
});
