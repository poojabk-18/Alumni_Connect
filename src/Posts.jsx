import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/UseAuth"   // ✅ NEW IMPORT (create hooks/useAuth.js first)

function Posts() {
  const { isAlumni } = useAuth();  // ✅ Perfect role check
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    link: "",
    media: null,
    mediaPreview: ""
  });

  // Load posts
  useEffect(() => {
    const saved = localStorage.getItem("userPosts");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  // Save posts
  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem("userPosts", JSON.stringify(newPosts));
  };

  // 🔥 DELETE (ALUMNI ONLY)
  const handleDelete = (postId) => {
    if (!isAlumni) {
      alert("Only alumni can delete posts 🚫");
      return;
    }

    const updatedPosts = posts.filter(post => post.id !== postId);
    savePosts(updatedPosts);
    setShowDeleteConfirm(null);

    if (updatedPosts.length === 0) {
      alert("All posts deleted!");
    }
  };

  // Media upload
  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          media: file,
          mediaPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔥 CREATE POST (ALUMNI ONLY)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAlumni) {
      alert("Only alumni can create posts 🚫");
      navigate("/home");  // Redirect students
      return;
    }

    const newPost = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toLocaleDateString()
    };

    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);

    if (posts.length === 0) {
      alert("🎉 First post created!");
    } else {
      alert("Post created successfully!");
    }

    setShowAddModal(false);
    setFormData({ title: "", content: "", link: "", media: null, mediaPreview: "" });
  };

  const handleViewPost = (index) => setShowPostModal(index);
  const handleClosePost = () => setShowPostModal(null);

  const confirmDelete = (postId) => {
    if (isAlumni) {
      setShowDeleteConfirm(postId);
    }
  };

  const cancelDelete = () => setShowDeleteConfirm(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-teal-200 py-12 px-4 font-[Poppins]">
      <div className="max-w-3xl mx-auto">

        <Link to="/home" className="inline-block text-teal-800 font-semibold text-xl hover:underline mb-12">
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="bg-white/90 rounded-3xl p-12 shadow-2xl mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-indigo-700">
            {posts.length === 0 ? "Share Your First Story" : `Your Stories (${posts.length})`}
          </h1>

          {/* 🔥 ALUMNI ONLY: Add Post Button */}
          {isAlumni && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all"
            >
              ➕ Add Post
            </button>
          )}
        </div>

        {/* Posts List - VISIBLE TO BOTH */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-2xl p-12 shadow-xl">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">No posts yet</h3>
              
              {/* 🔥 ALUMNI ONLY: Create button */}
              {isAlumni ? (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
                >
                  ➕ Create First Post
                </button>
              ) : (
                <p className="text-gray-600 text-lg">Students can view posts. Alumni can create posts.</p>
              )}
            </div>
          ) : (
            posts.map((post, index) => (
              <div key={post.id} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                <div className="flex justify-between items-start">
                  <div onClick={() => handleViewPost(index)} className="cursor-pointer flex-1">
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-3">{post.content}</p>
                    <p className="text-xs text-gray-400">{post.createdAt}</p>
                    
                    {post.mediaPreview && (
                      <img src={post.mediaPreview} alt="Post media" className="mt-3 w-full max-w-sm rounded-lg" />
                    )}
                  </div>

                  {/* 🔥 DELETE BUTTON - ALUMNI ONLY */}
                  {isAlumni && (
                    <button
                      onClick={() => confirmDelete(post.id)}
                      className="text-red-500 hover:text-red-700 text-xl font-bold ml-4 hover:bg-red-50 p-2 rounded-lg"
                      title="Delete post"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ADD POST MODAL - ALUMNI ONLY */}
      {showAddModal && isAlumni && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">Create New Post</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Post Title"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <textarea
                  placeholder="Share your story..."
                  rows="5"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                />
              </div>

              <div>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50"
                />
                {formData.mediaPreview && (
                  <img 
                    src={formData.mediaPreview} 
                    alt="Preview" 
                    className="mt-3 w-full max-w-sm rounded-lg shadow-md" 
                  />
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-bold shadow-lg transition-all"
                >
                  📤 Publish Post
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-6 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM - ALUMNI ONLY */}
      {showDeleteConfirm && isAlumni && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <h3 className="text-xl font-bold text-red-600 mb-4">Delete Post?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition-all"
              >
                🗑️ Delete
              </button>
              <button 
                onClick={cancelDelete}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
