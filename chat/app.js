const axios = require("axios");
const { ObjectId } = require('mongodb')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const http = require("http");
const { Server } = require("socket.io");
const { run, getDb } = require("./config/mongo");
const httpServer = http.createServer(app);
const cors = require("cors")
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

let db = getDb()
let rooms = ""
let chats = ""

app.get("/", (req, res, next) => {
    res.send("hello word")
})

io.on("connection", async (socket) => {
    let loggedInUserId = 0 //ntar ambil dari localStorage di tempelin ke socket.emit client
    let targetId = 0
    let roomData = undefined

    socket.emit("render-chat")
    // socket.on("send-id", async (targetUserId, targetUserData, currentUserId, currentUserData) => {
    //     try {
    //         loggedInUserId = currentUserId
    //         targetId = targetUserId
    //         let { firstName: targetUserFirstName, lastName: targetUserLastName, profpic: targetUserProfpic } = targetUserData
    //         let { firstName: currentUserFirstName, lastName: currentUserLastName, profpic: currentUserProfpic } = currentUserData
    //         let targetRoom = await rooms.findOne({ userIds: { $all: [+loggedInUserId, +targetUserId] } })
    //         if (!targetRoom) {
    //             let roomInsertData = {
    //                 roomName: `${loggedInUserId}-${targetUserId}`,
    //                 userIds: [loggedInUserId, targetUserId],
    //                 users: [
    //                     { userId: loggedInUserId, name: `${currentUserFirstName} ${currentUserLastName}`, profpic: currentUserProfpic },
    //                     { userId: targetUserId, name: `${targetUserFirstName} ${targetUserLastName}`, profpic: targetUserProfpic }
    //                 ]
    //             }
    //             let createRoom = await rooms.insertOne(roomInsertData)
    //             targetRoom = await rooms.findOne({ "_id": createRoom["insertedId"] })
    //         }
    //         let { roomName } = targetRoom
    //         let roomId = targetRoom["_id"]
    //         roomData = {
    //             roomId,
    //             roomName,
    //         }
    //         let { users } = targetRoom
    //         users.forEach((el) => {
    //             if (el.userId == loggedInUserId) {
    //                 loggedInUserData = el
    //             }
    //         })
    //         let chatHistory = await chats.find({ roomId }).toArray()
    //         socket.join(roomData.roomName)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // })
    socket.on("send-id", async (targetUserId, currentUserId) => {
        try {
            targetId = +targetUserId
            loggedInUserId = currentUserId
        } catch (err) {
            console.log(err)
        }
    })
    socket.on("join-room", (payload) => {
        socket.join(payload.roomName)
    })
    socket.on("send-chat", async (chat, name) => {
        console.log(chat, name)
        console.log(roomData, targetId, loggedInUserId)
        // let chatData = {
        //     userId: loggedInUserId,
        //     name: loggedInUserData.name,
        //     message: chat,
        //     roomId: roomData.roomId,
        // }
        // let chatInsertResponse = await chats.insertOne(chatData)
        // io.to(roomData.roomName).emit("send-chat", {
        //     "_id": chatInsertResponse["insertedId"],
        //     ...chatData
        // })
    })
    // await chats.updateMany({ roomId: ObjectId("633fc9cdfd8f9b7645d52be9") }, { $set: { roomId: ObjectId("6343a10d76db83edd1a83f34") } })
    // await rooms.deleteMany()
    // await rooms.insertOne(
    //     {
    //         "roomName": "1-2",
    //         "userIds": [
    //             1,
    //             2
    //         ],
    //         "users": [
    //             {
    //                 "userId": 2,
    //                 "name": "Micky",
    //                 "profpic": "https://cdn.discordapp.com/attachments/882091875589324836/1023414212824940594/Screenshot_2022-09-25-09-02-03-65_1c337646f29875672b5a61192b9010f9.jpg"
    //             },
    //             {
    //                 "userId": 1,
    //                 "name": "Ajat",
    //                 "profpic": "https://cdn.discordapp.com/attachments/882091875589324836/1023414212824940594/Screenshot_2022-09-25-09-02-03-65_1c337646f29875672b5a61192b9010f9.jpg"
    //             }
    //         ]
    //     }
    // )
})

// di sini nanti nge get dari database user biar lebih dinamis aj

// await chats.insertMany(
//     [
//         {
//             "userId": 1,
//             "name": "Ajat",
//             "message": "Hello World",
//             "roomId": roomData["insertedId"]
//         },
//         {
//             "userId": 2,
//             "name": "Micky",
//             "message": "Hello World 2",
//             "roomId": roomData["insertedId"]
//         }
//     ])

app.get("/rooms/:currentId", async (req, res, next) => {
    try {
        rooms = db.collection('room');
        let { currentId } = req.params
        let targetRooms = await rooms.find({ userIds: { $all: [+currentId] } }).toArray()
        res.status(200).json(targetRooms)
    } catch (err) {
        console.log(err)
    }
})
app.get("/room/:currentId/:targetId", async (req, res, next) => {
    try {
        rooms = db.collection('room');
        let { currentId, targetId } = req.params
        let targetRoom = await rooms.findOne({ userIds: { $all: [+currentId, +targetId] } })
        roomData = targetRoom
        // if (!targetRoom.roomName) {
        //     //get data current user sama target user by id nanti
        //     let roomInsertData = {
        //         roomName: `${currentId}-${targetId}`,
        //         userIds: [currentId, targetId],
        //         users: [
        //             {
        //                 userId: currentId,
        //                 // name: `${currentUserFirstName} ${currentUserLastName}`, 
        //                 // profpic: currentUserProfpic 
        //             },
        //             {
        //                 userId: targetId,
        //                 // name: `${targetUserFirstName} ${targetUserLastName}`, 
        //                 // profpic: targetUserProfpic 
        //             }
        //         ]
        //     }
        //     let createRoom = await rooms.insertOne(roomInsertData)
        //     targetRoom = await rooms.findOne({ "_id": createRoom["insertedId"] })
        // }
        res.status(200).json(targetRoom)
    } catch (err) {
        console.log(err)
    }
})
app.get("/chats/:roomId", async (req, res, next) => {
    try {
        chats = db.collection('chat')
        let { roomId } = req.params
        console.log(roomId)
        let targetChats = await chats.find({ roomId: ObjectId(roomId) }).toArray()
        console.log(targetChats)
        res.status(200).json(targetChats)
    } catch (err) {
        console.log(err)
    }
})

run()
    .then(() => {
        httpServer.listen(port, () => {
            console.log("Chat server running on port", port)
            db = getDb()
            rooms = db.collection('room');
            chats = db.collection('chat')
        })
    })
    .catch((err) => {
        console.log(err)
    })