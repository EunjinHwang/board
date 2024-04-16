const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
    title : String,
    description : String,
    image : String,
    date : Date,
    id : String,
    },
    {collection : 'posts'}
)
postSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        ret.date = ret.date.toISOString().split('T')[0];
        return ret;
    }
});
const Post = mongoose.model('Post',postSchema)

module.exports = { Post }