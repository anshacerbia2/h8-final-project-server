const { ObjectId } = require("mongodb")
const { getDb } = require("../config/mongo")
const axios = require("axios")
const serverUrl = `http://localhost:3000`

let db = ""
let rooms = ""
let chats = ""
function getCollections() {
    db = getDb()
    return db
}
async function deleteRooms() {
    try {
        console.log('delete rooms')
        getCollections()
        rooms = db.collection('room')
        await rooms.deleteMany({})
    } catch (err) {
        console.log(err)
    }
}
async function deleteChats() {
    try {
        getCollections()
        chats = db.collection('chat')
        await chats.deleteMany({})
    } catch (err) {
        console.log(err)
    }
}
class chatController {
    static async getRooms(req, res, next) {
        try {
            getCollections()
            rooms = db.collection('room');
            let { currentId } = req.params
            let targetRooms = await rooms.find({ userIds: { $all: [+currentId] } }).toArray()
            res.status(200).json(targetRooms)
        } catch (err) {
            console.log(err)
        }
    }
    static async getOneRoom(req, res, next) {
        try {
            // await deleteRooms()
            // await deleteChats()
            getCollections()
            rooms = db.collection('room');
            let { currentId, targetId } = req.params
            let targetRoom = await rooms.findOne({ userIds: { $all: [+currentId, +targetId] } })
            // get data current user sama target user by id nanti
            if (!targetRoom) {
                console.log(`insert room`)
                let { data: currentUser } = await axios.get(`${serverUrl}/users/${currentId}`)
                let { data: targetUser } = await axios.get(`${serverUrl}/users/${targetId}`)
                let roomInsertData = {
                    roomName: `${currentId}-${targetId}`,
                    userIds: [+currentId, +targetId],
                    users: [
                        {
                            userId: +currentId,
                            name: currentUser.fName,
                            profpic: currentUser.avatar || currentUser.userImg
                        },
                        {
                            userId: +targetId,
                            name: targetUser.fName,
                            profpic: targetUser.avatar || targetUser.userImg
                        }
                    ]
                }
                let createRoom = await rooms.insertOne(roomInsertData)
                targetRoom = await rooms.findOne({ "_id": createRoom["insertedId"] })
            }
            res.status(200).json(targetRoom)
        } catch (err) {
            console.log(err)
        }
    }
    static async getChatHistory(req, res, next) {
        try {
            getCollections()
            chats = db.collection('chat')
            let { roomId } = req.params
            let targetChats = await chats.find({ roomId: ObjectId(roomId) }).toArray()
            res.status(200).json(targetChats)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = chatController