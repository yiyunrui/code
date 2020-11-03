(function (doc, win) {
    var docEl = doc.documentElement;
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                ballWidth = 100;
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

var tzURL = '';
var djTime = 0;
var sid = 0,
    sidTitle = 0,
    refferTitle = 0,
    reffer = 0;
var URL = "https://lg.re-media.cn";
var stockCode = '',
    tjCode = null,
    thePhone = '';

//股票适配
var stockmatch = function (obj) {
    $("html").click(function () {
        $(".stockmatch").remove();
    })

    $(obj).keyup(function () {
        var stock = $(this).val()
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://cdhq.zqf.com.cn/v4f/Api/code/zqdmss?tv=10,15&mc=SH,SZ&start=0&count=5&output=json&sstr=" + stock,
            success: function (res) {
                $(".stockmatch").remove();
                res = res.Data.RepDataCodeZqdmssOutput;
                theVal = function (stockCode) {
                    $(obj).val(stockCode);
                    $(".stockmatch").remove();
                    return false
                }
                var html = '<li><span>股票代码</span><span>股票名称</span></li>';
                $(res).each(function () {
                    html += '<li onclick="theVal(' + "'" + $(this)[0].StockCode + "'" + ')"><span>' + $(this)[0].StockCode + "</span><span>" + $(this)[0].StockName + "</span></li>"
                });
                $(obj).after('<div class="stockmatch" style="position: absolute; top:' + ($(obj).position().top + $(obj).outerHeight()) + 'px;left:' + $(obj).position().left + 'px;width:' + $(obj).outerWidth() + 'px"><ul>' + html + '</ul></div>')
            }
        });
    })

}

//股票代码验证
var isStock = function (stock, callback) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://cdhq.zqf.com.cn/v4f/Api/code/zqdmss?tv=10,15&mc=SH,SZ&start=0&count=5&output=json&sstr=" + stock,
        success: function (res) {
            res = res.Data.RepDataCodeZqdmssOutput;
            if (res.length == 1) {
                callback(res[0])
            } else {
                alert("请输入正确的股票代码！")
                return;
            }

        }
    });
}

//股票行情
var stockMarket = function (stock) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "https://cdhq.zqf.com.cn/v4/Api/stkdata?obj=" + stock.Obj + "&output=json",
        success: function (res) {
            res = res.Data.RepDataStkData[0]
            //涨跌
            if (res.ZuiXinJia < res.ZuoShou) {
                $("#sszd").addClass("die").removeClass("zhang")
            } else {
                $("#sszd").addClass("zhang").removeClass("die")
            }
            stockCode = stock.StockCode;
            //行情插入
            $(".code").text("(" + res.Obj.substr(2, 8) + ")"); //代码
            $(".name").text(res.ZhongWenJianCheng); //名称

            $(".xianjia").text((res.ZuiXinJia / 10000).toFixed(2)); //现价
            $(".zhangdie").text(res.ZhangDie ? (res.ZhangDie / 10000).toFixed(2) : "0.00"); //涨跌金额
            $(".zhangfu").text(res.ZhangFu ? res.ZhangFu / 100 + "%" : "0.00%"); //涨跌比例

            $(".jinkai").text((res.KaiPanJia / 10000).toFixed(2)); //今开
            $(".zuigao").text((res.ZuiGaoJia / 10000).toFixed(2)); //最高
            $(".huanshou").text(res.HuanShou / 100 + "%"); //换手
            $(".chengjiaoliang").text((res.ChengJiaoLiang / 1000000).toFixed(2) + "万"); //成交量
            $(".zuoshou").text((res.ZuoShou / 10000).toFixed(2)); //昨收
            $(".zuidi").text((res.ZuiDiJia / 10000).toFixed(2)); //最低
            if (res.ZhenFu) {
                $(".zhenfu").text(res.ZhenFu / 100 + "%"); //振幅
            } else {
                $(".zhenfu").text("0.00%"); //振幅
            }

            $(".chengjiaoe").text((res.ChengJiaoE / 100000000).toFixed(2) + "亿"); //成交额

        }
    });
}
$(function () {
    //股票适配
    stockmatch($("#code"))
    //时间
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
        if (ww > 0 && ww < 7) colorhead = "</font>";
        str = colorhead + yy + "/" + MM + "/" + dd + " &nbsp&nbsp" + hh + ":" + mm + ":" + ss + " ";
        return (str);
    }
    setInterval(function () {
        var today;
        today = new Date();
        $(".time").html(showLocale(today))
    }, 1000)

    //搜索	
    $(".seach,.btn").click(function () {
        isStock($("#code").val(), function (stock) {
            stockCode = stock;
            stockMarket(stock)
            setTimeout(function () {
                guodu()
            }, 1000)
        })
    })
    //预测过渡
    function guodu() {
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: true,
            skin: 'layui-layer-nobg',
            shade: 0.8,
            area: ['auto', 'auto'],
            content: $(".mnc")
        })

        $(".mnc .tiao").width(0), $(".mnc .tiao").animate({
            width: "25%"
        }, 500, "", function () {
            $(".mnc .txt").html("\u6b63\u5728\u901a\u8fc7\u6700\u5c0f\u4e8c\u4e58\u6cd5OLS\u786e\u5b9a\u5fc5\u8981\u62a5\u916c\u7387...")
        }), $(".mnc .tiao").animate({
            width: "50%"
        }, 500, "", function () {
            $(".mnc .txt").html("\u6b63\u5728\u901a\u8fc7VAR\u7cfb\u7edf\u786e\u8ba4\u98ce\u9669\u503c...")
        }), $(".mnc .tiao").animate({
            width: "75%"
        }, 500, "", function () {
            $(".mnc .txt").html("\u6b63\u5728\u901a\u8fc7\u91cf\u4ef7\u4ea4\u6613\u6a21\u578b...")
        }), $(".mnc .tiao").animate({
            width: "100%"
        }, 500, function () {
            layer.closeAll()
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shadeClose: true,
                skin: 'layui-layer-nobg',
                shade: 0.8,
                area: ['auto', 'auto'],
                content: $(".pop.subbox")
            })
        })
    }

    //提交
    if ("undefined" != typeof systemConf) {
        sid = systemConf.sid;
        reffer = systemConf.reffer;
        refferTitle = systemConf.refferTitle;
        sidTitle = systemConf.sidTitle;
    }

    $(".close").click(function () {
        layer.closeAll()
    })

});

/*判断字符是否为空*/
function IsNull(values) {
    if (values == undefined || values == 'undefined') {
        return true;
    }
    return values.replace(/^\s*|\s*$/g, '').length == 0;
}

let urls = '218dy001'

let reg = /^1[3456789]\d{9}$/;
var referer = window.location.href;
$('.sub').click(function () {
    let tel = $('#mobilePhone').val();
    if (tel == '') {
        alert('手机号不能为空')
        return false
    } else {
        var reg = /^1[3456789]\d{9}$/
        if (!reg.test(tel)) {
            alert('手机号格式不正确')
            return false
        }
    }
    $.post('https://255.data.bj4066.com//save.php', { tel: tel, url: urls, referer: referer }, function (data) {
        if (data == '1') {
            alert('提交成功！稍后会有客服进行指导！') ；
            window._agl && window._agl.push(['track', ['success', { t: 3 }]])
        } else {
            alert('网络繁忙请稍后再试。')
        }
    });
})