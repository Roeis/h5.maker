'use strict';

var core = {
    init: function(){
        var app = window.navigator.appVersion.toLowerCase(),
            version = app.match(/chrome\/([\d.]+)/),
            isChrome = /chrome/i.test(app);

        version && (version = parseInt(version[1].slice(0, 2)));

        version <= 36 && alert('厂长建议你使用新版Chrome~');
        !isChrome && alert('请使用chrome来体验这款神器~');
    }
};

module.exports = core;