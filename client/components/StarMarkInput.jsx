import React from 'react';
import createReactClass from 'create-react-class';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

import './StarMarkInput.less';

const StarMarkInput = createReactClass({
    setMark(i){
      this.props.onMarkChange(i);
    },
    createStars(){
      let stars = [];
      for(let i=1;i<=this.props.max;i++){
        stars.push(<span className='StarMarkInput_item' onClick={() => this.setMark(i)} key={i}>
          <FontAwesomeIcon icon={ i<=this.props.value ? fasStar : farStar} />
        </span>);
      }
      return stars
    },
    render(){
        return (
            <div className={this.props.className + ' StarMarkInput'}>
                <div className='StarMarkInputPreview' id='StarMarkInputPreview'>
                  {this.createStars()}
                </div>
            </div>
        );
    }
});

export default StarMarkInput;
