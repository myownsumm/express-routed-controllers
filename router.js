const express = require('express');

const router = express.Router({
    mergeParams: true
});

router.get('/test-lib', (req, res, next) => {
    return res.json({
        result: true,
        message: 'hello'
    })
});

module.exports = router;