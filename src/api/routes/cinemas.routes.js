const express = require('express');

const router = express.Router();

const{
    getCinemas,
    putCinemas,
    postCinemas,
    deleteCinema
} = require('../controllers/cinema.controllers');

router.delete('/:id',deleteCinema);
router.put('/:id', putCinemas);
router.post('/',postCinemas);
router.get('/',getCinemas);

module.exports = router;