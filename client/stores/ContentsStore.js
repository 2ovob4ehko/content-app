import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _contents = [];
let _loadingError = null;
let _isLoading = true;

function formatContent(content){
    return{
        id: content._id,
        content_type: content.content_type,
        title: content.title,
        description: content.description,
        original_name: content.original_name,
        image: content.image,
        country: content.country,
        creator: content.creator,
        genre: content.genre,
        year: content.year,
        mark: content.mark,
        link: content.link,
        timestamp: content.timestamp
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading(){
        return _isLoading;
    },
    getContents(){
        return _contents;
    },
    emitChange(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action){
    switch (action.type){
        case AppConstants.LOAD_CONTENTS_REQUEST:{
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CONTENTS_SUCCESS:{
            _isLoading = false;
            _contents = action.contents.map(formatContent);
            _loadingError = null;
            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CONTENTS_FAIL:{
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default:{
            console.log('No such handler');
        }
    }
});

export default TasksStore;