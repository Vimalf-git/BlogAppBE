import mongoose from '../index.js';


const schema = new mongoose.Schema({
    name: { type: String },
    mail: { type: String },
    tittle: { type: String },
    category: { type: String },
    desc: { type: String },
    imageUrl: { type: String },
    public_id:String
}, {
    versionKey: false
}
)
const postModel = mongoose.model('Feedposts', schema)
export default postModel