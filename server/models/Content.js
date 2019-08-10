import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    content_type: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    original_name: {type: String},
    image: {type: String},
    country: {type: [String]},
    creator: {type: String},
    genre: {type: [String]},
    year: {type: Number},
    mark: {type: Number},
    link: {type: String},
    timestamp: {type: Date, default: Date.now}
});

const Content = mongoose.model('Content', ContentSchema);