/*
 * @Author: Jipu Li
 * @Date: 2022-04-16 23:08:17
 * @Last Modified by: Jipu Li
 * @Last Modified time: 2022-05-19 21:28:27
 */

const axios = require('axios');
const { response } = require('express');
const moment = require('moment');

// API url from server-app
let url = 'http://localhost:3100'

// this is for storing image URL from server-app
let imageURL = ''

/**
 * index view, will show a list of stories
 * @req request from user
 * @res response to the user
 */
const story_index = (req, res) => {
  axios.get(url + '/get_story_list').then(response => {
    if (response.data.status === 0) {
      var story_list = []
      story_list = response.data
      res.render('index', {
        stories: story_list.data.map((story) => {
          const formatDate = moment(story.date).format('MMMM Do YYYY, h:mm:ss a');
          return {
            ...story,
            date: formatDate
          };
        }),
        title: "All Stories",
        des: 1
      })
    } else {
      console.log(response.data.message)
    }
  }).catch(err => {
    console.log(err.message)
  })
}

const story_list_date = (req, res) => {
  axios.get(url + '/get_story_list?order=date').then(response => {
    if (response.data.status === 0) {
      var story_list = []
      story_list = response.data
      res.render('index', { stories: story_list.data, title: "All Stories", des: 1 })
    } else {
      console.log(response.data.message)
    }
  }).catch(err => {
    console.log(err.message)
  })
}

const story_list_date_des = (req, res) => {
  axios.get(url + '/get_story_list?order=-date').then(response => {
    if (response.data.status === 0) {
      var story_list = []
      story_list = response.data
      res.render('index', { stories: story_list.data, title: "All Stories", des: -1 })
    } else {
      console.log(response.data.message)
    }
  }).catch(err => {
    console.log(err.message)
  })
}

const sotry_list_author = (req, res) => {
  axios.get(url + '/get_story_list?order=author').then(response => {
    if (response.data.status === 0) {
      var story_list = []
      story_list = response.data
      res.render('index', { stories: story_list.data, title: "All Stories", des: 1 })
    } else {
      console.log(response.data.message)
    }
  }).catch(err => {
    console.log(err.message)
  })
}

const story_list_author_des = (req, res) => {
  axios.get(url + '/get_story_list?order=-author').then(response => {
    if (response.data.status === 0) {
      var story_list = []
      story_list = response.data
      res.render('index', { stories: story_list.data, title: "All Stories", des: -1 })
    } else {
      console.log(response.data.message)
    }
  }).catch(err => {
    console.log(err.message)
  })
}

/**
 * redirect to the create_story view
 * @req request from user
 * @res response to the user
 */
const story_create_get = (req, res) => {
  res.render('create_story', { title: 'Create' })
}

/**
 * Create a new Story, and send new story info to server-app
 * @req request from user
 * @res response to the user
 */
const story_create_post = (req, res) => {
  const story_info = req.body

  if (story_info != null && imageURL != '') {
    axios.post(url + "/create_story", {
      title: story_info.title,
      content: story_info.content,
      author: story_info.author,
      photo: imageURL
    }).then(response => {
      res.status(201).json({
        story_id: response.data.data.story_id,
        title: story_info.title,
        content: story_info.content,
        author: story_info.author,
        photo: imageURL
      })
    }).catch(err => {
      res.status(400).json({ err: response.data.message })
    })
  } else {
    res.status(400).json({ err: "story_info or image cannot be empty" })
  }
}

/**
 * upload the image with base64 format to server-app
 * @req request from user
 * @res response to the user
 */
const upload_image = (req, res) => {
  const image = req.body
  axios.post(url + '/upload_image', image).then(response => {
    imageURL = response.data.data.url
  }).catch(err => {
    console.log(err.message)
    res.json({ err: err.message })
  })
}

/**
 * Show the story details, include photo, title and content
 * @req request from user
 * @res response to the user
 */
const story_details = (req, res) => {
  // const roomId = req.body.roomId
  // const storyId = req.body.storyId
  const storyId = req.params.id
  axios.get(url + "/get_story_detail?story_id=" + storyId).then(response => {
    var story = []
    if (response.data.status === 0) {
      story = response.data
      story.data.date = moment(story.data.date).format('MMMM Do YYYY, h:mm:ss a');
      res.render('details', { story: story.data, story_id: storyId, title: "Story Details" })
    } else {
      console.log(response.data.message)
    }
  }).catch(err => {
    console.log(err.message)
  })
}

const story_list = (req, res) => {
  axios.get(url + '/get_story_list').then(response => {
    if (response.data.status === 0) {
      var story_list = []
      story_list = response.data
      res.json(story_list.data);
    } else {
      console.log(response.data.message)
    }
  }).catch(err => {
    console.log(err.message)
  })
}

const create_story_bulk = (req, res) => {
  console.log('body', req.body);
  const storyList = req.body
  axios.post(url + "/create_story_in_bulk", {
    story_list: storyList,
  }).then((response) => {
    const result = response.data
    console.log('result',result)
    res.json(result)
  }).catch((err) => {
    console.error(err);
  });
}

/**
 * Delete the story by id
 * @req request from user
 * @res response to the user
 */
const story_delete = (req, res) => {

}

module.exports = {
  story_index,
  story_create_get,
  story_create_post,
  story_details,
  story_delete,
  upload_image,
  story_list_date,
  sotry_list_author,
  story_list_date_des,
  story_list_author_des,
  story_list,
  create_story_bulk,
}
