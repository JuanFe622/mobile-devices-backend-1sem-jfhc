const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/new-user', upload.single('avatar'), UserController.createUser)
router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', UserController.updateUser)
router.delete('/remove/:id', UserController.deleteUser)

module.exports = router;