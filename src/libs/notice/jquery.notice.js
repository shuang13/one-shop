$(document).ready(function () {
	var $body      =  $('body');
	var $container = $body.find('.jq-notice-container');
	var template   = ['<div class="jq-notice-container hidden">',
						'<div class="jq-notice-content">',
							'<div class="jq-notice-header">',
								'<i></i>',
								'<span></span>',
								'<i></i>',
							'</div>',
							'<section class="jq-notice-context"></section>',
						'</div>',
					'</div>'].join('');

    // 添加基础的HTML到文档中
	if($container.length === 0) {
		$container = $(template).appendTo($body);
	}

    var $content = $container.find('.jq-notice-content');
    var $header  = $container.find('.jq-notice-header');
    var $context = $container.find('.jq-notice-context');
    var client   = {
        x : 0,
        y : 0
    };

    // 弹出弹出框
	function notice (header, context, callback, width, height) {
        // 更新内容到弹出框中
        header = header ? header : '提示：'
        $header.find('span').html(header);
        $context.html(context);

        // 显示弹出框
		$container.removeClass('hidden');

        // 如果有回调函数，则调用
        if (typeof callback === 'function') {
            callback();
        } else {
            var timeout = setTimeout(function () {
                $.closeNotice();
                clearTimeout(timeout);
            }, 2000);
        }

        // 如果有手动设置宽度，则设置，否则默认500px
        if(typeof width === 'number') {
            $content.css({
                'width': width + 'px',
                'marginLeft': - width / 2 + 'px'
            });
        }

        // 如果有手动设置高度，则设置，否则默认300px
        if(typeof height === 'number') {
            $content.css({
                'height': height + 'px',
                'marginTop': - height / 2 + 'px'
            });
            $context.css({
                'height': height - 30 + 'px',
                'maxHeight': 'none'
            });
        }
	};

    // 隐藏弹出框
    function closeNotice() {
        $container.addClass('hidden');
    }

    // 绑定事件
    function bindEvent() {
        // 关闭弹出框
        var close = $container.find('.jq-notice-header i:eq(1)');
        close.on('click',function () {
            $.closeNotice();
        });

        $(document).on('keydown', function (event) {
            if(event.keyCode == 27 || event.keyCode == 13) {
                $.closeNotice();
            }
        });

        // 鼠标在header上点下去，弹出框进入可拖动状态
        $header.on('mousedown', function (event) {
            $header.addClass('mousedown');

            client.x = event.clientX;
            client.y = event.clientY;
        });

        // 鼠标在任何地方松开，取消可弹出框拖动状态
        $(document).on('mouseup', function () {
            $header.removeClass('mousedown');
        })
        // 鼠标在可拖动状态下被拖动
        .on('mousemove', function (event) {
            if($header.hasClass('mousedown')) {
                var marginTop = parseInt($content.css('marginTop'));
                var marginLeft = parseInt($content.css('marginLeft'));

                $content.css({
                    'marginTop' : marginTop + event.clientY - client.y + 'px',
                    'marginLeft' : marginLeft + event.clientX - client.x + 'px'
                });

                client.x = event.clientX;
                client.y = event.clientY;
            }
        });
    }
    bindEvent();

    // 添加到jQuery扩展中
	$.extend({
		'notice' : notice,
        'closeNotice' : closeNotice
	});
});