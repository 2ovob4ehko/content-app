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
                <div className='Content_wrapper'>
                    <div className='Content_image_wrapper'>
                        <div className='Content_image' style={imageStyle}></div>
                    </div>
                    <div className='Content_params_wrapper'>
                        <h4 className='Content_title'>{this.props.content.title}</h4>
                        {this.props.content.original_name ? <p>Оригінал: <strong>{this.props.content.original_name}</strong></p> : ''}
                        {this.props.content.creator ? <p>Автор: <strong>{this.props.content.creator}</strong></p> : ''}
                        {this.props.content.genre ? <p>Жанр: <strong>{this.props.content.genre}</strong></p> : ''}
                        {this.props.content.country ? <p>Країна: <strong>{this.props.content.country}</strong></p> : ''}
                        {this.props.content.year ? <p>Рік: <strong>{this.props.content.year}</strong></p> : ''}
                        {this.props.content.mark ? <p>Оцінка: <strong>{this.props.content.mark}</strong></p> : ''}
                        {this.props.content.link ? <a href={this.props.content.link} target='_blank'><strong>Джерело</strong></a> : ''}
                    </div>
                    <div className='Content_description_wrapper'>
                        <div className='Content_description'>{this.props.content.description}</div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Content;