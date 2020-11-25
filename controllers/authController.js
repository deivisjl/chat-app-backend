const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async(req, res) =>{
    const { email, password } = req.body

    try
    {
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
    
}

const generateToken = (user) =>{
    delete user.password

    const token = jwt.sign(user,'secret', {expiresIn: 86400})

    return {...user, ...{ token }}
}