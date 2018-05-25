var I = {
    $: function (x) {
        if (document.getElementById(x)) return document.getElementById(x);
        return false;
    },
    addClass: function (c, o) {
        var n = o.className;
        if (n.indexOf(c) != -1) return;
        if (n != '') c = ' ' + c;
        o.className = n + c;
    },
    removeClass: function (c, o) {
        var n = o.className;
        var r = new RegExp("\\s?\\b" + c + "\\b", "g");
        n = n.replace(r, '');
        o.className = n;
    },
    J: function (o, p) {
        var D = "";
        var X = X = new XMLHttpRequest();;
        if (X) {
            X.onreadystatechange = function () {
                try {
                    if (X.readyState == 4 && X.status == 200) {
                        if (p) {
                            if (p == "pfunction") {
                                I.pfunction();
                                I.pfunction = null
                            };
                            if (p == "noticeline") {
                                window.location.reload();
                            } else {
                                I.$(p).innerHTML = X.responseText;
                                if (I.pfunction != null) {
                                    I.pfunction();
                                    I.pfunction = null;
                                }
                            };
                            if (I.tempobj != null) {
                                I.tempobj.innerHTML = X.responseText;
                                setTimeout(I.hideedit, 300);
                            };
                        };
                    };
                } catch (e) {};
            };
            X.open("GET", o);
            try {
                X.send(D);
            } catch (e) {};
        };
        return false;
    },
    init: function () {
        console.log("已執行初始化");
        I.checkSubmitBtn('verifyBtn', 'email');
    },
    checkSubmitBtn: function (btn, input) {
        // var btn, input;
        btn = I.$(btn);
        input = I.$(input);
        btn.disabled = (input.value) ? 'true' : 'false';
    }
}
var init = I.init();
(function () {
    console.log("已執行IIFE");
}(init));