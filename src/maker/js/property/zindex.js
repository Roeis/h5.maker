'use strict';
import task         from './task.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        z-index
                    </div>
                    <div class="col-md-8">
                        <input type="number" min="0" class="form-control" data-role="z-index">
                    </div>
                </div>
            </div>`;

task.$style.append(html);

var $zindex = task.$style.find('[data-role="z-index"]');

task.register('z-index', function(value){
    // console.log('%cz-index', 'color: #f00', value);
    $zindex.val(value);
});

$zindex.on('change.property', function(){
    stageData.curElem.style['z-index'] = this.value;
    render.renderStep();
});
