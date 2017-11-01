import React from 'react';
import Utils from '../../utils/index';
import LoginForm from 'mobile-login-module';
import Cookies from 'js-cookie';
import Jquery from 'jquery';
const ajax = Utils.ajax;
const API = {
  LOGIN_URL: '/user/login.do',
  LOGIN_SHORT_MESSAGE: '/user/sendShortMessage.do',
  WX_AOAUTH: '/qwx/AJAXoauth.do'
};

const Login = React.createClass({
  propTypes: {
    codeVal: React.PropTypes.string
  },
  getInitialState() {
    return {
      codeVal: ''
    };
  },
  componentWillMount() {
    if (!window.GetRequest('code')) {
      let url = "https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri="+encodeURIComponent(window.location.href)+"&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
      window.location.href = url;
    }
  },
  componentDidMount() {
    let codeVal = window.GetRequest('code');
    if (codeVal) {
      this.setState({
        codeVal: codeVal
      });
    }

    if (codeVal) {
      Cookies.remove('openid');
      Jquery.ajax({
        url: window.WX_URL + API.WX_AOAUTH,
        data: {
          appid: window.appId,
          code: codeVal,
          authType: '1'
        },
        method: 'post',
        type: 'json',
      }).then(resp => {
        let res = JSON.parse(resp);
        if (res.status == 'sucess') {
          Cookies.set('openid', res.openid);
        }
      });
    }
  },
  //获取验证码
  _sendSecurityCode(phoneNumber){
    // console.log(window.GetRequest('code'));
    // console.log(Cookies.get('openid'));
    ajax({
      url: window.LOGIN_URL + API.LOGIN_SHORT_MESSAGE,
      data: {
        mobile: phoneNumber,
      },
      method: 'post',
      type: 'json',
    }).then(resp => {
      if (resp.status == 'S') {
        // let data = resp.data;
      }
    })
  },
  //获取用户的登陆信息。
  _getLoginInfo(phoneValue, codeValue){
    ajax({
      url: window.LOGIN_URL + API.LOGIN_URL,
      data: {
        topic:'3',
        chnl:'04',
        mobile: phoneValue,
        code: codeValue,
        appid: window.appId,
        openid: Cookies.get('openid'),
        isbind:'1',
      },
      method: 'post',
      type: 'json',
    }).then(resp => {
      if (resp.status == 'S') {
        let data = resp.data;
        Cookies.set('token', data);
        console.log('11');
        console.log(this.props.params.targets);
        if (this.props.params.targets) {
          let targetUrl = this.props.params.targets.replace(/\|/i, '/');
          console.log(this.props.params.targets);
          console.log(window.location.origin+window.location.pathname+'#/'+targetUrl);
          window.location.href = window.location.origin+window.location.pathname+'#/'+targetUrl;
        }
      }
    });
  },
  render(){
    return (
      <div>
        {this.state.codeVal ? <LoginForm getCode={this._sendSecurityCode} getLogin={this._getLoginInfo}/> : ""}
      </div>
    )
  }
});
export  default Login;
