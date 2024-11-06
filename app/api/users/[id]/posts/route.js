import { connectToDB } from "@/utils/database"; // Assuming you have a DB connection utility
import User from "@/models/user"; 
import Prompt from "@/models/prompt";
export const GET = async (req, { params }) => {
  const { id } = params; // Get user ID from the route

  try {
    await connectToDB();

    // Fetch user data
    const user = await User.findById(id);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Fetch posts by the user
    const posts = await Prompt.find({ "creator": id }).populate("creator");
    return new Response(JSON.stringify({ user, posts }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch user data and posts", { status: 500 });
  }
};
