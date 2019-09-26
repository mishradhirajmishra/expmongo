var express = require('express');
var router = express.Router();
const cont = require('../controller/admin');
/* GET home page. */
router.get('/', cont.index );
router.get('/add', cont.addGet );
router.post('/', cont.addPost );
router.get('/edit/:id', cont.editGet );
router.put('/update/:id', cont.updatePost );
router.delete('/:id',cont.delete,cont.index );
module.exports = router;
