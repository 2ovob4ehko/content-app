import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const ContentsActions = {
    loadContents(){
        AppDispatcher.dispatch({
            type: Constants.LOAD_CONTENTS_REQUEST
        });
        api.listContents()
        .then(({data}) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_CONTENTS_SUCCESS,
                contents: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_CONTENTS_FAIL,
                error: err
            })
        );
    },
    createContent(content){
        api.createContent(content)
        .then(() =>
            this.loadContents()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteContent(contentId){
        api.deleteContent(contentId)
        .then(() =>
            this.loadContents()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default ContentsActions;