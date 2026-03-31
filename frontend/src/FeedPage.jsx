import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/feed")
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50 to-indigo-100 p-8">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Community Feed
      </h1>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">

          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              {post.image && (
                <div className="w-full bg-gray-100 rounded-xl overflow-hidden flex justify-center">
                  <img
                    src={post.image}
                    alt="Post"
                    className="
                      w-full
                      max-h-[450px]
                      object-contain
                      rounded-xl
                    "
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col gap-4">

                {/* Title */}
                <div>
                  <span className="font-semibold text-gray-700">
                    Title:
                  </span>

                  <p className="text-lg font-medium text-gray-900">
                    {post.title}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <span className="font-semibold text-gray-700">
                    Description:
                  </span>

                  <p className="text-gray-800 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {/* Link */}
                {post.link && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Link:
                    </span>

                    <a
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        text-blue-600
                        hover:text-blue-800
                        hover:underline
                        break-all
                        ml-2
                      "
                    >
                      {post.link}
                    </a>
                  </div>
                )}

              </div>
            </div>
          ))}

        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600 text-lg">
            No posts available
          </p>
        </div>
      )}

    </section>
  );
};

export default FeedPage;