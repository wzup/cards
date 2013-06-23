//= require jquery
//= require jquery_ujs
//= require_self
//= require cards/games/card
//= require cards/global/gConfig
//= require cards/games/pConfig
//= require cards/global/global

function Page(t) {
    function n() {
        for (i = 0; 10 > i; i++) ge("c_" + i).addEventListener("click", o.card.turn, !1);
        isEvH = !0;
    }
    function a() {
        for (i = 0; 10 > i; i++) ge("c_" + i).removeEventListener("click", o.card.turn, !1);
    }
    function e() {
        o.opCards = new Array(10), $("div[data-isopen='1']").each(function() {
            var t = _getPos($(this).get(0)), n = $(this).css("background-image").match(/\/(\w{2,4})\.(?:gif|png|jpg|jpeg)/)[1];
            o.opCards[t] = {
                pic:n
            };
        });
    }
    var o = this;
    isEvH = !1, getOpCards = function() {
        return o.opCards;
    }, updParticipants = function(t) {
        ge("parts_n").getElementsByTagName("span")[0].textContent = t.length;
        var n = /name=(user_[0-9]+)/g;
        try {
            var a = n.exec(document.cookie)[1];
        } catch (e) {
            isEvH && actIfStale(2);
        }
        var o = "", c = "", s = !1;
        if (0 == t.length) o += '<li class="gi_li_v" style="font-weight: normal;">' + _config.vocab[$("html[lang]").attr("lang")].nobody + "</span></li>"; else for (i in t) t[i].name == a ? (s = !0, 
        c = _config.vocab[$("html[lang]").attr("lang")].u, o += '<li id="pl_' + i + '" class="gi_li_v">' + c + ", " + t[i].name) :o += '<li id="pl_' + i + '" class="gi_li_v">' + t[i].name, 
        o += ', <span class="sip">ip: ' + t[i].ip + "</span></li>";
        ge("parts").innerHTML = "", ge("parts").insertAdjacentHTML("afterbegin", o), !s && isEvH && actIfStale(1);
    }, actIfStale = function(t) {
        a(), isEvH = !1;
        var n = '<a href="' + window.location.pathname + '/join" data-method="post" rel="nofollow">';
        n += _config.vocab[$("html[lang]").attr("lang")].thisLink + "</a>";
        var i = '<div class="c_title wcol mb50 tac">';
        1 == t ? i += _config.vocab[$("html[lang]").attr("lang")].stale1 + "<br>" + _config.vocab[$("html[lang]").attr("lang")].stale2 + "&nbsp" :2 == t && (i += _config.vocab[$("html[lang]").attr("lang")].noCookie + "&nbsp"), 
        i += n + "</div>", document.getElementById("ballpark").insertAdjacentHTML("afterbegin", i);
    }, _getPos = function(t) {
        var n = t.getAttribute("id").match(/\d+/g)[0];
        return parseInt(n, 10);
    }, this.__init__ = function() {
        o.who = document.getElementById("gameInfo").getAttribute("data-who");
        for (i in t.objects) o[t.objects[i].toLowerCase()] = new window[t.objects[i]](), 
        window[t.objects[i]] = null;
        3 == o.who && n(), e();
        var a = window.setInterval(function() {
            o.card.pingState(a);
        }, t.settings.ping);
    };
}