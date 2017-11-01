import React from 'react';
import './/score.less';
import '../../utils/common.js';
import { createContainer } from 'Roof';
const Star_select = require("../../img/Star_select.png");


const Score=React.createClass({
componentDidMount(){
  let li = this.refs.stars.getElementsByTagName("li");
  for(let i=0;i<li.length;i++){
    li.item(i).onclick=()=>{
      let j;
      for(j=0;j<=i;j++){
        li[j].getElementsByClassName('imgIcon')[0].style.display='block';
      }
      for(let k=j;k<li.length;k++){
        li[k].getElementsByClassName('imgIcon')[0].style.display='none';
      }
      this.props.setStoreState({
        score:j,
      });
    }
  }

},

  render(){
    return(
      <div className="score">
        <div>打分</div>
        <ul className="stars_ul" ref="stars">
          <li><img className="imgIcon" src={Star_select}/></li>
          <li><img className="imgIcon" src={Star_select}/></li>
          <li><img className="imgIcon" src={Star_select}/></li>
          <li><img className="imgIcon" src={Star_select}/></li>
          <li><img className="imgIcon" src={Star_select}/></li>
        </ul>

      </div>
    )
  }
});
export default createContainer({

})(Score);
