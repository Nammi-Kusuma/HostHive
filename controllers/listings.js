const Listing = require("../models/listings");

module.exports.index = async (req, res) => {
  let { q } = req.query;
  // console.log(q);
  let allListings;
  if(!q) {
    allListings = await Listing.find({});
  } else {
    allListings = await Listing.find({ category: q });
  }
  res.render("listings/index.ejs", { allListings });
};

module.exports.newForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "..", filename);

  let listing = req.body.listing;
  const newList = new Listing(listing);
  newList.owner = req.user._id;
  newList.image = { url, filename };
  // console.log(newList);

  await newList.save();
  req.flash("success", "New Listing created");
  res.redirect("/listings");
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for doesn't exists!");
    res.redirect("/listings");
  }

  let originalUrl = listing.image.url;
  originalUrl = originalUrl.replace("/upload", "/upload/w_250"); //image preview in edit
  // console.log(originalUrl);
  res.render("listings/edit.ejs", { listing, originalUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  //for image
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, "..", filename);
    listing.image = { url, filename };

    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } }) //in reviews populate author
    .populate("owner"); //populate to reviews & owner
  if (!listing) {
    req.flash("error", "Listing you requested for doesn't exists!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

module.exports.showFilters = async (req, res) => {
  let { q } = req.query;
  // console.log(q);
  const filteredListings = await Listing.find({ category: q });
  const allListings = filteredListings;
  res.render("listings/index.ejs", { allListings });
};