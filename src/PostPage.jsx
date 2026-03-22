import { Link, useState, useEffect } from "react";

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      console.log("🔍 Checking localStorage...");
      const saved = localStorage.getItem('userPosts');
      console.log("📦 Found:", saved);
      
      if (saved) {
        const parsedPosts = JSON.parse(saved);
        console.log("✅ Loaded posts:", parsedPosts);
        setPosts(Array.isArray(parsedPosts) ? parsedPosts : []);
      } else {
        console.log("ℹ️ No posts in localStorage");
      }
    } catch (error) {
      console.error("❌ localStorage error:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // DEBUG: Show even if loading
  if (loading) {
    return (
      <div style={{minHeight: '100vh', padding: '2rem', background: '#f3f4f6', fontFamily: 'system-ui'}}>
        <div style={{maxWidth: '48rem', margin: '0 auto'}}>
          <h1 style={{color: '#374151', fontSize: '1.5rem'}}>Loading posts...</h1>
          <p>Open F12 Console to see debug info!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
        hello worldcd
    </div>
  );
}

export default PostPage;
