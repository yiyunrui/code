class Form{
    constructor(btn,name,phone,code,getCode){
        this.btn = document.getElementsByClassName(btn)[0],
        this.name = document.getElementsByClassName(name)[0],
        this.phone = document.getElementsByClassName(phone)[0],
        this.code = document.getElementsByClassName(code)[0],
        this.getCode = document.getElementsByClassName(getCode)[0],
        this.reg = /^1[3456789]\d{9}$/,
        this.zz = /^[\u4e00-\u9fa5]{2,}$/,
        this.numt = 0,
        this.timer=null,
        this.nums = 60,
        this.referer = window.location.href,
        this.url = '';
        this.address = ''
        this.init();
    }
    init(){
        this.getCode.addEventListener('click',this.sendCode.bind(this))
        this.btn.addEventListener('click',this.sendMesg.bind(this))
    }
    sendCode(){
        let namevalue = this.name.value,
        phonevalue = this.phone.value;
        console.log(namevalue,phonevalue);
        if(namevalue == "" ||　!this.zz.test(namevalue)){
            alert('请正确填写您的姓名')
        }else if(phonevalue == "" ||　!this.reg.test(phonevalue)){
            alert('请正确填写手机号')
        }else{
            if(this.numt == 0){
                sessionStorage.setItem('phonevalue',phonevalue);
                $.post(`${this.address}/src/sendSms.php`,
                { 'phone_num': sessionStorage.getItem("phonevalue") },result=>{
                    if (result.indexOf('OK') !== '-1') {
                        alert('验证码已发送！请注意查收');
                        this.numt++;
                        this.timer = setInterval( ()=> {
                            this.nums--;
                            if (this.nums <= 0) {
                                clearInterval(this.timer)
                                this.numt = 0;
                                this.nums = 60;
                            }
                        }, 1000)
                    } else {
                        alert('验证码发送失败，请稍后再试！')
                    }
                });

            }else{
                alert(`验证码已发送，请${this.nums}秒后再试！`)  
            }
        }


    }
    sendMesg(){
        let sendname = this.name.value,
        sendphone = this.phone.value,
        sendcode = this.code.value;
        if(sendname !== '' &&　sendphone !== ''){
            let sessionphone = sessionStorage.getItem('phonevalue');
            if(!this.zz.test(sendname)){
                alert('请正确输入姓名')
            }else if(sendphone !== sessionphone){
                alert('所填手机号与接收验证码手机号不符，请修改')
            }else{
                $.post(`${this.address}/src/codeTest.php`, { code: sendcode }, res=> {
                    if (res == '1') {
                        $.post('http://255.data.example001.cn/save.php', { tel: sendphone, name: sendname, url: this.url, referer: this.referer }, data=> {
                            if (data == '1') {
                                console.log(data);
                                alert('信息已提交，稍后会有专业人员与您取得联系');
                                
                            } else if (data == '2') {
                                console.log(data);
                                alert('请勿重复提交！')
                            } else {
                                console.log(data);
                                alert('网络繁忙请稍后再试。')
                            }
                        })
                    } else {
                        alert('验证码不正确！')
                        return false
                    }
                });}
            }else {
                alert('信息填写有误！请正确填写相关信息！')
            }
        }

    
    
}
new Form('in_btn','in_name','in_phone','in_code','in_getCode')