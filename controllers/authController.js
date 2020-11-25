const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/app')

exports.login = async(req, res) =>{
    const { email, password } = req.body

    try
    {
        const secret = require('crypto').randomBytes(64).toString('hex')
        
        const user = await User.findOne({
            where:{
                email
            }
        })

        if(!user) return res.status(404).send({message:'User not found!'})

        if(!bcrypt.compareSync(password, user.password)) return res.status(401).send({message:'Invalid credentials!'})

        const userWithToken = generateToken(user.get({raw:true}))

        return res.status(200).send(userWithToken)
    }
    catch(e)
    {
        return res.status(500).send({message:e.message})
    }
}

exports.register = async(req, res) =>{
    
    try {
        const user = await User.create(req.body)
        
        const userWithToken = generateToken(user.get({raw:true}))

        return res.status(200).send(userWithToken)

    } catch (error) {
        
    }
}

const generateToken = (user) =>{
    delete user.password

    const token = jwt.sign(user, config.appKey, {expiresIn: 86400})

    return {...user, ...{ token }}
}