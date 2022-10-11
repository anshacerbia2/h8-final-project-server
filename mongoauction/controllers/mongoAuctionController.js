const { ObjectId } = require("mongodb")
const { getDb } = require("../config/mongo")


let db = ""
let rooms = ""
let histories = ""
function getCollections() {
    db = getDb()
    return db
}
class mongoAuctionController {
    static async getBidHistory(req, res, next) {
        try {
            let { roomId } = req.params
            histories = db.collection('history')
            let targetHistories = await histories.find({ roomId: ObjectId(roomId) }).toArray()
            res.status(200).json(targetHistories)
        } catch (err) {
            console.log(err)
        }
    }
    static async getBidRoom(req, res, next) {
        try {
            let { id } = req.params
            getCollections()
            rooms = db.collection('room');
            let targetRoom = await rooms.findOne({
                autionProductId: id
                // userIds: { $all: [+currentId, +targetId] } 
            })
            if (!targetRoom) {
                let roomInsertData = {
                    auctionProductId: id
                }
                // let roomInsertData = {
                //     roomName: `${currentId}-${targetId}`,
                //     userIds: [currentId, targetId],
                //     users: [
                //         {
                //             userId: currentId,
                //             // name: `${currentUserFirstName} ${currentUserLastName}`, 
                //             // profpic: currentUserProfpic 
                //         },
                //         {
                //             userId: targetId,
                //             // name: `${targetUserFirstName} ${targetUserLastName}`, 
                //             // profpic: targetUserProfpic 
                //         }
                //     ]
                // }
                let createRoom = await rooms.insertOne(roomInsertData)
                targetRoom = await rooms.findOne({ "_id": createRoom["insertedId"] })
            }
            res.status(200).json(targetRoom)
        } catch (err) {
            console.log(err)
        }
    }
}