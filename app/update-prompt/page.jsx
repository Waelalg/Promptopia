"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // We use a local state to store the prompt ID after mounting
  const [promptId, setPromptId] = useState(null);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  // Set the prompt ID once the component has mounted
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) setPromptId(id);
  }, [searchParams]);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (promptId) {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
