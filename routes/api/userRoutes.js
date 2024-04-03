const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  UpdateUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);


router.route('/:userId').get(getSingleUser);


router.route("/:userId").get(getUsers).put(UpdateUser).delete(deleteUser);

module.exports = router;
