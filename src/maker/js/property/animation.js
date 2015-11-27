'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import animas       from '../biz/animas.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        duration
                    </div>
                    <div class="col-md-8">
                        <input type="number" class="form-control animation-duration" min="0" step="0.1" />
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        delay
                    </div>
                    <div class="col-md-8">
                        <input type="number" class="form-control animation-delay" min="0" step="0.1" />
                    </div>
                </div>
            </div>`;

    html += `<div class="edit-group">
                <div class="row animation-name">`;
        for (var key in animas){
            if (animas.hasOwnProperty(key)) {
                html += `<div class="anima anima-${key}" data-opacity="${animas[key].opacity}" data-value="${key}">
                            <div class="${key}">${animas[key].cn}</div>
                        </div>`;
            }
        }
        html += `</div>
            </div>`;

var task = new Task({
    html: html,
    parent: '#animaPanel',
    init(){
        this.$duration = this.$el.find('.animation-duration');
        this.$delay = this.$el.find('.animation-delay');
        this.$name = this.$el.find('.animation-name');
    },
    bind(){
        this.$name
            .on('click', '.anima', function(){
                let name = $(this).data('value');
                stageData.curElem.style.opacity = name === 'none' ? 1 : 0;
                stageData.curElem.style['animation-name'] = name;
                render.renderStep();
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

        this.$delay.on('change.property', function(){
            stageData.curElem.style['animation-delay'] = this.value + 's';
            render.renderStep();
        });

        this.$duration.on('change.property', function(){
            stageData.curElem.style['animation-duration'] = this.value + 's';
            render.renderStep();
        });
    },
    register(){

        // wobble       1s         ease       2s
        // name      duration    time-func   delay

        tasks.register('animation-name', (value) => {

            this.$el.show();
            this.$name.find('.anima').removeClass('active');
            this.$name.find('.anima-' + value).addClass('active');
        });

        tasks.register('animation-duration', (value) => {
            value = parseFloat(value);
            this.$duration.val(value);
        });

        tasks.register('animation-delay', (value) => {
            value = parseFloat(value);
            this.$delay.val(value);
        });
    }

});
