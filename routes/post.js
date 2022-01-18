const express = require('express')
const authCheck = require('../middleware/auth-check');
const Post = require('../models/Post');

const router = new express.Router()

function validatePostForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  

  if (!payload || typeof payload.url !== 'string' || payload.url.length < 3) {
    isFormValid = false
    errors.url = 'Make must be more than 3 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 3) {
    isFormValid = false
    errors.description = 'Model must be more than 3 symbols.'
  }



  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const post = req.body
  post.creator = req.user._id
  const validationResult = validatePostForm(post)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Post.create(post)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Post added successfully.',
        post
      })
    })
})

router.get('/all', authCheck ,(req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search

  Post.find({})
    .then((post) => {
      return res.status(200).json(post)
    })
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = req.params.id
  Post.findById(id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        url: post.url,
        description: post.description,
        creator
      }

     
      res.status(200).json(response)
    })
})


router.get('/user', authCheck, (req, res) => {
  const user = req.user._id

  Post.find({creator: user})
    .then((post) => {
      return res.status(200).json(post)
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user._id

  Post.findById(id)
    .then((post) => {
      if (!post) {
        return res.status(200).json({
          success: false,
          message: 'Post does not exists!'
        })
      }

      if ((post.creator.toString() != user && !req.user.roles.includes("Admin"))) {
         return res.status(401).json({
           success: false,
           message: 'Unauthorized!'
         })
      }

      Post.findByIdAndDelete(id)
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Post deleted successfully!'
          })
        })
    })
})

router.put('/edit/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const post = req.body;

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post does not exists!'
    })
  }

  if (!req.user.roles.includes('Admin')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized!'
    })
  }

  const validationResult = validatePostForm(post)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Post.findByIdAndUpdate(id, post)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Post edited successfully!'
      })
  })
})

router.get('/:id', authCheck, (req, res) => {
  const id = req.params.id

  Post.findById(id)
    .then(post => {
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        url: post.url,
        description: post.description,
        creator
      }

 

      res.status(200).json(response)
    })
})

module.exports = router
