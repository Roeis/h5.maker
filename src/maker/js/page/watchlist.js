'use strict';

import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';

var core = {
    $el: $('#watchList'),
    render(){
        var data = pageData.list[stageData.index].elements,
            html = `<div class="elem-list">
                        <div class="title">
                            
                        </div>
                        <ul>`;
            for (var i = 0; i < data.length; i++){
                html += `<li data-id="${data[i].id}">
                            ${data[i].id}
                        </li>`;
            }
        html += `</ul>
                </div>`;
        this.$el.html(html);
    },

    bind() {
        var self = this;
        this.$el.on('click', 'li', function(){
            var $this = $(this),
                id = $this.attr('data-id');
            $('#' +id).trigger('click');
            self.renderStatus(id);
        });
    },

    renderStatus(id){
        this.$el.find('li').removeClass('active').end()
            .find(`[data-id="${id}"]`).addClass('active');
    },

    init(){
        this.render();
        this.bind();
    }
};

module.exports = core;
