import React from 'react';
import ReactDom from 'react-dom';
import IScroll from './iscroll-lib.js';
import cx from 'classnames';
import { createActionContainer, createContainer } from 'Roof';
const  nofn = function (){};

const Iscroll = React.createClass({
  propTypes: {
    mouseWheel: React.PropTypes.bool,
    probeType: React.PropTypes.number,
    className: React.PropTypes.string,
    scroll: React.PropTypes.func,
    slideDown: React.PropTypes.func,
    slideUp: React.PropTypes.func,
    refresh: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      mouseWheel: false,
      probeType: 3,
      className: "scrollable",
      scroll: nofn,
      slideDown: nofn,
      slideUp: nofn,
      refresh: nofn
    };
  },

  componentDidMount() {
    let el = ReactDom.findDOMNode(this);
    let props = this.props;
    let opts = {
      mouseWheel: props.mouseWheel,
      probeType: props.probeType
    };

    this.iscroll = new IScroll(el, opts);

    this.iscroll.on("scroll", this.props.scroll.bind(this, this.iscroll));

    this.iscroll.on("slideDown", this.props.slideDown.bind(this, this.iscroll));

    this.iscroll.on("slideUp", this.props.slideUp.bind(this, this.iscroll));

    this.props.setStoreState({
      iscrollRefresh: this.iscroll.refresh
    });

    window.iscrollRefresh = this.iscroll.refresh;
    //this.iscroll.on("refresh", this.props.refresh.bind(this, this.iscroll));
    //this.props.refresh();
  },

  componentWillReceiveProps() {
    console.log('iscroll ReceiveProps');
    if (this.iscroll) this.iscroll.refresh()
  },

  componentWillUnmount() {
    if (this.iscroll) this.iscroll.destroy()
  },

  render() {
    console.log(this.props.scrollerHeight);
    const restProps = this.iscroll;
    return (
      // cx('scrollable'),
      <div className={ this.props.className} {...restProps}>
        <div className="scroller" style={{height:60000}}>
          <div className="scroller-pullDown">
            <span className="icon-double-angle-down pull-down-icon"></span>
            <span className="pull-down-msg">下拉刷新</span>
          </div>
          <div className="scroller-content">
            {this.props.children}
          </div>
          <div className="scroller-pullUp">
            <span className="icon-double-angle-up pull-up-icon"></span>
            <span className="pull-up-msg">上拉刷新</span>
          </div>
        </div>
      </div>
    )
  }
});

//export default Iscroll
export  default createContainer({
  iscrollRefresh:'iscrollRefresh'
}) (Iscroll);
