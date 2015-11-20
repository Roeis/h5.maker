'use strict';
import util         from '../biz/util.js';
import pageData     from '../model/pageData.js';

var $toolBar = $('#toolBar');

var tabs = [
    {
        id: 'toolElem',
        cn: '元素'
    },
    {
        id: 'toolTmpl',
        cn: '模板'
    },
    {
        id: 'toolLogo',
        cn: 'logo'
    },
    {
        id: 'toolApis',
        cn: '接口'
    },
    {
        id: 'toolSrcs',
        cn: '素材'
    }
];
var core = {

    init: function() {
        this._create();
        this._createTabcont();
        this._bind();
    },
    /**
     * 创建右键
     * @return {[type]} [description]
     */
    _create: function(){
        var html = `<div class="tool-bar">
                        <ul>`;

                for(var i = 0; i < tabs.length; i++){
                    html += `<li data-id="${tabs[i].id}">${tabs[i].cn}</li>`;
                }

                html += `</ul>
                    </div>`;

        this.$elem = $(html);
        $toolBar.append(this.$elem);
    },
    _createTabcont: function(){
        var html = `<div class="tool-bar-cont">`;

            for(var i = 0; i < tabs.length; i++){
                html += `<div class="tool-bar-cont-li" id="${tabs[i].id}">
                    this is #${tabs[i].id}
                </div>`;
            }
            html += `</div>`;

        this.$cont = $(html);
        $toolBar.append(this.$cont);
    },

    _insertData: function(){

    },

    _bind: function() {
        var self = this;

        util.$doc.on('click', '.tool-bar li', function(){
            var $this = $(this),
                index = $this.index(),
                id = $this.attr('data-id');
            self.$elem.find('li').removeClass('active');
            $this.addClass('active');
            self.$cont.children().hide();
            self.$cont.show().find('#'+id).show();

            console.log(id, index);
        });

        util.$doc.on('click', function(event){
            var $this = $(event.target),
                isIn = $this.closest('#toolBar').length > 0;
            if(!isIn){
                self.$cont.hide();
                self.$elem.find('li').removeClass('active');
            }
            // console.log(event.target);
            // console.log(isIn);
        });

        // clone 一个元素，id变化
        // var elem = _.cloneDeep(elements.defaultElem);
        // stageData.countID ++;
        // elem.id = 'm_' + stageData.countID;
        // pageData.list[Data.index].elements.push(elem);
    },
};

module.exports = core;