import mongoose from "mongoose";

import '../models/Content';

import config from '../../etc/config.json';

const Content = mongoose.model('Content');

export function setUpConnection(){
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true });
}

export function listContents(){
    return Content.find();
}

export function createContent(data){
    const content = new Content({
        content_type: data.content_type,
        title: data.title,
        description: data.description,
        original_name: data.original_name,
        image: data.image,
        country: data.country,
        creator: data.creator,
        genre: data.genre,
        year: data.year,
        mark: data.mark,
        link: data.link
    });

    return content.save();
}

export function deleteContent(id){
    return Content.findById(id).remove();
}