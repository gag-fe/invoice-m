import React from 'react';
import { createContainer, createRootContainer } from 'Roof';

import './shareRemind.less';

const ShareRemind = React.createClass({
  _closeCover(e){
    e.stopPropagation();
    e.preventDefault();
    this.props.setStoreState({
      shareRemind:false,
    });
  },

  render() {
    return (
      <div
        ref='shareShopCover'
        onClick={this._closeCover}
        className="shareShopRemind"
        style={{display:this.props.shareRemind?'block':'none'}}>
        <div className="img"/>
      </div>
    )
  }
});

export default createContainer({
  shareRemind:'shareRemind'
})(ShareRemind);
