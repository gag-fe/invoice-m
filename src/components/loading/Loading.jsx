import React from 'react';
import './loading.less';
import { Icon } from 'antd-mobile';

const Loading=React.createClass({
  render(){
    return (
      <div className="loadingDiv">
        <Icon type="loading" size="lg" color="red"></Icon>
        <span>正在加载中</span>
      </div>
    )
  }

});
export  default Loading;
