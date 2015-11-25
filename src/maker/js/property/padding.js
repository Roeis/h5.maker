'use strict';
import task         from './task.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">padding</div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="padding" type="number">
                    </div>
                </div>
            </div>`;

task.$style.append(html);

var $padding = task.$style.find('[data-role="padding"]');

task.register('padding', function(value){
    value = parseInt(value, 10);
    $padding.val(value);
});

$padding.on('change.property', function(){
    stageData.curElem.child.style.padding = this.value + 'px';
    render.renderStep();
});
