import React, {Component}from 'react';
import Jquery from 'jquery';
import {createActionContainer} from 'Roof'
import {hashHistory} from 'react-router';
import invoiceAction from '../../actions/invoice';
const API = {
  WX_AOAUTH: '/qwx/AJAXoauth.do',
};
class Invoice extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (window.isWeiXin()) {
      if (!window.GetRequest('code')) {
        let url = "https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=" + encodeURIComponent(window.location.href) + "&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
        window.location.href = url;
      }
    } else  if(window.isZhiFuBao()){
      if (!window.GetRequest('auth_code')) {
        let zfbUrl = "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=" + window.zfbAppid + "&auth_skip=false&scope=auth_base&redirect_uri=" + encodeURIComponent(window.location.href);
        window.location.href = zfbUrl;
      }
    }
    else{
      localStorage.clear();
      hashHistory.push('/invoiceHeader');
    }

  }

  componentDidMount() {
    let codeVal="";
    let appId="";
    let authType="";
    if (window.isWeiXin()) {
      codeVal = window.GetRequest('code');
      appId=window.appId;
      authType="1";
    }else if(window.isZhiFuBao()){
      codeVal = window.GetRequest('auth_code');
      appId=window.zfbAppid;
      authType="0";
    }

    if (codeVal) {
      Jquery.ajax({
        url: window.WX_URL + API.WX_AOAUTH,
        data: {
          appid: appId,
          code: codeVal,
          authType: authType,
          sence:'invoice',
        },
        method: 'post',
        type: 'json',
      }).done(resp => {
        let res = JSON.parse(resp);
        if (res.status == 'sucess') {
          localStorage.setItem("openid", res.openid);
          this.props.invoiceAction.queryEnterpriseInfoByOpenId({openId: res.openid})
        }
      });
    }
  }

  render() {
    return (
      <div></div>
    )
  }
}
export  default  createActionContainer({}, {
  invoiceAction
})(Invoice);
