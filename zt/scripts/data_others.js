var other_template = [
    {
        'id': 2,
        'name': '拖动标题',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag item_text" data-type="1" style="position:absolute; left:10%; top: 15%; width: 80%; height:20%;">'+
                    '<div class="m_elem" style="padding:10px;">'+
                        '<p style="font-size: 20px;">这是大标题，字号比较大</p>'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201503/201503302221505845.jpg',
        'isNew': false
    },

    {
        'id': 3,
        'name': '拖动文字',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag item_text" data-type="1" style="position:absolute; left:10%; top: 10%; width: 80%; height:30%;">'+
                    '<div class="m_elem" style="padding:10px;">'+
                        '<p>填写文案, 这里填写文案这里填写文案这里填写文案这里填写文案这里填写文案</p>'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201503/201503302253810187.jpg',
        'isNew': false
    },

    {
        'id': 4,
        'name': '拖动图片',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag" data-type="2" style="position:absolute; left:10%; top: 30%; width: 80%; height:40%; background-image:url(http://i2.w.hjfile.cn/news/201503/201503255395989388.png);background-repeat: no-repeat;background-size: 100% auto;">'+
                    '<div class="m_elem">'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201503/201503302231831210.jpg',
        'isNew': false
    },

    {
        'id': 5,
        'name': '来点Music',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag item_audio" data-type="5" data-src="http://f1.w.hjfile.cn/doc/touch_m/arashi15/music_1.mp3" style="position: absolute; left: 10%; top: 50%; width: 80%; height: 10%; z-index: 0; border-radius: 10px; background-color: rgb(45, 194, 70);">'+
                    '<div class="m_elem">'+
                        '<p style="font-size: 20px;">播放</p>'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201503/201503302233840644.jpg',
        'isNew': false
    },

    {
        'id': 6,
        'name': '拖动链接按钮',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag item_btn" data-type="6" data-src="http://m.hujiang.com" style="background-color: #999; color: #FFF; width: 80%; left: 10%; top: 330px; position: absolute; height:50px; border-radius: 50px;">'+
                    '<div class="m_elem">'+
                            '<p>点击跳转链接按钮</p>'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201503/201503302244522319.jpg',
        'isNew': false
    },

    {
        'id': 7,
        'name': '阿拉丁の视频',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag item_video" data-type="7" data-src="http://www.w3school.com.cn/i/movie.ogg" style="position:absolute; text-align: center; width: 100%;">'+
                    '<div class="m_elem">'+
                        '<video src="http://www.w3school.com.cn/i/movie.ogg"  width="320" height="240" controls="controls">'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201503/201503302272062291.jpg',
        'isNew': false
    },

    {
        'id': 8,
        'name': '向上绿色箭头',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag" data-type="8" style="position: absolute; left: 30%; top: 90%; width: 40%; height: 8%; z-index: 1;">'+
                    '<div class="m_elem">'+
                        '<div class="arrow_guidedown moveTopAnima"></div>'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201504/201504021563857617.jpg',
        'isNew': false
    },

    {
        'id': 9,
        'name': '向左绿色箭头',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag" data-type="8" style="position: absolute; left: 30%; top: 90%; width: 40%; height: 8%; z-index: 1;">'+
                    '<div class="m_elem">'+
                        '<div class="arrow_guideLeft moveLeftAnima"></div>'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201504/201504021560346591.jpg',
        'isNew': false
    },

    {
        'id': 10,
        'name': '带icon音乐块',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag item_audio" data-type="5" data-src="http://f1.w.hjfile.cn/doc/touch_m/arashi15/music_1.mp3" style="position: absolute; left: 74%; top: 48%; width: 15%; height: 8%; z-index: 1; border-radius: 40px; background-color: rgb(45, 194, 70);">'+
                    '<div class="m_elem">'+
                        '<div class="play_icon"></div>'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201504/201504011451028861.jpg',
        'isNew': false
    },

    {
        'id': 11,
        'name': '分享块',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag item_share" data-type="8" style="position: absolute; left: 5%; top: 80%; width: 90%; height: 10%; z-index: 1;">'+
                    '<div class="m_elem">'+
                        '<div class="share_nwx cf">'+
                            '<div class="col_5">'+
                                '<a href="#" class="share_weibo">分享到微博</a>'+
                            '</div>'+
                            '<div class="col_5">'+
                                '<a href="#" class="share_qq">分享到QQ</a>'+
                            '</div>'+
                        '</div>'+
                        '<div class="share_wx">'+
                            '<a href="javascript:;" >分享到好友圈</a>'+
                        '</div>'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201504/2015040211303540911.jpg',
        'isNew': false
    },

    {
        'id': 12,
        'name': '自定义箭头颜色方向',
        'author': 'roeis',
        'html': '<div class="item_edit item_drag" data-type="11" data-color="white" data-direction="top" style="position: absolute; left: 0%; top: 90%; width: 100%; height: 8%; z-index: 1;">'+
                    '<div class="m_elem">'+
                        '<div class="arrow_guide moveTopAnima">'+
                            '<div class="arrow_default" style="border-color: rgb(255, 255, 255);"></div>'+
                        '</div>'+
                    '</div>'+
                '</div>',
        'imgSrc': 'http://i2.w.hjfile.cn/news/201504/201504021563857617.jpg',
        'isNew': false
    },

];