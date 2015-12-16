'use strict';

module.exports = {
    handleError: function(res, err){
        res.json({
            Code: -2,
            Message: 'error',
            data: err
        });
    }
};
