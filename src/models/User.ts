import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true, lowercase: true },
    password:{ type: String, required: true },
    username: { type: String, required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

export default model('User', UserSchema);