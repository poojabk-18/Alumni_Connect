import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";  
import { useNavigate } from 'react-router-dom'
import axios from "axios"



function CreatePost() {

  const navigate = useNavigate()

  const { addPostBadge } = useAuth();  
  const [posts, setPosts] = useState([]);  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(null);  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: null,  
    mediaPreview: ""
  });

  // Delete post
  const handleDelete = (postId) => {
    const updatedPosts = posts.filter(
      post => post.id !== postId
    );

    setPosts(updatedPosts);

    setShowDeleteConfirm(null);

    if (updatedPosts.length === 0) {
      alert("All posts deleted!");
    }
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];

    if (
      file &&
      (
        file.type.startsWith("image/") ||
        file.type.startsWith("video/")
      )
    ) {
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

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    axios.post('http://localhost:8001/api/post-content',formData)
    .then((res) => {
      navigate('/feed')
    })
    .catch(err => console.error(err))

    // const updatedPosts = [newPost, ...posts];

    // setPosts(updatedPosts);

    if (posts.length === 0) {
      addPostBadge();
      alert("🎉 First post created! You've earned 'First Post' badge!");
    } else {
      alert("Post created successfully!");
    }

    setShowAddModal(false);

    setFormData({
      title: "",
      description: "",
      link: "",
      image: null,
      mediaPreview: ""
    });
  };

  const handleViewPost = (index) => setShowPostModal(index);
  const handleClosePost = () => setShowPostModal(null);
  const confirmDelete = (postId) => setShowDeleteConfirm(postId);
  const cancelDelete = () => setShowDeleteConfirm(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-teal-200 py-12 px-4 font-[Poppins]">
      <div className="max-w-3xl mx-auto">

        <Link
          to="/"
          className="inline-block text-teal-800 font-semibold text-xl hover:underline mb-12"
        >
          ← Back to Home
        </Link>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl mb-8">
          <div className="flex justify-between items-center mb-8">

            <h1 className="text-4xl font-bold text-indigo-700">
              {posts.length === 0
                ? "Share Your First Story"
                : `Your Stories (${posts.length})`}
            </h1>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold transition shadow-lg"
            >
              ➕ Add Post
            </button>

          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">

          {posts.length === 0 ? (

            <div className="text-center py-20 bg-white/50 rounded-2xl p-12">

              <div className="text-6xl mb-4">
                📝
              </div>

              <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                No posts yet
              </h3>

              <p className="text-gray-600 mb-6">
                Create your first post to share your journey!
              </p>

              <button
                onClick={() => setShowAddModal(true)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700"
              >
                ➕ Create First Post
              </button>

            </div>

          ) : (

            posts.map((post, index) => (

              <div
                key={post.id}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition"
              >

                <div className="flex items-start justify-between">

                  <div
                    className="flex items-start gap-4 flex-1 cursor-pointer"
                    onClick={() => handleViewPost(index)}
                  >

                    {post.mediaPreview && (

                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

                        {post.mediaPreview.startsWith("data:image/") ? (

                          <img
                            src={post.mediaPreview}
                            alt="Post media"
                            className="w-full h-full object-cover"
                          />

                        ) : (

                          <video
                            src={post.mediaPreview}
                            className="w-full h-full object-cover"
                            muted
                          />

                        )}

                      </div>

                    )}

                    <div className="flex-1">

                      <h3 className="text-xl font-bold text-indigo-700 mb-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.content}
                      </p>

                      {post.link && (

                        <a
                          href={post.link}
                          target="_blank"
                          className="text-indigo-500 hover:underline text-sm"
                        >
                          🔗 View Project
                        </a>

                      )}

                      <p className="text-xs text-gray-400 mt-2">
                        {post.createdAt}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => confirmDelete(post.id)}
                    className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                    title="Delete post"
                  >
                    🗑️
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* Modals remain exactly unchanged below */}
 {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title of post"
                // value={formData.title}
                // onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-4 border rounded-xl text-xl focus:outline-none focus:border-indigo-500"
                required
              />
              <textarea 
                name="description"
                placeholder="Share your experience..."
                // value={formData.content}
                // onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows="4"
                className="w-full p-4 border rounded-xl focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="url"
                name="link"
                placeholder="Project link (optional)"
                // value={formData.link}
                // onChange={(e) => setFormData({...formData, link: e.target.value})}
                className="w-full p-4 border rounded-xl focus:outline-none focus:border-indigo-500"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📸 Optional Media (Image/Video)</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"                      //,video/* not adding video access for now
                  onChange={handleMediaUpload}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 transition"
                />
                {formData.mediaPreview && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    {formData.mediaPreview.startsWith('data:image/') ? (
                      <img src={formData.mediaPreview} alt="Preview" className="max-w-full max-h-48 rounded-lg object-cover" />
                    ) : (
                      <video src={formData.mediaPreview} className="max-w-full max-h-48 rounded-lg object-cover" controls muted />
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit" 
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition"
                >
                  Share Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Post Modal - UNCHANGED */}
      {showPostModal !== null && posts[showPostModal] && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-indigo-700">{posts[showPostModal].title}</h2>
              <button onClick={handleClosePost} className="text-2xl hover:text-indigo-600">×</button>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed mb-6">{posts[showPostModal].content}</p>
              {posts[showPostModal].mediaPreview && (
                <div className="mb-6">
                  {posts[showPostModal].mediaPreview.startsWith('data:image/') ? (
                    <img src={posts[showPostModal].mediaPreview} alt="Post media" className="w-full max-h-96 rounded-2xl object-cover" />
                  ) : (
                    <video src={posts[showPostModal].mediaPreview} className="w-full max-h-96 rounded-2xl object-cover" controls />
                  )}
                </div>
              )}
              {posts[showPostModal].link && (
                <a href={posts[showPostModal].link} target="_blank" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 mt-4">
                  🔗 View Project
                </a>
              )}
              <p className="text-sm text-gray-500 mt-6">{posts[showPostModal].createdAt}</p>
            </div>
          </div>
        </div>
      )}


      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🗑️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Delete Post?
              </h3>
              <p className="text-gray-600">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">

              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-medium transition"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition"
              >
                Delete Post
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default CreatePost;