(jQuery)(function($) {

    $(window).on('load scroll resize',function(){

        var iframes = $('.iframe-container iframe');

        resizeIframe(iframes);

    });

    var resizeIframe = function (objects) {

        $.each(objects, function(key, object) {

            // 以前の resizeFreame を削除する
            if ($('#resizeFreame_' + key).length) {
                $(object).unwrap();
            }

            offset = $(object).offset();
            parentWidth = $(object).parent().width();
            targetWidth =  $(window).width();
            if (targetWidth > parentWidth) {
                targetWidth = parentWidth;
            }

            iframWidth = $(object).width();
            iframHeight = $(object).height();

            scale = 1;

            if(targetWidth <= iframWidth){

                rate = targetWidth/iframWidth;

                if (1 > rate) {

                    scale = rate;

                }

            }

            $(object).css('top', 0).css('left', offset.left)

                .css('transform','scale('+scale+')')

                .css('-o-transform','scale('+scale+')')

                .css('-webkit-transform','scale('+scale+')')

                .css('-moz-transform','scale('+scale+')')

                .css('-ms-transform','scale('+scale+')')

                .css('-transform-origin','0 0')

                .css('-o-transform-origin','0 0')

                .css('-webkit-transform-origin','0 0')

                .css('-moz-transform-origin','0 0')

                .css('-ms-transform-origin','0 0');


            // リサイズ専用のいDivを疑似フレームに見立てて親に設定する
            // 新しいBoxを用意し設定する
            tag_div = $('<div id="resizeFreame_' + key + '" class="fream_box">');
            tag_div.width(targetWidth);
            tag_div.height((iframHeight * scale));
            $(object).wrap(tag_div);
        });
    }
});