import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FeedPage = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8001/api/feed')
      .then((res) => {
        setPosts(res.data.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <section className='feed-section'>

      {posts.length > 0 ? (
posts.map((post) => (
  <div key={post._id} className='post'>
    <img src={post.image} alt="Post" />

    <div className='post-body'>
      <div className='post-row'>
        <span className='label'>Title:</span>
        <span className='value'>{post.title}</span>
      </div>

      <div className='post-row'>
        <span className='label'>Description:</span>
        <span className='value'>{post.description}</span>
      </div>

      <div className='post-row'>
        <span className='label'>Link:</span>
        <a href={post.link} target='_blank' rel='noreferrer' className='value post-link'>
          {post.link}
        </a>
      </div>
    </div>
  </div>
))

      ) : (

        <p>No posts available</p>
        

      )}

    </section>
  )
}

export default FeedPage