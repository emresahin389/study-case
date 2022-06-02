const userModel = require("./models/user.js");
const md5 = require("md5");
const jwt = require('jsonwebtoken');
const { get } = require("express/lib/response");
const secretKey = "eY0loAIRbHBZguZfGS5MlBaX0OE1V2kM";

const authorization = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decodeToken = jwt.verify(token, secretKey);
    
    if (decodeToken.role == "standart" && req.path != "/user/list"){
        return res.status(401).json({
            status : false,
            message : "Yetkisiz kullanıcı.",
        });
    } else{next()}

    } catch (error) {
        return res.status(401).json({
            status : false,
            message : "AUTH.FAIL",
        });
    }
}

const login = async (req, res) => {
    
    try {
        const user = await userModel.findOne({
            where:{
                userName : req.body.userName,
                password : md5(req.body.password),


            },
        });
        if (user === null) throw new Error("Kullanıcı bulunamadı.");
        return res.json({
            status : true,
            data : jwt.sign({
                role:user.role,
                name:user.name,
            },secretKey, { expiresIn: '4h' })
        });
    } catch (error) {
        return res.status(404).json({
            status : false,
            message : error.message,
        });
    }

}

const addUser = async (req, res) => {
    
    try {
        const newUser = await userModel.create({
            role : req.body.role,
            userName: req.body.userName,
            password : md5(req.body.password),
            name : req.body.name,
        });
        return res.json({
            status : true,
            message : "Kullanıcı başarıyla eklendi.",
        });
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : "role, userName, password, name tanımlayınız.",
        });
    }

}

const userDetail = async (req, res) => {
    
    try {
        const user = await userModel.findOne({
            where:{
                id:req.params.id
            },
            attributes:[
                "id","userName","name","role","createdAt","updatedAt",
            ]
        });
        if (user === null) throw new Error("Kullanıcı bulunamadı.");
        return res.json({
            status : true,
            data : user
        });
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message,
        });
    }

}


const listUser = async (req, res) => {
    
    try {
        return res.json({
            status : true,
            data : await userModel.findAll({
                attributes:[
                    "id","userName","role",
                ]
            }),
        });
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message,
        });
    }

}

const editUser = async (req, res) => {
    
    try {
        const user = await userModel.findOne({
            where:{
                id:req.body.id
            }
        });
        if (user === null) throw new Error("Kullanıcı bulunamadı.");
        user.role=req.body.role;
        user.name=req.body.name;
        if (req.body.password.length > 0) user.password=md5(req.body.password);
        await user.save();

        return res.json({
            status : true,
            message : "Kullanıcı başarıyla düzenlendi.",
        });
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message,
        });
    }

}

const deleteUser = async (req, res) => {
    
    try {
        const user = await userModel.findOne({
            where:{
                id:req.body.id
            }
        });
        if (user === null) throw new Error("Kullanıcı bulunamadı.");
        await user.destroy();

        return res.json({
            status : true,
            message : "Kullanıcı başarıyla silindi.",
        });
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message,
        });
    }

}



module.exports = {
    addUser,
    listUser,
    editUser,
    deleteUser,
    userDetail,
    login,
    authorization
}