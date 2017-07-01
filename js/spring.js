// 瀑布流代码
;(function ($) {
    $.fn.waterfall = function(options) {  //对Jquery对象添加方法waterfall
        var df = {
            item: '.item',
            margin: 15,
            addfooter: true
        };
        options = $.extend(df, options);
        return this.each(function() {
            var $box = $(this), pos = [],
            _box_width = $box.width(),  //获取界面宽度
            $items = $box.find(options.item),  //获取单个div
            _owidth = $items.eq(0).outerWidth() + options.margin, //获得结果集第一个元素的宽度+间距
            _oheight = $items.eq(0).outerHeight() + options.margin,
            _num = Math.floor(_box_width/_owidth); //每行列数

            //获取每个div起始位置
            (function() {
                var i = 0;
                for (; i < _num; i++) {
                    pos.push([i*_owidth,0]);
                } 
            })();

            // 针对每个div块
            $items.each(function() {
                var _this = $(this),
                _temp = 0,
                _height = _this.outerHeight() + options.margin;

                // 悬浮样式
                // _this.hover(function() {
                //     _this.addClass('hover');
                // },function() {
                //     _this.removeClass('hover');
                // });

                for (var j = 0; j < _num; j++) {
                    if(pos[j][1] < pos[_temp][1]){  //pos[][0]代表x坐标，pos[][1]代表y坐标
                        //暂存y值最小那列的记录index
                        _temp = j;
                    }
                }
                this.style.cssText = 'left:'+pos[_temp][0]+'px; top:'+pos[_temp][1]+'px;'; //定位CSS
                //插入后，更新下该列下一行的y值
                pos[_temp][1] = pos[_temp][1] + _height;
            });

            // 计算y值最大的赋给外围div
            (function() {
                var i = 0, tops = [];
                for (; i < _num; i++) {
                    tops.push(pos[i][1]);
                }
                tops.sort(function(a,b) {
                    return a-b;
                });
                $box.height(tops[_num-1]);

                //增加尾部填充div
                if(options.addfooter){
                    addfooter(tops[_num-1]);
                }

            })();

            function addfooter(max) {
                var addfooter = document.createElement('div');
                addfooter.className = 'item additem';
                for (var i = 0; i < _num; i++) {
                    if(max != pos[i][1]){
                        var clone = addfooter.cloneNode(),
                        _height = max - pos[i][1] - options.margin;
                        clone.style.cssText = 'left:'+pos[i][0]+'px; top:'+pos[i][1]+'px; height:'+_height+'px;';
                        $box[0].appendChild(clone);
                    }
                }
            }

        });
    }
})(jQuery);