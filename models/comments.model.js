const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CommentsSchema = new Schema({
    postid:{
      type: String,
      required: true
    },
    name:{
        type: String,
        required: true
    },
    aproove: {
        type: Boolean,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    commentDate:{
        type: Date,
        required: true
    }
});

mongoose.model('comments', CommentsSchema);
