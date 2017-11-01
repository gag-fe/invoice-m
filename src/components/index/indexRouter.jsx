import React from 'react';
import {createContainer, createRootContainer} from 'Roof';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
//开发票
import Invoice from '../../modules/invoice/Invoice';
import InvoiceHeader from '../../modules/invoice/InvoiceHeader';
import InvoiceDetail from  '../../modules/invoice/InvoiceDetail';

const IndexRouter = React.createClass({

  render(){
    return (
      <Router history={hashHistory}>
        <Route path="/">
          <Route path="invoice" component={Invoice} />
          <Route path="invoiceHeader" component={InvoiceHeader} />
          <Route path="invoiceDetail" component={InvoiceDetail} />
        </Route>
      </Router>)
  }
});

export default createRootContainer({
  invoice:{
    custAdress: '',
    custBank: '',
    custBankAccount: '',//开户行账号
    custName: '',//发票抬头、发票信息
    custTaxNo:'',//识别号、税号
    mobile: '',//联系电话
    codeUrl:''
  },
  //联想
  dataList:[],
  dataFlag:false,
})(IndexRouter);
