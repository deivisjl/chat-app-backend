const models = require('../models')
const chat = require('../models/chat')
const User = models.User
const Chat = models.Chat
const ChatUser = models.ChatUser
const Message = models.Message
const {Op} = require('sequelize')

exports.index = async (req, res) =>{
    const user = await User.findOne({
        where: {
            id: req.user.id
        },
        include:[
            {
                model:Chat,
                include: [
                    {
                        model:User,
                        where:{
                            [Op.not]:{
                                id: req.user.id
                            }
                        }
                    },
                    {
                        model:Message,
                        limit: 20,
                        order:[['id','DESC']]
                    }
                ]
            }
        ]
    })

    return res.status(200).send(user.Chats)
}