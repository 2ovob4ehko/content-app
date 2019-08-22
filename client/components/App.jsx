import React from 'react';
import createReactClass from 'create-react-class';

import ContentsActions from '../actions/ContentsActions';
import ContentsStore from '../stores/ContentsStore';

import ContentEditor from './ContentEditor.jsx';
import ContentsGrid from './ContentsGrid.jsx';

import './App.less';

function getStateFromFlux(){
    return{
        isLoading: ContentsStore.isLoading(),
        contents: ContentsStore.getContents()
    };
}

const App = createReactClass({
    contentEditor: React.createRef(),
    getInitialState(){
        return getStateFromFlux();
    },
    // will depricated in react@17
    // componentWillMount(){
    //     ContentsActions.loadContents();
    // },
    componentDidMount(){
        ContentsActions.loadContents();
        ContentsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount(){
        ContentsStore.removeChangeListener(this._onChange);
    },
    handleContentAdd(data){
        ContentsActions.createContent(data);
    },
    handleContentDelete(content){
        ContentsActions.deleteContent(content.id);
    },
    handleContentEdit(content){
        this.contentEditor.current.handleFillContentForm(content);
    },
    render(){
        return (
            <div className='App'>
                <h2 className='App_header'>ContentsApp</h2>
                <ContentEditor onContentAdd={this.handleContentAdd} ref={this.contentEditor} />
                <ContentsGrid contents={this.state.contents} onContentDelete={this.handleContentDelete} onContentEdit={this.handleContentEdit} />
            </div>
        );
    },
    _onChange(){
        this.setState(getStateFromFlux());
    }
});

export default App;
