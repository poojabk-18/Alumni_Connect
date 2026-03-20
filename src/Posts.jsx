import { useState } from "react";
import { Link } from "react-router-dom";

function Posts() {
  const [newPost, setNewPost] = useState({ title: "", content: "", link: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Post created! (Feature coming soon with full backend)");
    setNewPost({ title: "", content: "", link: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-teal-200 py-12 px-4 font-[Poppins]">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-block text-teal-800 font-semibold text-xl hover:underline mb-12">← Back to Home</Link>
        
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl">
          <h1 className="text-4xl font-bold text-indigo-700 text-center mb-12">Share Your Story</h1>
          
          <form onSubmit={handleSubmit} className="bg-indigo-50 rounded-2xl p-8 mb-12 space-y-4">
            <input
              type="text"
              placeholder="What made you achieve this skill?"
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              className="w-full p-4 border rounded-xl text-xl focus:outline-none focus:border-indigo-500"
              required
            />
            <textarea
              placeholder="Share your journey..."
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              rows="4"
              className="w-full p-4 border rounded-xl focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="url"
              placeholder="Project link (optional)"
              value={newPost.link}
              onChange={(e) => setNewPost({...newPost, link: e.target.value})}
              className="w-full p-4 border rounded-xl focus:outline-none focus:border-indigo-500"
            />
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-full text-xl font-bold">
              Share Post
            </button>
          </form>
          
          <div className="text-center text-gray-600">
            <p>📝 Posts will appear here once created (full feature with backend coming soon!)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
