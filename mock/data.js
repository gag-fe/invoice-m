const Qs = require('qs');
const Mock = require('mockjs');
// 数据持久

var movie = {
    'id|+1': 1,
    'name': '@Name',
};

var name = {
    'id|+1': 1,
    'first': '@FIRST',
    'last': '@LAST',
};

module.exports = {
    // Forward 到另一个服务器
    'GET https://assets.daily/!*': 'https://assets.online/',

    // Forward 到另一个服务器，并指定路径
    'GET https://assets.daily/!*': 'https://assets.online/v2/',

    // Forward 到另一个服务器，不指定来源服务器
    'GET /assets/!*': 'https://assets.online/',

    // Forward 到另一个服务器，并指定子路径
    // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
    'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',

    // 本地文件替换
    'GET /local': './local.js',

    // Mock 数据返回
    'GET /users': [{name: 'sorrycc'}, {name: 'pigcan'}],
    'GET /users/1': {name: 'jaredleechn'},

    //发票抬头
    'POST /enterPriseAction/queryEnterpriseInfoByOpenId.do'(req, res)
    {
        var postData = Qs.parse(req.body);
        var returnData = {
            status: 'S',
            msg: "操作成功",
            data: {
                custName: "ABB(中有限公司",
                custTaxNo: 91330109691715725,
                custAdress: "中国北京市朝阳区酒仙桥路10号恒通广厦",
                mobile: "010-8456668",
                custBank: "汇丰银行(中国)有限公司北京分",
                custBankAccount: 626002257003,
                codeUrl:''
            }

        };
        res.json(Mock.mock(returnData));
    },
    'POST /enterPriseAction/enterpriseInfoQrCode.do'(req, res){
        var postData = Qs.parse(req.body);
        var openId = postData.openId;
        var custName = postData.custName;
        var custTaxNo = postData.custTaxNo;
        var mobile = postData.mobile;
        var custAdress = postData.custAdress;
        var custBank = postData.custBank;
        var custBankAccount = postData.custBankAccount;
        var returnData = {
            status: 'S',
            msg: "操作成功",
            data: {
                custName: custName,
                custTaxNo: custTaxNo,
                custAdress:custAdress,
                mobile: mobile,
                custBank: custBank,
                custBankAccount: custBankAccount,
                codeUrl:'../../img/erweima@1x.png',
            }

        };
        res.json(Mock.mock(returnData));
    },
    //查询企业信息
    'POST /enterPriseAction/associate.do'(req, res){
        var postData = Qs.parse(req.body);
        var custName = postData.custName;
        var returnData = {
            status: "S",
            msg: '操作成功',
            custName: custName,
            data: [{
                "id|+1": 1,
                "custName": "北京数衍科技有限公司", //发票抬头、发票信息
                "mobile": "18911159627",  //手机号、联系电话
                "custTaxNo": "124t646757",  //识别号、税号
                "custAdress": "北京市朝阳区望京科技创业园",  //付款方地址、注册地址
                "custBank": "招商银行",//付款方银行、开户行
                "custBankAccount": "1246547586798798798",   //开户行账号
            },
                {
                    "id|+1": 1,
                    "custName": "2北京数衍科技有限公司", //发票抬头、发票信息
                    "mobile": "18911159627",  //手机号、联系电话
                    "custTaxNo": "124t646757",  //识别号、税号
                    "custAdress": "北京市朝阳区望京科技创业园",  //付款方地址、注册地址
                    "custBank": "招商银行",//付款方银行、开户行
                    "custBankAccount": "1246547586798798798",   //开户行账号
                }
            ]
        };

        res.json(Mock.mock(returnData));
    },





};
