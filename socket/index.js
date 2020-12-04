const socketIo = require('socket.io')
const {sequelize} = require('../models')
const users = new Map()

const SocketServer = (server) =>{
    const io = socketIo(server,{
        cors:{
            origin:'*',
            methods:['GET','HEAD','PUT','PATCH','POST','DELETE'],
            preflightContinue:false,
            optionsSuccessStatus:204
        }
    })

    io.on('connection', (socket) =>{

        socket.on('join', async(user) =>{
            let sockets = []

            if(users.has(user)){
                const existingUser = users.get(user.id)
                existingUser.sockets = [...existingUser.sockets, ...[socket.id]]
                users.set(user.id, existingUser)
                sockets = [...existingUser.sockets, ...[socket.id]]
            }else{
                users.set(user.id, {id:user.id, sockets:[socket.id]})
                sockets.push(socket.id)
            }

            const onlineFriends = [] //ids

            const chatters = await getChatters(user.id) //query

            //notify his friends that user is now online
            for(let i = 0; i < chatters.length; i++){
                if(users.has(chatters[i])){
                    const chatter = users.get(chatters[i])
                    chatters.sockets.forEach(socket=>{
                        try {
                            io.to(socket).emit('online', user)
                        } catch (error) {
                            
                        }
                    })

                    onlineFriends.push(chatter.id)
                }
            }

            //send to user sockets which of his friends are online
            sockets.forEach(socket =>{
                try {
                    io.to(socket).emit('friends', onlineFriends)
                } catch (error) {
                    
                }
            })

            /* console.log("New user joined: ", user.firstName)
            io.to(socket.id).emit('typing','User typing...') */
        })
    })
}

const getChatters = async (userId) =>{
    try {
        const [results, metadata] = await sequelize.query(`
            select  "cu"."userId" from "ChatUsers" as cu
            inner join (
                select "c"."id" from "Chats" as c
                where exists(
                    select  "u"."id" from "Users" as u
                    inner join "ChatUsers" on u.id = "ChatUsers"."userId"
                    where u.id = ${parseInt(userId)} and c.id = "ChatUsers"."chatId"
                )
            ) as cjoin on cjoin.id = "cu"."chatId"
            where "cu"."userId" != ${parseInt(userId)}
        `)

        return results.length > 0 ? results.map(el => el.userId) : []

    } catch (error) {
        return []
    }
}

module.exports = SocketServer