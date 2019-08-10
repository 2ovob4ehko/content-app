import React from 'react';
import createReactClass from 'create-react-class';

import './Content.less';

const Content = createReactClass({
    render(){
        return (
            <div className='Content'>
                <span className='Content_del_icon' onClick={this.props.onDelete}>x</span>
                {
                    <h4 className='Content_title'>{this.props.title}</h4>
                }
                <div className='Content_description'>{this.props.children}</div>
            </div>
        );
    }
});

export default Content;