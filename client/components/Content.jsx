import React from 'react';
import createReactClass from 'create-react-class';

import './Content.less';

const Content = createReactClass({
    render(){
        let imageStyle = {
            backgroundImage: 'url('+this.props.content.image+')'
        };
        return (
            <div className={'Content ' + this.props.content.content_type}>
                <span className='Content_del_icon' onClick={this.props.onDelete}>x</span>
                <div className='Content_image' style={imageStyle}></div>
                <div className='Content_wrapper'>
                    <h4 className='Content_title'>{this.props.content.title}</h4>
                    <div className='Content_description'>{this.props.content.description}</div>
                </div>
            </div>
        );
    }
});

export default Content;