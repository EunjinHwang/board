const express = require('express');
const router = express.Router();
const { v4: generateId } = require('uuid');

const {Reple} = require('../model/Reple.js')

// id 작성글 아이디 , r_id : 댓글 아이디 
//댓글들 불러오기
router.get('/reple/:id', async (req, res, next) => {
    try {
      const reples = await Reple.find({id: req.params.id}).exec();
      res.json({ reples: reples });
    } catch (error) {
      next(error);
    }
  });

//댓글 작성하기 
router.post('/reple/write', async (req, res, next) => {
    const data = req.body;
  
    try {
      const NewReple = new Reple(data)
      NewReple.r_id =  generateId()
      await NewReple.save();
      res.status(201).json({ message: 'Post saved.', reple: data });
    } catch (error) {
      next(error);
    }
  });

// 댓글 삭제 
router.delete('/reple/delete/:r_id', async (req, res, next) => {
    try {
      await Reple.deleteOne({r_id :req.params.r_id});
      res.json({ message: 'Post deleted.' });
    } catch (error) {
      next(error);
    }
  });

// 댓글 수정 
router.patch('/repel/edit/:r_id', async (req, res, next) => {
    const data = req.body;
  
    try {
      await Reple.updateOne({r_id : req.params.r_id}, {$set : data});
      res.json({ message: 'Post updated.', post: data });
    } catch (error) {
      next(error);
    }
  });
module.exports = router;