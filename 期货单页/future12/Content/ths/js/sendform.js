$(function () {
    var name
    var tel
    var referer = window.location.href;

    function ajaxform(names, phones) {
        var url = '24dy001';
        name = names.val()
        tel = phones.val()
        if (name == '') {
            alert('请填写正确信息 ')
            return false
        } else {
            var zz = /^[\u4e00-\u9fa5]{2,}$/
            if (!zz.test(name)) {
                alert('名字格式不正确')
                return false
            }
        }

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

        $.post('http://255.data.example001.cn/save.php', { tel: tel, name: name, url: url, referer: referer }, function (data) {
            if (data == '1') {
                console.log(data);
                alert('领取成功！稍后会有客服进行指导！')
            } else {
                console.log(data);
                alert('网络繁忙请稍后再试。')
            }
        });


    }
    $('#btn').click(function () {
        ajaxform($('#name'), $('#phone'), $('#email'), $('#desc'))
    })

    $('#btn1').click(function () {
        ajaxform($('#name1'), $('#phone1'), $('#email1'), $('#desc1'))
    })


    $('#btn2').click(function () {
        ajaxform($('#name2'), $('#phone2'), $('#email2'), $('#desc2'))
    })



})
