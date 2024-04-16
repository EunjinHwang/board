const mongoose = require('mongoose')

const RepleSchema = new mongoose.Schema(
    {
    reple : String,
    postid : String,
    r_id : String,
    },
    {collection : 'reples'}
)

const Reple = mongoose.model('Reple',RepleSchema)

module.exports = { Reple }