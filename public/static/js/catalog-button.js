$(document).ready(function () {
    $("nav > .ctlg > button").click(function () {
        if ($("nav > .btns").hasClass("lmtd")) {
            $("nav > .btns").removeClass("lmtd");
        }
        else {
            $("nav > .btns").addClass("lmtd");
        }
    });
});