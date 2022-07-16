const UserSchema = require('../schemas/user-schema')
const { StatusCodes } = require('http-status-codes')

const updateUser = async (req, res) => {
    const user = await UserSchema.findOneAndUpdate(
        req.user._id,
        req.body,
        { new: true }
    ).select('-_id')

    const token = user.createJWT()

    res.status(StatusCodes.OK)
    .cookie('token', token)
    .json({ message: 'Updated user!'})
}

const deleteUser = async (req, res) => {
    //delete from games

    res.status(StatusCodes.OK)
    .clearCookie('token')
    .clearCookie('gameId')
    .redirect('/authentication')
}

module.exports = {
    updateUser,
    deleteUser,
}