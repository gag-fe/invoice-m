import React from 'react';

import './rateShow.less';
const imgLight = require("../../img/star-light.png");
const imgHalf = require("../../img/star-half.png");
const imgDark = require("../../img/star-dark.png");

const RateShow = React.createClass({
  getDefaultProps(){
    return{
      count:3
    }
  },

  render() {
    let imgs=[];
    for(let i=0;i<5;i++){
      i<=this.props.count-1?
        imgs.push(<img src={imgLight} key={i}/>):
        this.props.count==(i+0.5)?
          imgs.push(<img src={imgHalf} key={i}/>):
          imgs.push(<img src={imgDark} key={i}/>);
    }
    return (
      <div className="rateShow">
        {imgs}
      </div>
    )
  }
});

export default RateShow;
