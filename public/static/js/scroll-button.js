$(document).ready(function() {
    $("#btn-bck-to-tp").click(function() {
        $("html").animate({ scrollTop: 0 }, "fast");
        return false;
    });
});