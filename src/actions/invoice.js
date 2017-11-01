/**
 * Created by kana
 */
import Utils from '../utils/index';
import {Toast} from 'antd-mobile';
import { hashHistory } from 'react-router';
const ajax = Utils.ajax;
const API={
  queryEnterpriseInfoByOpenId:'/enterPriseAction/queryEnterpriseInfoByOpenId.do',
  save:'/enterPriseAction/enterpriseInfoQrCode.do',
  delete:'/enterPriseAction/deleteEnterpriseUserInfo.do',
  associateUrl:'/enterPriseAction/associate.do',

};
const  invoiceAction={
  //发票抬头
  queryEnterpriseInfoByOpenId(payload, {setState, getState}){
    ajax({
      url: window.INVOICE_API+API.queryEnterpriseInfoByOpenId,
      data:{
        openId:payload.openId,
      },
      method: 'post',
      type: 'json',
    }).then(resp => {
      if (resp.status == 'S') {
       let  invoiceData = resp.data;
        setState({
          invoice:invoiceData,
        });
        if(invoiceData.codeUrl == "" || invoiceData.codeUrl == null || invoiceData.codeUrl == undefined){
          hashHistory.push('/invoiceHeader');
        }else{
          hashHistory.push('/invoiceDetail');
        }

      }
    })
  },

  //删除发票抬头
  deleteInvoice(payload,{setState,getState}){
    ajax({
      url: window.INVOICE_API+API.delete,
      data:{
        openId:payload.openId,
      },
      method: 'post',
      type: 'json',
    }).then(resp => {
      if (resp.status == 'S') {
        Toast.info('删除成功',1,()=>{
          hashHistory.push("/invoiceHeader");
        });
      }else{
        Toast.info(resp.msg,2);
      }
    })
  },

  //保存企业信息并生成二维码
  saveInvoice(payLoad,{setState,getState}){
      ajax({
        url: window.INVOICE_API+API.save,
        data:{
           openId: payLoad.openId,
          custName:payLoad.custName,
          custTaxNo:payLoad.custTaxNo,
          custAdress:payLoad.custAdress,
          mobile:payLoad.mobile,
          custBank:payLoad.custBank,
          custBankAccount:payLoad.custBankAccount,
        },
        method: 'post',
        type: 'json',
      }).then(resp => {
        if (resp.status == 'S') {
          let data = resp.data;
          setState({
            invoice:data,
          });
          hashHistory.push("/invoiceDetail");
        }
      })
  },
  //联想接口
  searchAssociate(name,{setState,getState}){
     ajax({
       url:window.INVOICE_API+API.associateUrl,
       type:'JSON',
       data:{
         custName:name,
       },
       method:'post',
     }).then(resp =>{
       if(resp.status == 'S'){
         setState({
           dataList:resp.data,
           dataFlag:true
         });
       }
     })
  },
};
export  default invoiceAction;
