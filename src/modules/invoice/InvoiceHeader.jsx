import React, {Component}from 'react';
import './css/invoiceHeader.less';
import InvoiceList from './InvoiceList';
import  {Button, Toast} from 'antd-mobile';
import {createActionContainer} from 'Roof'
import invoiceAction from '../../actions/invoice';
class InvoiceHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabA: false,
      tabB: true,
      displayType: true,
    }
  }

  onchangeTabA = ()=> {
    this.setState({
      tabA: true,
      tabB: false,
      displayType: false,
    })
  };
  onchangeTabB = ()=> {
    this.setState({
      tabA: false,
      tabB: true,
      displayType: true,
    })
  };
  save = ()=> {
    var custName = this.props.invoice.custName;
    var custTaxNo = this.props.invoice.custTaxNo;
    var custAdress = this.props.invoice.custAdress;
    var mobile = this.props.invoice.mobile;
    var custBank = this.props.invoice.custBank;
    var custBankAccount = this.props.invoice.custBankAccount;
    var regName = /^[^*&%$#~<>/\\"]*$/;
    var texreg = /^([0-9a-zA-Z]{15}|[0-9a-zA-Z]{18}|[0-9a-zA-Z]{20})$/;
    var reg = /^(\d{12}|\d{15}|\d{16}|\d{17}|\d{19}|\d{21})$/;

    if (this.state.tabA) {
      if (custName == undefined || custName == null || custName == '') {
        Toast.info('请输入名称', 1);
        return;
      }
      if (custName != undefined && custName != null && custName != "") {
        if (!regName.test(custName)) {
          Toast.info('请输入正确的名称，名称不包含[ * & % $ # ~ < > /\\]', 1);
          return;
        }
      }
      this.props.setStoreState({
        invoice: {
          custAdress: '',
          custBank: '',
          custBankAccount: '',//开户行账号
          custTaxNo: '',//识别号、税号
          mobile: '',//联系电话
        }
      });
    }
    if (this.state.tabB) {
      if (custName == undefined || custName == null || custName == '') {
        Toast.info('请输入单位名称', 1);
        return;
      }
      if (custName != undefined && custName != null && custName != "") {
        if (!regName.test(custName)) {
          Toast.info('请输入正确的单位名称，名称不包含[ * & % $ # ~ < > /\\]', 1);
          return;
        }
      }

      if (custTaxNo == undefined || custTaxNo == null || custTaxNo == '') {
        Toast.info('请输入纳税人识别号', 1);
        return;
      }
      if (custTaxNo != undefined && custTaxNo != null && custTaxNo != "") {
        if (!regName.test(custTaxNo)) {
          Toast.info('请输入正确的纳税人识别号，名称不包含[ * & % $ # ~ < > /\\]', 1);
          return;
        }
        if (!texreg.test(custTaxNo)) {
          Toast.info('请输入正确的纳税人识别号，识别号长度不正确', 1);
          return;
        }
      }

      if (custAdress != undefined && custAdress != null && custAdress != '') {
        if (!regName.test(custAdress)) {
          Toast.info('请输入正确的企业注册地址，地址不包含[ * & % $ # ~ < > /\\]', 1);
          return;
        }
      }
      if (mobile != undefined && mobile != null && mobile != '') {
        let mobileReg = /^((0\d{2,3}-\d{7,8})|(0\d{2,3}\d{7,8})|^1\d{10})$/;
        if (!mobileReg.test(mobile)) {
          Toast.info('请输入正确的企业注册电话', 1);
          return;
        }
        if (!regName.test(mobile)) {
          Toast.info('请输入正确的企业注册电话，地址不包含[ * & % $ # ~ < > /\\]', 1);
          return;
        }
      }

      if (custBank != undefined && custBank != null && custBank != '') {
        if (!regName.test(custBank)) {
          Toast.info('请输入正确的企业开户银行，地址不包含[ * & % $ # ~ < > /\\]', 1);
          return;
        }
      }

      if (custBankAccount != undefined && custBankAccount != null && custBankAccount != '') {
        if (!regName.test(custBankAccount)) {
          Toast.info('请输入正确的企业银行账号，地址不包含[ * & % $ # ~ < > /\\]', 1);
          return;
        }
        if (!reg.test(custBankAccount)) {
          Toast.info('请输入正确的企业银行账号，账号长度不正确', 1);
          return;
        }
      }
    }

    this.props.invoiceAction.saveInvoice({
      openId: localStorage.getItem("openid"),
      custName: custName,
      custTaxNo: custTaxNo,
      custAdress: custAdress,
      mobile: mobile,
      custBank: custBank,
      custBankAccount: custBankAccount,
    })
  };


  render() {

    return (
      <div className="invoiceHeader">
        {/*<div className="tabsbg">*/}
        {/*<div className="tabs">*/}
        {/*<div onClick={this.onchangeTabA} className={this.state.tabA ? 'select' : ''}>个人</div>*/}
        {/*<div onClick={this.onchangeTabB} className={this.state.tabB ? 'select' : ''}>单位*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        <InvoiceList displayType={this.state.displayType}></InvoiceList>
        {this.state.displayType ? <div>
          <div className="tip">
            建议您将以上内容全部填写，以便开具增值税专用发票
          </div>
          <div className="warning">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAr5JREFUSA2VVs1PE1EQn5kuksbPmBihxgPU0BASL4YEE70bG+Eq3gQkCF5MvHkQ/wg5KK2a+HHwJFr0X9C7ISS0hAtoTPzCBGK7b/y9rbsshd1XX9K+2Xm/+c3Mvnnzlill6GR/t/H/DKvRIjPlibSblJiY11WpysIVyRxY4IdLG0k0vN+CTvScNMr3QHZDVb39MKGOmRvAlSSbneW5T59DfTjvcaATvZeNoRcgPhqC2pmR1i8RusalWiWOl/iDf733pjH65n/JLYeSHjGqC/5Yz0ycM8qgGbklp11O4+B2ZOyVEeURflx7a/GBA50e6DJbW8s2ilQSpg8wqZPqhTQc9mVTvM6C3fwgWpDPushh9MQrrw555dpFyHNpDvCKD5vG9n2LER0r5JDHeJpBsKb0McKwLkVykqA0plN9p8RQfdhVigEH61DEpTQYyQmCEmVMvTEiEIoJmBY17zggtwNrrIaKHpPm4aSNoWf0ztmDdOi4b9bW+towwIHXPE4p52wVu0ZQvt83B+jH5rZN34VvrnPOQ8m52f+x+YbzGdHf7ZEDhdIUVFBio2olQso9hvh0qz7xmXXDU+UVuOpPBO1euIuozG5V8hMa74rYlpsM2VnB4fqpLNN4n1NoB992VpIlVqpI0M9ty3UN5VdeqfoUJ/k5oM9ccATUEO54LcFlwfTIZUBsBvX2+axOnutAFs6DhldZ4vLyerPZ2QvG8LKrTSOqr6g6Hw660gIK7oZstmAvoKDZ8fzqF2G+Cm9+miECOOEkt+06Q6Ph7Rb1fi5V35PIjMtJWgD2LiDlWzxfWwxxwSsKH+ys4/lLxpiXiPRYXO+SbZXhUI1yufoujo0yCJU2E+mUAgwe4FcP9UkzMA385kS00EpubfZkECeyXxfY0StIu4iatp8t6Ft24LOFqYp5MSNmwe5hU7/3/y/FEg0cND4AtQAAAABJRU5ErkJggg=="/>
            <span>
                    提示：（国家税务总局公告2017年第16号）规定，在“购买方纳税人识别号”栏填写购买方的纳税人识别号或统一社会信用代码。不符合规定的发票，不得作为税收凭证。
                    </span>
          </div>
        </div> : ''}

        <Button className="btn" onClick={this.save}>生成开票二维码</Button>
      </div>
    )
  }
}
export default createActionContainer({
  invoice: 'invoice'
}, {
  invoiceAction
})(InvoiceHeader);
