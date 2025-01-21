const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

//mvc
const listingController = require("../controllers/listings.js");

const multer = require('multer');  //multer for uploading files
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index)) //index route
  .post(
    // create route
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//show filters
router.get("/filters", wrapAsync(listingController.showFilters));

//new route
router.get("/new", isLoggedIn, listingController.newForm);

router
  .route("/:id")
  .put(
    //update route
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .get(wrapAsync(listingController.showListing)) // show route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //destroy route

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editForm)
);

module.exports = router;
