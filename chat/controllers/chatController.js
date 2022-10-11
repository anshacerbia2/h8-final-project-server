const { ObjectId } = require("mongodb")
const { getDb } = require("../config/mongo")

let db = ""
let rooms = ""
let chats = ""
function getCollections() {
    db = getDb()
    return db
}
class chatController {
    static async getRooms(req, res, next) {
        try {
            console.log('sapidasiod')
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
            getCollections()
            rooms = db.collection('room');
            let { currentId, targetId } = req.params
            let targetRoom = await rooms.findOne({ userIds: { $all: [+currentId, +targetId] } })
            console.log(targetRoom)
            // get data current user sama target user by id nanti
            if (!targetRoom.roomName) {
                let roomInsertData = {
                    roomName: `${currentId}-${targetId}`,
                    userIds: [currentId, targetId],
                    users: [
                        {
                            userId: currentId,
                            // name: `${currentUserFirstName} ${currentUserLastName}`, 
                            // profpic: currentUserProfpic 
                        },
                        {
                            userId: targetId,
                            // name: `${targetUserFirstName} ${targetUserLastName}`, 
                            // profpic: targetUserProfpic 
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
            console.log(roomId)
            let targetChats = await chats.find({ roomId: ObjectId(roomId) }).toArray()
            console.log(targetChats)
            res.status(200).json(targetChats)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = chatController