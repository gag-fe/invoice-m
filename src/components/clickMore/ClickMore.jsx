import React from 'react';
import './clickMore.less';
import {Icon} from 'antd-mobile';
import { createContainer , createActionContainer} from  'Roof';
var i=1;
class ClickMore extends React.Component{
  static  propTypes = {
    actionFunc: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  more=()=>{
    i=this.props.pageIndex;
    i++;
    if(this.props.type == 'A'){
      this.props.actionFunc(i);
    }else if(this.props.type == 'S'){
      this.props.actionFunc({'keyword':'','pageIndex':i,'searchType':'1','status':window.GetRequest('status')});
    }else if(this.props.type == 'K'){
      this.props.actionFunc({'keyword':this.props.searchVal,'pageIndex':i,'searchType':'0','status':''});
    }else{
      this.props.actionFunc(i);
    }


  };
  render(){
    let str='';
    if(parseInt(this.props.pageIndex) * parseInt(this.props.pageSize) < parseInt(this.props.total)){
      str=<div className="clickMore" onClick={this.more}>{this.props.iconFlag ? <Icon type="loading"/> : '点击加载更多'}</div>;
    }else {
      str=<div className="noMore"></div>;
    }
    return(
      <div>{str}</div>
    )
  }
}
export default createActionContainer({
  searchVal: 'searchVal',
},{
}) (ClickMore);
