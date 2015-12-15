'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import animas       from '../../biz/animas.js';
import tasks        from '../tasks.js';


var html = `<div class="edit-group">
        <div class="row animation-name">
        `;
for (var key in animas){
    if (animas.hasOwnProperty(key)) {
    html += `<div class="anima anima-${key}" data-opacity="${animas[key].opacity}" data-value="${key}">
                <div class="${key}">
                    <span>${animas[key].cn}</span>
                </div>
            </div>`;
    }
}
html += `
        </div>
    </div>`;

tasks.register('animation-name', {
    html: html,
    target: '#animaPanel',
    init(){

        this.$name = this.$el.find('.animation-name');
    },
    bind(){
        this.$name
            .on('click', '.anima', function(){
                let name = $(this).data('value');
                stageData.curElem.style.opacity = name === 'none' ? 1 : 0;
                stageData.curElem.style['animation-name'] = name;
                render.logElemStep();
            })
            .on('mouseenter mouseleave', '.anima', function(event){
                let $this = $(this),
                    $target = $this.find('div');
                if(event.type === 'mouseenter'){
                    $target.addClass('animated');
                }else{
                    $target.removeClass('animated');
                }
            });
    },
    callback(value){
        // wobble       1s         ease       2s
        // name      duration    time-func   delay
        this.$el.show();
        this.$name.find('.anima').removeClass('active');
        this.$name.find('.anima-' + value).addClass('active');
    }
});
