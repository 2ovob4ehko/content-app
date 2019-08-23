import React from 'react';
import createReactClass from 'create-react-class';
import axios from 'axios';
import {apiPrefix} from '../../etc/config.json';
import UploadImage from './UploadImage.jsx'
import StarMarkInput from './StarMarkInput.jsx'

import './ContentEditor.less';

const ContentEditor = createReactClass({
    getInitialState(){
        return {
            content_type: 'movie', // select: movie, series, book, song
            title: '',
            description: '',
            original_name: '',
            temp_image: '',
            image: '',
            country: ['UA'], //multiselect: UA => Україна, US => США...
            creator: '',
            genre: '',
            year: '', //0-3000 integer
            mark: '', //0-10 integer
            link: '',
            content_id: '',
            is_edit: false
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
        this.setState({temp_image: event.target.files[0]});
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
    handleMarkChange(value){
        this.setState({mark: value});
    },
    handleLinkChange(event){
        this.setState({link: event.target.value});
    },
    handleContentAdd(){
        if(this.state.temp_image){
          const formData = new FormData();
          formData.append('temp_image',this.state.temp_image);
          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          };
          axios.post(`${apiPrefix}/upload`,formData,config)
              .then((res) => {
                  this.sendContent({
                      content_type: this.state.content_type,
                      title: this.state.title,
                      description: this.state.description,
                      original_name: this.state.original_name,
                      image: res.data.filename,
                      country: this.state.country,
                      creator: this.state.creator,
                      genre: this.state.genre,
                      year: this.state.year,
                      mark: this.state.mark,
                      link: this.state.link,
                      id: this.state.content_id
                  });
              }).catch((err) => {
                  console.log(err);
          });
        }else{
          this.sendContent({
              content_type: this.state.content_type,
              title: this.state.title,
              description: this.state.description,
              original_name: this.state.original_name,
              country: this.state.country,
              creator: this.state.creator,
              genre: this.state.genre,
              year: this.state.year,
              mark: this.state.mark,
              link: this.state.link,
              id: this.state.content_id
          });
        }
    },
    sendContent(newContent){
      this.props.onContentAdd(newContent);
      this.setState({
          content_type: '',
          title: '',
          description: '',
          original_name: '',
          temp_image: '',
          image: '',
          country: '',
          creator: '',
          genre: '',
          year: '',
          mark: '',
          link: '',
          content_id: '',
          is_edit: false
      });

      document.getElementById('ImagePreview').style = null;
      document.getElementById('files-upload').value = null;
    },
    handleFillContentForm(content){
        this.setState({
            content_type: content.content_type,
            title: content.title,
            description: content.description,
            original_name: content.original_name,
            temp_image: '',
            image: '',
            country: content.country,
            creator: content.creator,
            genre: content.genre,
            year: content.year,
            mark: content.mark,
            link: content.link,
            content_id: content.id,
            is_edit: true
        });
    },
    render(){
        return (
            <div className='ContentEditor'>
                <div className='ContentEditor_body'>
                    <div className='ContentEditorPart'>
                        <UploadImage className='InputElement' onImageChange={this.handleImageChange} />
                        <StarMarkInput max='10' className='InputElement' onMarkChange={this.handleMarkChange} value={this.state.mark}/>
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
                        <select className='InputElement' size='3' value={this.state.country} multiple={true} onChange={this.handleCountryChange}>
                            <option value='UA'>Україна</option>
                            <option value='US'>США</option>
                            <option value='GB'>Британія</option>
                        </select>
                        <input type='number' min='1900' max='2100' step='1' className='InputElement' placeholder='Рік' value={this.state.year} onChange={this.handleYearChange} />
                    </div>
                </div>
                <div className='ContentEditor_footer'>
                    <button className='ContentEditor_button' disabled={!this.state.title} onClick={this.handleContentAdd}>{this.state.is_edit ? 'Зберегти' : 'Додати'}</button>
                </div>
            </div>
        );
    }
});

export default ContentEditor;
