'use strict';

// 生成二维码
// var qrcode = window.CUR_DATA.qrcode;
var $helper = $('#helper');
var mQrcode = 'http://www.baidu.com/';
var core = {
    init() {
        this.create();
        this.initCode();
    },
    create() {
        var html = `<div class="qrcode-helper">
                        <span class="glyphicon glyphicon-qrcode"></span>
                        <div class="qrcode" id="qrcode"></div>
                    </div>`;
        $helper.append(html);
    },
    initCode() {
        $('#qrcode').qrcode({
            text: mQrcode,
            width: 200,
            height: 200
        });
    }
};
module.exports = core;
