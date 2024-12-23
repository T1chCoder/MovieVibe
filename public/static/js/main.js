$(document).ready(function () {
    $("html").click(function () {
        $(".html-cls-js").removeAttr("style");
        $(".html-rmv-js").remove();
    });

    $("html").on("click", ".stp-prp", function (e) {
        e.stopPropagation();
    });

    $("html").on("click", ".sbmt-frm", function () {
        $("#" + $(this).attr("frm")).submit();
    });

    $("html").on("click", ".sbmt-frm-act", function () {
        var url = $(this).attr("formUrl");
        var form = $("#" + $(this).attr("form"));
        form.prop("action", url);
        form.submit();
    });

    $("html").on("click", ".clck-anthr-blck", function (e) {
        $("." + $(this).attr("blockClass")).click();
    });
});