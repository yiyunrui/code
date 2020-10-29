$('.in_btn1,.in_btn2').click(function (e) {
    e.preventDefault()
    let id = $(this).attr('data-id'),
        in_name = $(`.in_name${id}`).val(),
        in_phone = $(`.in_phone${id}`).val(),
        referer = window.location.href,
        url =geturl,
        reg = /^1(3|5|7|8)\d{9}$/,
        zz = /^[\u4e00-\u9fa5]{2,}$/;
    if (in_name == '') {
        alert('请填写正确信息 ')
        return false
    } else {
        if (!zz.test(in_name)) {
            alert('名字格式不正确')
            return false
        }
    }

    if (in_phone == '') {
        alert('手机号不能为空')
        return false
    } else {
        if (!reg.test(in_phone)) {
            alert('手机号格式不正确')
            return false
        }
    }
    $.post('http://255.admin.bj4066.com/wechat/formSubmit', { tel: in_phone, name: in_name, wid: url, referer: referer }, function (data) {
        if (data == '1') {
            console.log(data);
            alert('领取成功！稍后会有客服进行指导！')
        } else {
            console.log(data);
            alert('网络繁忙请稍后再试。')
        }
    });
})
