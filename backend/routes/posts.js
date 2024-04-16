const express = require('express');
//const { checkAuth } = require('../util/auth');
const { getAll, get, add, replace, remove } = require('../data/post');
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require('../util/validation');
const {Post} = require('../model/post.js')
const router = express.Router();
const { v4: generateId } = require('uuid');

//홈
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().exec();
    console.log(posts)
    res.json({ posts: posts });
  } catch (error) {
    next(error);
  }
});
//디테일?
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({id: req.params.id}).exec();
    res.json({ post: post });
  } catch (error) {
    next(error);
  }
});

//router.use(checkAuth);
// 글입력
router.post('/', async (req, res, next) => {
  console.log(req.token);
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  // if (!isValidImageUrl(data.image)) {
  //   errors.image = 'Invalid image.';
  // }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the post failed due to validation errors.',
      errors,
    });
  }

  try {
    const Newdata = new Post(data)
    Newdata.id =  generateId()
    console.log(Newdata)
    await Newdata.save();
    res.status(201).json({ message: 'Post saved.', post: data });
  } catch (error) {
    next(error);
  }
});
// 수정
router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.description)) {
    errors.description = 'Invalid description.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidImageUrl(data.image)) {
    errors.image = 'Invalid image.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the post failed due to validation errors.',
      errors,
    });
  }

  try {
    await Post.updateOne({id : req.params.id}, {$set : data});
    res.json({ message: 'Post updated.', post: data });
  } catch (error) {
    next(error);
  }
});
//삭제
router.delete('/:id', async (req, res, next) => {
  try {
    await Post.deleteOne({id :req.params.id});
    res.json({ message: 'Post deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
