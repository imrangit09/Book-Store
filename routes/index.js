var express = require('express');
var router = express.Router();
const BookData = require("../models/bookSchema");

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function (req, res) {
  res.render('register');
});
router.post('/register', async function (req, res) {

  try {
    const Books = new BookData(req.body);
    await Books.save();
    res.redirect("/show");
  } catch (error) {
    res.send(error);
  }
});
router.get('/show', async function (req, res) {
  try {
    const Books = await BookData.find();
    res.render("show", { key: Books });
  } catch (error) {
    req.send(error);
  }
});
router.get('/details/:id', async function (req, res) {
  try {
    const book = await BookData.findById(req.params.id);
    res.render("details", { book: book })
  } catch (error) {
    res.json(error.message);
  }
});
router.get('/delete/:id', async function (req, res) {

  try {
    await BookData.findByIdAndDelete(req.params.id);
    res.redirect("/show")
  } catch (error) {
    res.send(error.message);
  }
});
router.get('/update/:id', async function (req, res) {
  try {
    const book = await BookData.findById(req.params.id);
    res.render("update", { book: book });

  } catch (error) {
    res.json(error.message);
  }
});
router.post('/update/:id', async function (req, res) {

  try {
    await BookData.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/details/${req.params.id}`);
  } catch (error) {
    res.json(error.message);
  }
});
module.exports = router;
