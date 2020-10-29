var gpze = /^(((002|000|300|600)[\d]{3})|60[\d]{4})/;
var detectBrowser = function (name) {
    if (navigator.userAgent.toLowerCase().indexOf(name) > -1) {
        return true;
    } else {
        return false;
    }
};
var width = parseInt(window.screen.width);
if (detectBrowser("mz-m2")) width = 360;
var scale = width / 640;
var userScalable = 'no';
if (detectBrowser("qq/")) userScalable = 'no';
$('#viewport').attr('content', 'width=640,user-scalable=' + userScalable + ',initial-scale=' + scale);

$('#sm3,.btnBg,.btnBg2,.cdbut').click(function () { window.scrollTo(0, 0); getcode() })
function getcode() {

    var gpinput = $(".gpdm").val();

    if (gpinput == "" || gpinput == "000000") {
        alert("请输入正确的股票代码")
        return;
    } else if (!gpze.test(gpinput)) {
        alert("股票代码不正确，无法诊断\n请输入6位数的股票代码，以000|002|300|600开头");
        return;
    } else {
        setTimeout(function () {
            $(".tan_div").height($("body").height());
            $(".discuss").html("正在通过事件驱动策略模型...");
            animate();
            $(".tan_div").show();
        }, 700)
    }
}
function animate() {
    $('.tan_content').show();
    $(".dialog").hide();
    $('html, body').animate({
        scrollTop: 0
    }, 100);
    $(".charts").animate({
        width: "25%"
    }, 500, "", function () {
        $(".discuss").html("正在通过最小二乘法OLS确定必要报 酬率...");
    });
    $(".charts").animate({
        width: "50%"
    }, 600, "", function () {
        $(".discuss").html("正在通过VAR系统确认风险值...");
    });
    $(".charts").animate({
        width: "75%"
    }, 700, "", function () {
        $(".discuss").html("正在通过量价交易模型...");
    });
    $(".charts").animate({
        width: "100%"
    }, 800, "", function () {
        $(".discuss").html("正在通过量价交易模型...");
        $('.charts').css('width', '0');
        $('.tan_content').hide();
        $(".dialog").show();
        $('.phonec').focus();
    });
}
function showLocale(objD) {
    var str, colorhead, colorfoot;
    var yy = objD.getYear();
    if (yy < 1900) yy = yy + 1900;
    var MM = objD.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    var dd = objD.getDate();
    if (dd < 10) dd = '0' + dd;
    var hh = objD.getHours();
    if (hh < 10) hh = '0' + hh;
    var mm = objD.getMinutes();
    if (mm < 10) mm = '0' + mm;
    var ss = objD.getSeconds();
    if (ss < 10) ss = '0' + ss;
    var ww = objD.getDay();
    if (ww == 0) colorhead = "<font>";
    if (ww > 0 && ww < 7) colorhead = "<font >";
    str = colorhead + yy + "/" + MM + "/" + dd + " &nbsp&nbsp" + hh + ":" + mm + ":" + ss + " ";
    return (str);
}
function tick() {
    var today;
    today = new Date();
    document.getElementById("new_data").innerHTML = showLocale(today);
    window.setTimeout("tick()", 1000);
}
tick();
$('.circle').on('click', function () {
    $('.tan_div').hide();

});