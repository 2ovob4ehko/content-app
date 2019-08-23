import React from 'react';
import createReactClass from 'create-react-class';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

const StarMark = createReactClass({
    createStars(){
      let stars = [];
      for(let i=1;i<=this.props.max;i++){
        stars.push(<span className='StarMark_item' key={i}>
          <FontAwesomeIcon icon={ i<=this.props.value ? fasStar : farStar} />
        </span>);
      }
      return stars
    },
    render(){
        return (
            <span className={this.props.className + ' StarMark'}>
              {this.createStars()}
            </span>
        );
    }
});

export default StarMark;
