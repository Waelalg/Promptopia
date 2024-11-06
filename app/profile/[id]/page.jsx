"use client";

import { useEffect, useState } from "react";
import PromptCard from "@/components/PromptCard";

const UserProfile = ({ params }) => {
  const { id } = params; // User ID to filter by
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`/api/users/${id}/posts`);
        console.log("API response:", response);

        if (!response.ok) throw new Error("Failed to fetch user posts");

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.user && data.posts) {
          setUserData(data.user);
          setUserPosts(data.posts);
        } else {
          throw new Error("No user or posts found in response");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setError(error.message); // Set the error message if an error occurs
      }
    };

    const loadData = async () => {
      setLoading(true);
      await fetchUserPosts();
      setLoading(false);
    };

    loadData();
  }, [id]);

  // Log userData after state has updated
  useEffect(() => {
    if (userData) {
      console.log("Updated userData: ", userData);
    }
  }, [userData]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-600">Error: {error}</div>;

  if (!userData) return <div className="text-center">No user data available.</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex items-center space-x-6 mb-12">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={userData.image || "https://via.placeholder.com/150"} // Provide a fallback image if no image exists
            alt={userData.username}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{userData.username}'s Profile</h1>
        </div>
      </div>

      <div className="mt-6">
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userPosts.map((post) => (
              <PromptCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No posts available for this user.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
