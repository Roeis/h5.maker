
// CKEDITOR.disableAutoInline = true;
// 实例化编辑器
var ueditor = UE.getEditor('baidu_editor', {
    toolbars: [
        ['source', 'fullscreen', '|', 'undo', 'redo', 'removeformat', 'formatmatch', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'lineheight', 'forecolor', 'backcolor', 'fontsize', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',  'link', 'unlink', 'simpleupload',],
    ],
    wordCount: false,
    //关闭elementPath
    elementPathEnabled: false,
    // isShow: false,
    //默认的编辑区域高度
    initialFrameWidth: 720,
    initialFrameHeight: 400,
    autoHeightEnabled: false,
    autotypeset: {
        //去掉冗余的class
        removeClass: false,
    },
    //取消Div标签转换成P标签
    allowDivTransToP: false
});

module.exports = ueditor;