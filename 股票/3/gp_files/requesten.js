var istop = 0;

function active_Form(parmstr, successfun) {
    $.get(
        "https://zyapi.qktz.com.cn/api/user/senduserzt?callback=?",
        parmstr,
        qktzCallBack,
        "jsonp"
    );

    qktzCallBack = function(data) {
        successfun(data);
    };
}
function proving(mobilePhone) {
            //alert($('#code').val());
    if (window.location.hash != "#test") {
        // var reg = new RegExp("^(13[0-9]|15[012356789]|16[69]|17[012678]|19[89]|18[0-9]|14[57])[0-9]{8}$");
        var reg = new RegExp("^(1[3-9][0-9])[0-9]{8}$");
        if (!reg.test(mobilePhone)) {
            alert("请输入正确的手机号码！");
        }
    } else {
        var reg = new RegExp("^(1[3-9][0-9])[0-9]{8}$");
        if (!reg.test(mobilePhone)) {
            alert("请输入正确的手机号码！");
        } else {
            /*location.href =
                "http://zy1.dyrt99.com/template/cjs/cjs201807/cjs072601/index.html";
            return;*/
        }
    }
}

function qktz_Form(parmstr, successfun) {
    
    console.log("parmstr.MobilePhone");
    
    // 2018.7.26 周珊珊注释  start
    var reg = new RegExp("^(1[3-9][0-9])[0-9]{8}$");
    if (!reg.test(parmstr.MobilePhone)) {
        alert("请输入正确的手机号码！");

        setTimeout(function() {
            $("#mobilePhone").select();
        }, 50);
        return;
    }
    // 2018.7.26 周珊珊注释 end

    // qktzCallBack = function(data){
    //     istop=0
    //     var parmstr2 = {
    //         MobilePhone:parmstr.MobilePhone,
    //         com_id:2,
    //         sid:parmstr.SourceType
    //     }
    //     impCallBack = function(data){
    //         data.error = data.Message;
    //         if(data.Code==0){
    //             data.code = 1;
    //         }else{
    //             data.code = 0;
    //         }
    //         successfun(data)
    //     }
    //     $.post("https://zyapi.qktz.com.cn/api/user-ip/index?callback=?",parmstr2, impCallBack,'jsonp');
    // }
    // if(istop==0){
    //     istop=1
    //     $.post("https://zyapi.qktz.com.cn/api/user/index?callback=?",parmstr,qktzCallBack ,'jsonp');
    // }
    var param ={
        sid : parmstr.SourceType,
        refferId:parmstr.reffer
    }
    qktzCallBack = function(data) {
        istop = 0;
        
        if(data.code)
            zyhit(param);
        successfun(data);
    };
    if (istop == 0) {
        istop = 1;
        setTimeout(function() {
            istop = 0;
        }, 2000);
        
         //if(parmstr && systemConf.pid && systemConf.key){
         //    if(parmstr.MobilePhone){
         //        parmstr.Md5_t=hex_md5(hex_md5(parmstr.MobilePhone)+"qktz2017");
         //        parmstr.MobilePhone = encryption(systemConf.key.replace(/\r\n/g, ""),parmstr.MobilePhone);
         //        parmstr.objectID = systemConf.pid;
         //    }
         //}
        
        var title = GetQueryString("title");
        if(title)
        {
            if(!parmstr.Title)
                parmstr.Title="";
            parmstr.Title+="-"+title;
        }
        
        $.post(
            "https://zyapi.qktz.com.cn/api/user/index?callback=?",
            parmstr,
            qktzCallBack,
            "jsonp"
        );
    }
    
    
    
    function zyhit(parm){
        $.post(
            "https://zyapi.qktz.com.cn/api/ip/zyhit?callback=?",
            parm,
            zyBack,
            "jsonp"
        );
    }
    
    zyBack=function(res){
                
            }
    
    //jQuery.support.cors = true;
    // $.ajax({
    //     type: "POST",
    //     url: "https://zyapi.qktz.com.cn/api/user/index",
    //     //url: "http://10.9.2.174:86/api/user/index",
    //     data: parmstr,
    //     dataType: "json",
    //     ContentType: "application/json",
    //     // beforeSend: function (XMLHttpRequest) {
    //     //     XMLHttpRequest.setRequestHeader("Content-Company", "b2bfdca842fda4966abf54879c7519d8");
    //     // },
    //     success: successfun,
    //     error:function(ex){
    //         console.log(ex);
    //     }
    // });

    // var datapa={
    //     sourceType:parmstr.SourceType,
    //     bb:65,
    //     reffer:parmstr.reffer,
    //     bz:parmstr.bz,
    //     MobilePhone:parmstr.MobilePhone,
    //     Title:parmstr.Title,
    //     stockCode:parmstr.stockCode,
    //     toPageURL:'',
    //     knownChannel:2,

    // }
    // $.post("http://www.qktz.com.cn/bd2017/GGFastReg_url2.asp?callback=?",datapa, successfun,'jsonp');
}
function qktzCallBack(data) {
    //successfun(data);
    alert(data);
}

function CallBack(data) {
    alert(data);
}
//验证股票代码或名称是否正确
function checkCode(code) {
    if (code) {
        code = code.toUpperCase();
        var codetype = 0; //-1错误,0=数字股票代码，1=加市场股票代码,2=股票名称（简写）
        var reg = new RegExp("^[0346][0-9]{5}$");
        var reg2 = /^S[\H\Z]\d{6}$/i; //^(?i)s[hz][0346][0-9]{5}$/"
        var han = /^[\u4e00-\u9fa5]+$/;
        if (reg.test(code)) {
            codetype = 1;
            if (code[0] == "6") {
                code = code;
                //  code = "SH" + code;
            } else {
                code = code;
                //  code = "SZ" + code;
            }
        } else if (reg2.test(code)) {
            codetype = 1;
        } else {
            codetype = 2;
            if (escape(code).indexOf("%u") == -1) {
                //!han.test(code)){
                codetype = -1;
            }
        }

        if (codetype > 0) {
            var istrue = 0;
            var jsonData = objdata;
            if (jsonData) {
                if ("undefined" != typeof jsonData.Data && jsonData.Data) {
                    if (
                        "undefined" !=
                            typeof jsonData.Data.RepDataCodeZqdmssOutput &&
                        jsonData.Data.RepDataCodeZqdmssOutput
                    ) {
                        $.each(jsonData.Data.RepDataCodeZqdmssOutput, function(
                            index,
                            elm
                        ) {
                            if (codetype == 1) {
                                if (elm.Obj == code) {
                                    istrue++;
                                }
                            } else {
                                if (elm.StockName == code) {
                                    istrue++;
                                }
                            }
                        });
                    }
                }
            }

            if (istrue) {
                return true;
            }
        }
    }
    return false;
}
//获取参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

try {
    if(fieldJson && fieldJson.length>0 && fieldJson[0].title && fieldJson[0].title!='logo'){
        window.document.title = fieldJson[0].title;
    }
}
catch(err){
    console.log(err)
}
