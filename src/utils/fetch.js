import $ from 'jquery';
import { Toast } from 'antd-mobile';
import utils from './common.js';
import Cookies from 'js-cookie';
import Merge from 'deep-assign';
import React from 'react';
import {hashHistory} from 'react-router';

const showError = function (msg) {
  Toast.info(msg);
};

const goLogin = function(back) {
  let target = window.location.hash.replace(/^\#\//, '').replace(/\//g, '|');
  Cookies.remove('token');
  Toast.info('未登录或登录超时','1',()=>{
    if (target.indexOf('login') < 0) {
      return window.location.href = window.location.origin+window.location.pathname+'#/login/'+target;
    }
  });
};

const notice = {
  INVOKE_ERROR: '调用后台接口出错，请联系管理员',
  AUTH_FAIL: '亲，您没有权限，请申请权限',
};

const adapter = function (data) {
  return data;
};

const token = function () {
  const key = 'com.gooagoo.passpart.sso.token.name';
  return Cookies.get(key);
};

const defaultOptions = {
  url: '',
  type: 'POST',
  dataType: 'json',
  async: true,
  data: '',
  adapter, // resultDTO解析方法
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
  alertError: true, // 是否弹出错误提示窗口
  parallel: false, // 是否并行发送批量请求
  isSuccess(resp) { // 自定义逻辑判断是否成功
    return resp.status === 'S' || resp.success === true || resp.boo === true || resp.status === 'success';
  },
  isAccessDeny(resp) { // 判断是否没有权限
    return resp.status === 'NO_LOGIN' || resp.status === 'T' || resp.status === 'timeout';
  },
  isGuide(resp) {
    return resp.status === 'NS';
  }

};

const fetchMany = function (options) {
  let temp = $.ajax;
  url.forEach(u => {
    temp = temp(options);
  });
  return new Promise((resolve, reject) => {
    temp.then(ans => {
      ans.forEach(item => {
        let xhr = item[0],
          response = item[1];
        if (typeof response == 'string' && (options.type === 'json' || options.type === 'jsonp')) {
          response = JSON.parse(response);
        }
        response = options.adapter(response);
        if (!options.isSuccess(xhr, response)) {
          reject(ans, item);
          goLogin(response);
        }
      });
      resolve(ans);
    }).catch((e, xhr, resp) => {
      options.alertError && showError(notice.INVOKE_ERROR + '.' + options.url + '.' + e);
      reject({
        xhr,
        resp,
      });
    });
  });
};

const Fetch = function (options) {

  options = Object.assign({}, defaultOptions, options);
  // let { parallel = false } = options;
  //   // 并行的请求
  // if (parallel) {
  //   return fetchMany(options);
  // }
  return new Promise((resolve, reject) => {
    $.ajax(options)
      .done(function(resp) {
        if (typeof resp == 'string' && (options.type === 'json' || options.type === 'jsonp')) {
          resp = JSON.parse(resp);
        }
        resp = options.adapter(resp);
        if (options.isSuccess(resp)) {
          resolve(resp);
        } else {
          const errorMsg = resp.msg || notice.INVOKE_ERROR;
          let accessDeny = false;
          if (options.isAccessDeny(resp)) { // 没有权限
            accessDeny = true;
            goLogin(resp);
          } else if (options.isGuide(resp)) {
            accessDeny = true;
            bindGuide(resp);
          } else {
            Toast.hide();
            options.alertError && showError(errorMsg);
            reject({
              accessDeny,
              resp
            });
          }
        }
      })
      .fail(function(resp, e, context) {
        reject({
          resp,
          e,
          context
        });
      });

  });
};

module.exports = Fetch;
