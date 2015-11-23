'use strict';
import task         from './task.js';
import stageData    from '../data/stageData.js';
import animas       from '../biz/animas.js';
import render       from '../page/render.js';


var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        duration
                    </div>
                    <div class="col-md-8">
                        <input type="number" class="form-control" min="0" step="0.1" data-role="animation-duration"></input>
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        delay
                    </div>
                    <div class="col-md-8">
                        <input type="number" class="form-control" min="0" step="0.1" data-role="animation-delay"></input>
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

task.$el.append(html);

// name
var $name = task.$el.find('.animation-name');
task.register('animation-name', function(value){

    // wobble       1s         ease       2s
    // name      duration    time-func   delay
    var name = value;
    $name.find('.anima').removeClass('active');
    $name.find('.anima-'+name).addClass('active');

    // console.log('%canimation:', 'color: #f00', name);
});

$name.on('click', '.anima', function(){
    var name = $(this).data('value');
    stageData.curElem.style['animation-name'] = name;
    render.renderStep();
});
$name.on('mouseenter mouseleave', '.anima', function(event){
    var $this = $(this),
        $target = $this.find('div');
    if(event.type === 'mouseenter'){
        $target.addClass('animated');
    }else{
        $target.removeClass('animated');
    }
});

// duration
var $duration = task.$el.find('[data-role="animation-duration"]');
task.register('animation-duration', function(value){
    value = parseFloat(value);
    $duration.val(value);
});

$duration.on('change.property', function(){
    stageData.curElem.style['animation-duration'] = this.value + 's';
    render.renderStep();
});

// delay
var $delay = task.$el.find('[data-role="animation-delay"]');
task.register('animation-delay', function(value){
    value = parseFloat(value);
    $delay.val(value);
});

$delay.on('change.property', function(){
    stageData.curElem.style['animation-delay'] = this.value + 's';
    render.renderStep();
});
