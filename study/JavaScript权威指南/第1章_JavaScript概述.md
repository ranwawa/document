## 学习背景
2年前读这本书的时候,还是用的马克飞象,当时为了要一个好看的笔记格式,还专门花钱买了个马克飞象的会员.呵呵呵呵,现在就不会花这个冤枉钱了,不过也好在马克飞象漂亮的格式,让我那它那里开始用起了`markdown`语法写文档,从此就养成了这样一个习惯.

一个奇怪的问题,今年在公司和一个同事交换书看,我用我的犀牛书换他的鲑鱼书,后来他离职了,再后来我书看完想要和他换回来,就用微信给他发消息,可是,可是显示的结果却是不是好友无法发送消息...请问有这个必要么~或许很多人都有洁癖吧,只保留当时自己觉得有必要的东西,其他的一概都不要.而在他朋友圈的我,就成了一个多余的东西了.但是你在删除的那个时候,就没想起来还有两本书在我这里么?其实一本书倒没什么,主要这本书是我之前做划了很多笔记的书啊,是一本和我交流过产生过感情的书啊,虽然当时的笔记做得很搞笑,很多地方没把握住重点,但我就是想要把这种当时的我的状态保存下来的书啊.直到最近复习的JavaScript的时候,又不得不去重新买了一本第6版,新书太贵,就买了本盗版.又重新开始吧

所有的笔记都是照片以前的,不改动内容和结构,只对当时的一些疑问进行回答.
##1. JavaScript语言核心

Netspace:创立
Oracle:商标所有
ECMA:标准维护
ECMAScript:标准代号
host enviroment:宿主环境
JavaScript解释器:浏览器都会内置
Web控制台:
Firebug:
控制台API:
expression:表达式,只产生值
operator:运算符
statement:语句
control structure:控制结构
method:方法
构造函数:首字母大写

##2. 客户端JavaScript

event handler:事件处理程序

**贷款计算器**
```htmlbars
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Loan Calculate</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div id="top">
        <div id="left">
            <p class="title">Enter loan data</p>
            <div><label for="">Amount of the loan</label><input type="text" name="" id="amount"></div>
            <div><label for="">Annual Interest</label><input type="text" name="" id="apr"></div>
            <div><label for="">Repayment period(years)</label><input type="text" name="" id="years"></div>
            <div><label for="">Zipcode(to find lenders)</label><input type="text" name="" id="zipcode"></div>
            <div><label for="" id="5">Approximate Payments</label><button onclick="calculate()">Calculate</button></div>
            <div><span>Monthly payment</span><span class="result" id="payment"></span></div>
            <div><span>Total payment</span><span class="result" id="total"></span></div>
            <div><span>Total interest</span><p class="result" id="totalInterest"></p></div>
        </div>
        <div id="right">
            <p class="title">Loan Balance,Cumulative Equity,and Interest Payments</p>
            <canvas id="graph" width="400" height="200"></canvas>
        </div>
    </div>
    <div id="buttom"><strong>Sponsors:</strong><span>Apply for your loan with one of these fine lenders</span></div>
</body>
<script src="index.js"></script>
</html>
```
```css
html,body,div,p,ul,li{
    margin: 0;padding: 0;font-size: 14px;
}
#top{
    display: flex;
}
#top>div{
    flex-grow:1;
    padding: 10px;
}
.title{
    font-weight:700;
    text-align: center;
}
#left>div{
    display: flex;
    justify-content:space-between;
    margin-top: 5px;
}
#buttom {
    margin: 20px;
    text-align: center;
}
canvas{
    border:1px solid #888;
}
```
```javascript
function ele(id) {
    return document.getElementById(id);
}

function calculate() {
    var amount = ele('amount');
    var apr = ele('apr');
    var years = ele('years');
    var zipcode = ele('zipcode');
    var payment = ele('payment');
    var total = ele('total');
    var totalinterest = ele('totalInterest');

    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;
    //计算每月支付的钱,这个公式怎么来的,还要学习学习呀
    var x = Math.pow(1 + interest, payments);
    var monthly = (principal * x * interest) / (x - 1);

    if (isFinite(monthly)) {
        //输出计算结果
        payment.textContent = monthly.toFixed(2);
        total.textContent = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

        //保存数据
        if (window.localStorage) {
            localStorage.loan_amount = principal;
            localStorage.loan_interest = interest * 100 * 12;
            localStorage.loan_payment = payments / 12;
            localStorage.loan_zipcode = zipcode.value;
        }

        //获取贷款公司信息

        //输出图表
        var graph = document.getElementById('graph');
        if (graph.getContext) {
            var ctx = graph.getContext('2d');
            var width = graph.width;
            var height = graph.height;

            //将月份转换成x轴上的坐标
            function paymentToX(n) {
                return n / payments * width;
            }
            //将金额转换成y轴坐标
            function amountToY(a) {
                return height - (a * height / (payments * monthly));
            }
            //付款详情
            ctx.clearRect(0, 0, 400, 200)
            ctx.beginPath();
            ctx.moveTo(paymentToX(0), amountToY(0));
            ctx.lineTo(width, height);
            ctx.lineTo(width, 0);
            ctx.closePath();
            ctx.fillStyle = '#f88';
            ctx.fill();
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText('Total Amount', 20, 20);
            //资产详情
            var equity = 0;
            ctx.beginPath();
            ctx.moveTo(paymentToX(0), amountToY(0));
            for (var p = 1; p <= payments; p++) {
                var thisMonthsInterest = (principal - equity) * interest;
                equity += (monthly - thisMonthsInterest);
                ctx.lineTo(paymentToX(p), amountToY(equity));
            }
            ctx.lineTo(paymentToX(payments), amountToY(0));
            ctx.closePath();
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.fillText('Total Equity', 20, 35);

            //待付详情
            var bal = principal;
            ctx.beginPath();
            ctx.moveTo(paymentToX(0), amountToY(bal));
            for (var b = 1; b <= payments; b++) {
                var thisMonthsInterest = bal * interest;
                bal -= (monthly - thisMonthsInterest);
                ctx.lineTo(paymentToX(b), amountToY(bal));
            }
            ctx.lineWidth = 3;
            ctx.fillStyle = 'black';
            ctx.stroke();
            ctx.fillText('Loan Balance', 20, 50);

            //X轴年份标记
            ctx.textAlign = 'center';
            var y = amountToY(0);
            for (var year = 1; year <= years.value; year++) {
                ctx.fillRect(paymentToX(year * 12) - 0.5, y - 3, 1, 3);
                if (year == 1) {
                    ctx.fillText('year', paymentToX(year * 12), y - 5);
                }
                if (year % 5 == 0) {
                    ctx.fillText(year, paymentToX(year * 12), y - 5);
                }
            }

            //y轴资金标记
            ctx.textAlign = 'right';
            var ticks = [monthly * payments, principal];
            var rightEdge = paymentToX(payments);
            for (var i = 0; i < ticks.length; i++) {
                var y = amountToY(ticks[i]);
                ctx.fillRect(rightEdge - 3, y - 0.5, 3, 1);
                ctx.fillText(String(ticks[i].toFixed(0)), rightEdge - 5, y + 10);
            }
        }

    } else {
        payment.textContent = '';
        total.textContent = '';
        totalinterest.innerinnerHTML = '';
    }
}
//初始化数据
window.onload = function () {
    if (window.localStorage) {
        document.getElementById('amount').value = localStorage.loan_amount;
        document.getElementById('apr').value = localStorage.loan_interest;
        document.getElementById('years').value = localStorage.loan_payment;
        document.getElementById('zipcode').value = localStorage.loan_zipcode;
    }
}
```