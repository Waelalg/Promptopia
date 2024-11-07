// pages/update-prompt.js
"use client";
import dynamic from "next/dynamic";

// Dynamically import the UpdatePrompt component with no SSR
const UpdatePromptClient = dynamic(() => import("@/components/UpdatePromptClient"), { ssr: false });

const UpdatePromptPage = () => {
  return <UpdatePromptClient />;
};

export default UpdatePromptPage;
