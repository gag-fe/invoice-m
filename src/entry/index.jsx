import 'antd-mobile/dist/antd-mobile.less';
import ReactDOM from 'react-dom';
import React from 'react';
import Utils from '../utils/index';
import IndexRouter from '../components/index/IndexRouter';
import '../../index.html';
import './index.less';
import {NavBar, Icon,} from 'antd-mobile';
const ajax = Utils.ajax, login = Utils.common.login;
import Cookies from 'js-cookie';

//运维随环境配置
window.baseUrl = '.gooagoo.com';
window.channelType = 'CBPOA';
//appid
if (window.location.origin.indexOf('gooagoo.com') > 0) {
  window.zfbAppid = '2016070601587849';
  window.appId = 'wx938e20f58f130736';
} else if (window.location.origin.indexOf('test.goago.cn') > 0) {
  window.zfbAppid = '2015122101018894';
  window.appId = 'wxf4d537e9fdc1f43e';
  window.baseUrl = '.test.goago.cn';
} else if (window.location.origin.indexOf('pressure.goago.cn') > 0) {
  window.zfbAppid = '2016051001384286';
  window.appId = 'wxf4d537e9fdc1f43e';
  window.baseUrl = '.pressure.goago.cn';
} else {
  window.zfbAppid = '2016011401091449';
  window.appId = 'wxf4d537e9fdc1f43e';
  window.baseUrl = '.dev.goago.cn';
}

// window.INVOICE_API = '';
window.WX_URL = 'http://wx' + window.baseUrl;
window.INVOICE_API = 'http://invoice' + window.baseUrl;


ReactDOM.render(<IndexRouter/>, document.getElementById('react-content'));
