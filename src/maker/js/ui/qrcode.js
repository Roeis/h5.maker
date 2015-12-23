'use strict';

// 生成二维码
import util from '../biz/util.js';

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
        util.$helper.append(html);
    },
    initCode() {
        let qrcode = window.CUR_DATA.qrcode;
        $('#qrcode').qrcode({
            text: qrcode,
            width: 200,
            height: 200
        });
    }
};
module.exports = core;
