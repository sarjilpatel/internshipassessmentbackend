const express = require("express");
const {
  createInfluencer,
  getAllInfluencers,
  updateInfluencer,
  deleteInfluencer,
  searchInfluencer,
  getInfluencer,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/influencers").post(createInfluencer).get(getAllInfluencers);

router
  .route("/influencer/:id")
  .get(getInfluencer)
  .put(updateInfluencer)
  .delete(deleteInfluencer);

router.route("/influencers/:key").get(searchInfluencer);

module.exports = router;
