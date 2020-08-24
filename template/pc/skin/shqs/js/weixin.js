$(document).ready(function () {
    $('#gotop').click(function () {
        $(document).scrollTop(0);
    });
    $('#code').hover(function () {
        $(this).attr('id', 'code_hover');
        $('#code_img').show();
    }, function () {
        $(this).attr('id', 'code');
        $('#code_img').hide();
    });
    $('#code2').hover(function () {
        $(this).attr('id', 'code_hover2');
        $('#code_img2').show();
    }, function () {
        $(this).attr('id', 'code2');
        $('#code_img2').hide();
    });
});