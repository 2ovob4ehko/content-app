import axios from 'axios';
import {apiPrefix} from '../../etc/config.json';

export default{
    listContents(){
        return axios.get(`${apiPrefix}/contents`);
    },
    createContent(data){
        return axios.post(`${apiPrefix}/contents`, data);
    },
    deleteContent(contentId){
        return axios.delete(`${apiPrefix}/contents/${contentId}`);
    }
}