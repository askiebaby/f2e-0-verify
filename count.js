var I = {
    $: function (x) {
        if (document.getElementById(x)) return document.getElementById(x);
        return false;
    },
    base: 'https://www.thef2e.com/api/',
    ajax: function (method, params, input) {
        var base = I.base + params,
            x = new XMLHttpRequest();
        x.open(method, base, true);
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        x.onreadystatechange = function () {
            if (x.readyState == 4 && x.status == 200) {
                var data = JSON.parse(x.responseText);
                if (method === 'POST') {
                    I.response.post(data);
                } else {
                    I.response.get(data);
                }
            }
        };
        if (method === 'POST') input = input.value;
        x.send(encodeURI('email=' + input));
        x.onload = function () {
            var callbacks = JSON.parse(x.responseText);
        };
    },
    response: {
        get: function (data) {
            I.$('total').innerHTML = data.total;
        },
        post: function (data) {
            var success = data.success,
                msg = data.message,
                name = data.nickName,
                time = moment(data.timeStamp).format("YYYY-MM-DD HH:mm");

            I.$('msg').innerHTML = (success === true) ? name + '！' + msg + '<br>(' + time + ')' : '嗚嗚，<br>' + msg + '耶！';
            I.$('verifyBtn').innerHTML = '重新驗證';
        }
    },
    init: function (e) {
        //報名人數
        I.ajax('GET', 'signUpTotal');
    },
    submitBtn: function (input) {
        var v = I.$('email').value;
        if (v === '') {
            I.$('msg').innerHTML = '信箱要記得寫... ^_^';
            return false;
        }
        var reg = /\S+@\S+\.\S+/;
        if (reg.test(v)) {
            I.ajax('POST', 'isSignUp', I.$('email'));
        } else {
            I.$('msg').innerHTML = "信箱不合格式，再試試喔！";
        }

    }
}

I.init();