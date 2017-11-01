import React from 'react';
import Loading from '../loading/Loading';
import {createContainer} from 'Roof';
const CommonPage=React.createClass({
   render(){
       if(this.props.pageFlag){
         return (<div>111</div>);
       }else{
         return (<Loading/>);
       }
   }
});

export default createContainer({
  pageFlag:'pageFlag',
})(CommonPage)
