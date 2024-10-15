// pages/api/uploadBlog.js
import { D1Database } from '@cloudflare/workers-types'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content,description,image,date,url,file,authorName } = req.body
    // Initialize D1 database
    const db = new D1Database('YOUR_DATABASE_NAME')
    try {
      // Insert blog data into D1
      await db.prepare('INSERT INTO blogs (title, content,description,image,date,url,file,authorName) VALUES (?, ?)')
        .bind(title, content,description,image,date,url,file,authorName)
        .run()
      res.status(200).json({ message: 'Blog uploaded successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload blog' })
    }
    res.status(405).json({ error: 'Method not allowed' })
  }
}
// pages/api/getBlogs.js
import { D1Database } from '@cloudflare/workers-types'
export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Initialize D1 database
    const db = new D1Database('YOUR_DATABASE_NAME')
    try {
      // Retrieve blogs from D1
      const blogs = await db.prepare('SELECT * FROM blogs').all()
      res.status(200).json(blogs)
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve blogs' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
// pages/index.js
import { useState, useEffect } from 'react'
export default function Home() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    async function fetchBlogs() {
      const response = await fetch('/api/getBlogs')
      const data = await response.json()
      setBlogs(data)
    }
    fetchBlogs()
  }, [])
  async function handleSubmit(event) {
    event.preventDefault()
    const title = event.target.title.value
    const content = event.target.content.value
    const response = await fetch('/api/uploadBlog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
    if (response.ok) {
      // Refresh the blog list
      const updatedBlogs = await fetch('/api/getBlogs').then(res => res.json())
      setBlogs(updatedBlogs)
    }
  }
  return (
    <div>
      <h1>Blog Upload and Display</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Blog Title" required />
        <textarea name="content" placeholder="Blog Content" required></textarea>
        <button type="submit">Upload Blog</button>
      </form>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <p>{blog.description}</p>
          <p>{blog.image}</p>
          <p>{blog.url}</p>
          <p>{blog.file}</p>
          <p>{blog.authorName}</p>
          <p>{blog.date}</p>
        </div>
      ))}
    </div>
  )
}