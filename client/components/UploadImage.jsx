import React from 'react';
import createReactClass from 'create-react-class';

import './UploadImage.less';

const UploadImage = createReactClass({
    onImageChange(event){
        let imageUrl = URL.createObjectURL(event.target.files[0]);
        document.getElementById('ImagePreview').style.backgroundImage = "url('"+imageUrl+"')";
        this.props.onImageChange(event);
    },
    render(){
        return (
            <div className={this.props.className + ' UploadImage'}>
                <input type='file' id='files-upload' onChange={this.onImageChange} accept="image/*"/>
                <div className='ImagePreview' id='ImagePreview'></div>
            </div>
        );
    }
});

export default UploadImage;