const router = require("express").Router();
const {
  getThoughts,
  getSinglethought,
  createThought,
  UpdateThoughts,
  DeleteThoughts,
} = require("../../controllers/thoughtsController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:id")
  .get(getSinglethought)
  .put(UpdateThoughts)
  .delete(DeleteThoughts);


module.exports = router;
