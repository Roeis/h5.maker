'use strict';
import task         from './task.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-12">
                        <div id="baiduEditor"></div>
                    </div>
                </div>
            </div>`;

task.$el.append(html);

// horizontal align text
var ueditor = UE.getEditor('baiduEditor', {
    toolbars: [
        ['source', 'fullscreen', '|', 'removeformat', 'formatmatch', '|', 'bold', 'italic', 'underline', 'strikethrough', 'fontsize', 'link', 'unlink'],
    ],
    wordCount: false,
    //关闭elementPath
    elementPathEnabled: false,
    // isShow: false,
    //默认的编辑区域高度
    initialFrameWidth: 420,
    initialFrameHeight: 100,
    autoHeightEnabled: false,
    autotypeset: {
        //去掉冗余的class
        removeClass: false,
    },
    //取消Div标签转换成P标签
    allowDivTransToP: false
});

task.register('innerHtml', function(value){
    console.log(value);
});