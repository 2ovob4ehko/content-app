import React from 'react';
import Masonry from 'react-masonry-component';
import Content from './Content.jsx'

import './ContentsGrid.less';


const ContentsGrid = React.createClass({
    render(){
        const masonryOptions = {
            itemSelector: '.Content',
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };
        return (
            <Masonry
                className='ContentsGrid'
                options={masonryOptions}
            >
                {
                    this.props.contents.map(content =>
                        <Content
                            key={content.id}
                            title={content.title}
                            onDelete={this.props.onContentDelete.bind(null, content)}
                        >
                            {content.description}
                        </Content>
                    )
                }
            </Masonry>
        );
    }
});

export default ContentsGrid;