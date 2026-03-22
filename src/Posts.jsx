import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Posts() {
  const { addPostBadge } = useAuth();
  const role = localStorage.getItem("role"); // 🔥 role check
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

  // 🔥 DELETE (only alumni)
  const handleDelete = (postId) => {
    if (role !== "alumni") {
      alert("Access denied 🚫");
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

  // 🔥 CREATE POST (only alumni)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (role !== "alumni") {
      alert("Only alumni can create posts 🚫");
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
      addPostBadge();
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
    if (role === "alumni") {
      setShowDeleteConfirm(postId);
    }
  };

  const cancelDelete = () => setShowDeleteConfirm(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-400 via-purple-300 to-teal-200 py-12 px-4 font-[Poppins]">
      <div className="max-w-3xl mx-auto">

        <Link to="/home" className="inline-block text-teal-800 font-semibold text-xl hover:underline mb-12">
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="bg-white/90 rounded-3xl p-12 shadow-2xl mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-indigo-700">
            {posts.length === 0 ? "Share Your First Story" : `Your Stories (${posts.length})`}
          </h1>

          {/* 🔥 Only alumni can see */}
          {role === "alumni" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold"
            >
              ➕ Add Post
            </button>
          )}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-2xl p-12">
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">No posts yet</h3>

              {/* 🔥 Only alumni */}
              {role === "alumni" && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-full"
                >
                  ➕ Create First Post
                </button>
              )}
            </div>
          ) : (
            posts.map((post, index) => (
              <div key={post.id} className="bg-white rounded-2xl p-8 shadow-xl flex justify-between">
                
                <div onClick={() => handleViewPost(index)} className="cursor-pointer flex-1">
                  <h3 className="text-xl font-bold text-indigo-700">{post.title}</h3>
                  <p className="text-gray-600">{post.content}</p>
                  <p className="text-xs text-gray-400 mt-2">{post.createdAt}</p>
                </div>

                {/* 🔥 Delete only alumni */}
                {role === "alumni" && (
                  <button
                    onClick={() => confirmDelete(post.id)}
                    className="text-red-500 ml-4"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ADD POST MODAL */}
      {showAddModal && role === "alumni" && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Create Post</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Title"
                className="w-full border p-2 rounded"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />

              <textarea
                placeholder="Content"
                className="w-full border p-2 rounded"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />

              <input
                type="file"
                onChange={handleMediaUpload}
              />

              <button className="bg-indigo-600 text-white px-4 py-2 rounded">
                Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl">
            <p>Delete this post?</p>

            <button onClick={() => handleDelete(showDeleteConfirm)} className="bg-red-500 text-white px-4 py-2 m-2">
              Delete
            </button>

            <button onClick={cancelDelete} className="bg-gray-300 px-4 py-2 m-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;