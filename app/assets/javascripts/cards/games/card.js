function Card() {
    function t(t) {
        var n = t.target, s = _getPos(n);
        "0" == n.getAttribute("data-isopen") ? a(n, s) :e(n, s);
    }
    function a(t, a) {
        function e(e) {
            if (json = _parseServerResp(e.response)) {

                console.log("json = " + JSON.stringify(json));
                console.log("pos = " + a);
                console.log("getOpCards = " + JSON.stringify(getOpCards()));

                if ("500" == json.status) return isEvH && actIfStale(2), void 0;

                console.log("getOpCards = " + JSON.stringify(getOpCards()));
                console.log("pic = " + r + getOpCards()[a].pic + i);


                getOpCards()[a] || (getOpCards()[a] = {
                    pic:json.pic
                }), n(t, r + getOpCards()[a].pic + i), c = !0;
            }
        }
        gamepath = window.location.pathname.match(/games\/[0-9]+/)[0], params = {
            pos:a,
            isopen:t.getAttribute("data-isopen"),
            _method:"put",
            authenticity_token:$('meta[name="csrf-token"]').attr("content")
        }, c && (c = !1, _ajax().send({
            method:"post",
            url:"/cards/" + gamepath + "/turncard.json",
            async:!0,
            data:{
                formData:{
                    append:params
                }
            },
            onload:e,
            headers:{
                X_Cards_Requested_With:"XMLHttpRequest",
                Accept:"text/javascript"
            }
        }));
    }
    function e(t, a) {
        function e(a) {
            if (json = _parseServerResp(a.response)) {
                if ("500" == json.status) return isEvH && actIfStale(2), void 0;
                n(t, o), c = !0;
            }
        }
        gamepath = window.location.pathname.match(/games\/[0-9]+/)[0], params = {
            pos:a,
            isopen:t.getAttribute("data-isopen"),
            _method:"put",
            authenticity_token:$('meta[name="csrf-token"]').attr("content")
        }, c && (c = !1, _ajax().send({
            method:"post",
            url:"/cards/" + gamepath + "/turncard.json",
            async:!0,
            data:{
                formData:{
                    append:params
                }
            },
            onload:e,
            headers:{
                X_Cards_Requested_With:"XMLHttpRequest",
                Accept:"text/javascript"
            }
        }));
    }
    function n(t, a) {
        var e = 0, n = null;
        n = window.setInterval(function(t) {
            return e >= 180 ? (window.clearInterval(n), "1" == t.getAttribute("data-isopen") ? t.setAttribute("data-isopen", "0") :t.setAttribute("data-isopen", "1"), 
            t.style.webkitTransform = "rotateY(0deg)", t.style.transform = "rotateY(0deg)", 
            void 0) :(e >= 90 && (t.style.backgroundImage = "url(/" + a + ")"), t.style.webkitTransform = "rotateY(" + e + "deg)", 
            t.style.transform = "rotateY(" + e + "deg)", e += 25, void 0);
        }, 10, t);
    }
    var s = this, o = "assets/cards/cards/suit.jpg", r = "assets/cards/cards/", i = ".png", c = !0;
    this.turn = function(a) {
        t(a);
    }, this.pingState = function(t) {
        function a(t) {
            var a = t[0];
            $("div").filter(function() {
                return this.id.match(/c_[0-9]/);
            }).each(function(t) {
                var e = _getPos($(this).get(0));
                "0" == $(this).attr("data-isopen") && "1" == a[t].isopen ? (getOpCards()[e] || (getOpCards()[e] = {
                    pic:a[t].pic
                }), n($(this).get(0), r + getOpCards()[e].pic + i)) :"1" == $(this).attr("data-isopen") && "0" == a[t].isopen && n($(this).get(0), o);
            }), updParticipants(t[1]);
        }
        function e(a, e) {
            c(), console.log("ERROR:", a, s.couter), console.log("ERROR:", a, e), p(t);
        }
        function c() {
            s.couter ? s.couter += 1 :s.couter = 1;
        }
        function p(t) {
            s.couter >= 30 && window.clearInterval(t);
        }
        gamepath = window.location.pathname.match(/games\/[0-9]+/)[0], $.getJSON("/cards/" + gamepath + "/pingstate.json", a).fail(e);
    };
}