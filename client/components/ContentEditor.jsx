import React from 'react';
import createReactClass from 'create-react-class';

import './ContentEditor.less';

const ContentEditor = createReactClass({
    getInitialState(){
        return {
            content_type: 'movie', // select: movie, series, book, song
            title: '',
            description: '',
            original_name: '',
            image: '',
            country: ['UA'], //multiselect: UA => Україна, US => США...
            creator: '',
            genre: '',
            year: '', //0-3000 integer
            mark: '', //0-10 integer
            link: ''
        };
    },
    handleContentTypeChange(event){
        this.setState({content_type: event.target.value});
    },
    handleTitleChange(event){
        this.setState({title: event.target.value});
    },
    handleDescriptionChange(event){
        this.setState({description: event.target.value});
    },
    handleOriginalNameChange(event){
        this.setState({original_name: event.target.value});
    },
    handleImageChange(event){
        this.setState({image: event.target.value});
    },
    handleCountryChange(event){
        const value = [];
        const options = event.target.options;

        for(var i=0;i<options.length;i++){
            const opt = options[i];
            if(opt.selected){
                value.push(opt.value);
            }
        }
        this.setState({country: value});
    },
    handleCreatorChange(event){
        this.setState({creator: event.target.value});
    },
    handleGenreChange(event){
        this.setState({genre: event.target.value});
    },
    handleYearChange(event){
        this.setState({year: event.target.value});
    },
    handleMarkChange(event){
        this.setState({mark: event.target.value});
    },
    handleLinkChange(event){
        this.setState({link: event.target.value});
    },
    handleContentAdd(){
        const newContent = {
            content_type: this.state.content_type,
            title: this.state.title,
            description: this.state.description,
            original_name: this.state.original_name,
            image: this.state.image,
            country: this.state.country,
            creator: this.state.creator,
            genre: this.state.genre,
            year: this.state.year,
            mark: this.state.mark,
            link: this.state.link
        };

        this.props.onContentAdd(newContent);
        this.setState({
            content_type: 'movie',
            title: '',
            description: '',
            original_name: '',
            image: '',
            country: '',
            creator: '',
            genre: '',
            year: '',
            mark: '',
            link: ''
        });
        document.getElementById('files-upload').value = null;
    },
    render(){
        return (
            <div className='ContentEditor'>
                <div className='ContentEditor_body'>
                    <div className='ContentEditorPart'>
                        <input type='file' id='files-upload' className='InputElement' onChange={this.handleImageChange}/>
                        <select className='InputElement' size='3' value={this.state.country} multiple={true} onChange={this.handleCountryChange}>
                            <option value='UA'>Україна</option>
                            <option value='US'>США</option>
                            <option value='GB'>Британія</option>
                        </select>
                        <input type='number' min='0' max='10' step='1' className='InputElement' placeholder='Оцінка' value={this.state.mark} onChange={this.handleMarkChange} />
                        <input type='text' className='InputElement' placeholder='Посилання' value={this.state.link} onChange={this.handleLinkChange} />
                    </div>
                    <div className='ContentEditorPart'>
                        <select className='InputElement' value={this.state.content_type} onChange={this.handleContentTypeChange}>
                            <option value='movie'>Фільм</option>
                            <option value='series'>Серіал</option>
                            <option value='book'>Книга</option>
                            <option value='song'>Пісня</option>
                        </select>
                        <input type='text' className='InputElement' placeholder='Назва' value={this.state.title} onChange={this.handleTitleChange} />
                        <input type='text' className='InputElement' placeholder='Оригінальна назва' value={this.state.original_name} onChange={this.handleOriginalNameChange} />
                        <textarea className='InputElement' placeholder='Опис' rows={5} value={this.state.description} onChange={this.handleDescriptionChange} />
                        <input type='text' className='InputElement' placeholder='Автор' value={this.state.creator} onChange={this.handleCreatorChange} />
                        <input type='text' className='InputElement' placeholder='Жанр' value={this.state.genre} onChange={this.handleGenreChange} />
                        <input type='number' min='1900' max='2100' step='1' className='InputElement' placeholder='Рік' value={this.state.year} onChange={this.handleYearChange} />
                    </div>
                </div>
                <div className='ContentEditor_footer'>
                    <button className='ContentEditor_button' disabled={!this.state.title} onClick={this.handleContentAdd}>Додати</button>
                </div>
            </div>
        );
    }
});

export default ContentEditor;