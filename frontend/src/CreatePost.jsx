import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/UseAuth";
import axios from "axios";

function CreatePost() {
  const { isAlumni } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
    mediaPreview: "",
  });

  const savePosts = (newPosts) => {
    setPosts(newPosts);
  };

  // DELETE (ALUMNI ONLY)
 const handleDelete = async (postId) => {
  if (!isAlumni) {
    alert("Only alumni can delete posts 🚫");
    return;
  }

  try {
    await axios.delete(`http://localhost:8001/api/posts/${postId}`);
    const updatedPosts = posts.filter((post) => post._id !== postId);
    setPosts(updatedPosts);
    setShowDeleteConfirm(null);
    if (updatedPosts.length === 0) {
      alert("All posts deleted!");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to delete post ❌");
  }
};

  // Media upload
  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          mediaPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // CREATE POST (ALUMNI ONLY)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAlumni) {
      alert("Only alumni can create posts 🚫");
      navigate("/home");
      return;
    }

    const data = new FormData(e.target);

    axios
      .post("http://localhost:8001/api/post-content", data)
      .then(() => {
        alert(posts.length === 0 ? "🎉 First post created!" : "Post created successfully!");
        setShowAddModal(false);
        setFormData({ title: "", description: "", link: "", image: null, mediaPreview: "" });
        navigate("/feed");
      })
      .catch((err) => console.error(err));
  };

  const handleViewPost = (index) => setShowPostModal(index);
  const handleClosePost = () => setShowPostModal(null);
  const confirmDelete = (postId) => { if (isAlumni) setShowDeleteConfirm(postId); };
  const cancelDelete = () => setShowDeleteConfirm(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-300 to-teal-200 p-6 font-[Poppins]">
  <div className="w-full max-w-4xl mx-auto">

        <Link to="/home" className="inline-block text-teal-800 font-semibold text-xl hover:underline mb-12">
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="bg-white/90 rounded-3xl p-12 shadow-2xl mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-indigo-700">
            {posts.length === 0 ? "Share Your First Story" : `Your Stories (${posts.length})`}
          </h1>
          {isAlumni && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all"
            >
              ➕ Add Post
            </button>
          )}
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-2xl p-12 shadow-xl">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">No posts yet</h3>
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
                    <p className="text-gray-600 mb-3">{post.description}</p>
                    <p className="text-xs text-gray-400">{post.createdAt}</p>
                    {post.mediaPreview && (
                      <img src={post.mediaPreview} alt="Post media" className="mt-3 w-full max-w-sm rounded-lg" />
                    )}
                  </div>
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

      {/* ADD POST MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Create New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title of post"
                className="w-full p-4 border rounded-xl text-xl focus:outline-none focus:border-indigo-500"
                required
              />
              <textarea
                name="description"
                placeholder="Share your experience..."
                rows="4"
                className="w-full p-4 border rounded-xl focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="url"
                name="link"
                placeholder="Project link (optional)"
                className="w-full p-4 border rounded-xl focus:outline-none focus:border-indigo-500"
              />
              <div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleMediaUpload}
                  className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50"
                />
                {formData.mediaPreview && (
                  <img src={formData.mediaPreview} alt="Preview" className="mt-3 w-full max-w-sm rounded-lg shadow-md" />
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

      {/* VIEW POST MODAL */}
      {showPostModal !== null && posts[showPostModal] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-700">{posts[showPostModal].title}</h2>
              <button onClick={handleClosePost} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">✕</button>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed mb-6">{posts[showPostModal].description}</p>
              {posts[showPostModal].mediaPreview && (
                <div className="mb-6">
                  {posts[showPostModal].mediaPreview.startsWith("data:image/") ? (
                    <img src={posts[showPostModal].mediaPreview} alt="Post media" className="w-full max-h-96 rounded-2xl object-cover" />
                  ) : (
                    <video src={posts[showPostModal].mediaPreview} className="w-full max-h-96 rounded-2xl object-cover" controls />
                  )}
                </div>
              )}
              {posts[showPostModal].link && (
                <a href={posts[showPostModal].link} target="_blank" rel="noreferrer" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 mt-4">
                  🔗 View Project
                </a>
              )}
              <p className="text-sm text-gray-500 mt-6">{posts[showPostModal].createdAt}</p>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🗑️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Post?</h3>
              <p className="text-gray-600">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all"
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