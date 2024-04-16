import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    nameFriend: [{type:Schema.Types.ObjectId, ref: 'users'}],
    likes: String,
    age: Number,
    activities: [{ type: Schema.Types.ObjectId, ref: 'activities'}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
    state: Boolean
    }
);

export default mongoose.model('friends', schema);