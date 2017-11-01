import React, {Component}from 'react';
import {createActionContainer} from 'Roof'
import invoiceAction from '../../actions/invoice';
import './css/invoiceDetail.less';
import {List, InputItem, Checkbox, Radio, Button, Toast} from 'antd-mobile';
import {hashHistory} from 'react-router';
import Jquery from 'jquery';
const er=require('../../img/erweima@1x.png');

class InvoiceDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            type: false,
        }
    }
    edit =()=>{
        hashHistory.push('/invoiceHeader');
    };
    componentWillMount(){
      let imag = new Image();
      imag.src = this.props.invoice.codeUrl;
    }
    deleteInvoice =()=>{
      this.props.setStoreState({
        invoice:{
          custAdress: '',
          custBank: '',
          custBankAccount: '',//开户行账号
          custName: '',//发票抬头、发票信息
          custTaxNo:'',//识别号、税号
          mobile: '',//联系电话
        }
      });
      this.props.invoiceAction.deleteInvoice({openId:localStorage.getItem("openid"),});
        hashHistory.push('/invoiceHeader');
    };
    render(){
        return(
            <div className="detail">
                <div className="header">
                    <img src={this.props.invoice.codeUrl}/>
                </div>
                    <div className="tabs">
                      {localStorage.getItem("openid") ?<div onClick={this.deleteInvoice}>删除</div> :<div className="nodel">删除</div>}

                        <div onClick={this.edit}>编辑</div>
                    </div>

                <div className="headerList">
                    <List>
                        <InputItem
                            value={this.props.invoice.custName}
                            name="custName"
                            editable={this.state.type}
                        >{this.props.invoice.custTaxNo ?'单位名称' :'名称'}</InputItem>
                        {
                            this.props.invoice.custTaxNo ? <InputItem
                                value={this.props.invoice.custTaxNo}
                                name="custTaxNo"
                                editable={this.state.type}
                            >纳税人识别号</InputItem> :''
                        }
                        {
                            this.props.invoice.custAdress ?<InputItem
                                value={this.props.invoice.custAdress}
                                name="custAdress"
                                editable={this.state.type}
                            >企业注册地址</InputItem> : ''
                        }
                        {
                            this.props.invoice.mobile?  <InputItem
                                value={this.props.invoice.mobile}
                                name="mobile"
                                editable={this.state.type}
                            >企业注册电话</InputItem>:''
                        }
                        {
                            this.props.invoice.custBank? <InputItem
                                value={this.props.invoice.custBank}
                                name="custBank"
                                editable={this.state.type}
                            >企业开户银行</InputItem>:''
                        }
                        {
                            this.props.invoice.custBankAccount?
                                <InputItem
                                    value={this.props.invoice.custBankAccount}
                                    name="custBankAccount"
                                    editable={this.state.type}
                                >企业银行账号</InputItem>:''
                        }

                    </List>
                </div>

            </div>
        )

    }
}
export  default createActionContainer({
    invoice:'invoice'

},{
    invoiceAction
})(InvoiceDetail)
