import React from 'react';
import createReactClass from 'create-react-class';
import Masonry from 'react-masonry-component';
import Content from './Content.jsx'

import './ContentsGrid.less';


const ContentsGrid = createReactClass({
    render(){
        const masonryOptions = {
            itemSelector: '.Content',
            columnWidth: '.Content_size',
            gutter: 10,
            isFitWidth: true
        };
        return (
            <Masonry
                className='ContentsGrid'
                options={masonryOptions}
            >
            <div className='Content_size'></div>
                {
                    this.props.contents.map(content =>
                        <Content
                            key={content.id}
                            content={content}
                            onDelete={this.props.onContentDelete.bind(null, content)}
                            onEdit={this.props.onContentEdit.bind(null, content)}
                        />
                    )
                }
            </Masonry>
        );
    }
});

export default ContentsGrid;
