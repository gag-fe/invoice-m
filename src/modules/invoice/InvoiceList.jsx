import React, {Component} from 'react';
import {List, InputItem, Checkbox, Radio, Button, Toast} from 'antd-mobile';
import {createActionContainer} from 'Roof'
import './css/invoiceList.less';
import invoiceAction from '../../actions/invoice';
class InvoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: true,
        }
    }

    componentWillMount() {
        this.props.setStoreState({
            dataList: [],
        })
    }

    //监听inputName 变化
    _inputChangeName=(name, event)=> {
        let obj = {};
        obj[name] = event;
        var myReg = /^[\u4e00-\u9fa5]+$/;
        this.props.setStoreState({
            invoice: Object.assign({}, this.props.getStoreState().invoice, {
                custName: obj[name],
            })
        });
        if (myReg.test(obj[name])) {
            // 查询企业信息
            if (obj[name].length > 1 && this.props.invoice.custName !== obj[name]) {
                this.props.invoiceAction.searchAssociate(obj[name]);
            }else{
              this.props.setStoreState({
                dataFlag: false,
              });
            }
        }
    };
    //监听input变化
    _inputChange =(name, event)=> {
        let obj = {};
        obj[name] = event;
        this.props.setStoreState({
            invoice: Object.assign({}, this.props.getStoreState().invoice, obj)
        });
    };

    getCon=(data)=> {
        this.props.setStoreState({
            invoice: Object.assign({}, this.props.getStoreState().invoice, {
                custName: data.custName,
                custTaxNo: data.custTaxNo,//识别号、税号
                custAdress: data.custAdress,//付款方地址、注册地址
                mobile: data.mobile,//联系电话
                custBank: data.custBank,//付款方银行、开户行
                custBankAccount: data.custBankAccount,//开户行账号
            })
        });
        this.props.setStoreState({
            dataFlag: false,
        });
    };

    hide =()=> {
        this.props.setStoreState({
            dataFlag: false,
        })
    };

    show =()=> {
        this.props.setStoreState({
            dataFlag: true,
        })
    };
    render() {
        var list = [];
        if (this.props.dataList) {
            this.props.dataList.map((item, idx)=> {
                if (item.custName != '') {
                    list.push(<div className='item' key={idx} onClick={this.getCon.bind(this, item)}>
                        <span>{item.custName}</span>
                    </div>)
                }

            })
        }
        return (<div className="headerList">
            <List>
                <InputItem
                    value={this.props.invoice.custName}
                    name="custName"
                    editable={this.state.type}
                    placeholder="请输入企业或个人名称"
                    onChange={this._inputChangeName.bind(this, 'custName')}
                ><span style={{color:'#ff0000',}}>*</span>{this.props.displayType ?'单位名称' :'名称'}</InputItem>

              { list.length >0 ?<div className="append" style={{'display': this.props.dataFlag ? 'block' : 'none'}}>
                {list}
              </div> : ''}
                <div style={{display:this.props.displayType ? 'block':'none'}}>
                    <InputItem
                        value={this.props.invoice.custTaxNo}
                        name="custTaxNo"
                        editable={this.state.type}
                        placeholder="请输入纳税人识别号"
                        onChange={this._inputChange.bind(this, 'custTaxNo')}
                        onFocus={this.hide}
                    ><span style={{color:'#ff0000',}}>*</span>纳税人识别号</InputItem>
                    <InputItem
                        value={this.props.invoice.custAdress}
                        name="custAdress"
                        editable={this.state.type}
                        placeholder="请输入企业注册地址"
                        onChange={this._inputChange.bind(this, 'custAdress')}
                        onFocus={this.hide}
                    >企业注册地址</InputItem>
                    <InputItem
                        value={this.props.invoice.mobile}
                        name="mobile"
                        editable={this.state.type}
                        placeholder="请输入企业注册电话"
                        onChange={this._inputChange.bind(this, 'mobile')}
                        onFocus={this.hide}
                    >企业注册电话</InputItem>
                    <InputItem
                        value={this.props.invoice.custBank}
                        name="custBank"
                        editable={this.state.type}
                        placeholder="请输入企业开户银行名称"
                        onChange={this._inputChange.bind(this, 'custBank')}
                        onFocus={this.hide}
                    >企业开户银行</InputItem>
                    <InputItem
                        value={this.props.invoice.custBankAccount}
                        name="custBankAccount"
                        editable={this.state.type}
                        placeholder="请输入企业开户银行账号"
                        onChange={this._inputChange.bind(this, 'custBankAccount')}
                        onFocus={this.hide}
                    >企业银行账号</InputItem>
                </div>
            </List>
        </div>)
    }
}

export  default createActionContainer({
    invoice: 'invoice',
    dataList: 'dataList',
    dataFlag: 'dataFlag'
}, {
    invoiceAction
})(InvoiceList);
