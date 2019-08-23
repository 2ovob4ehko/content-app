import React from 'react';
import createReactClass from 'create-react-class';

import './ContentSearch.less';

const ContentSearch = createReactClass({
    getInitialState(){
        return {

        };
    },
    render(){
        return (
            <div className='ContentSearch'>
                <input type='text' className='InputElement' placeholder='пошук' onChange={this.props.onSearch} />
            </div>
        );
    }
});

export default ContentSearch;
