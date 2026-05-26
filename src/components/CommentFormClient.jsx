"use client";

import Button from "@/components/Button";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  content: z.string().min(10, "Comment must be at least 10 characters"),
});

const CommentFormClient = ({ eventId, initialComments }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const [comments, setComments] = useState(initialComments || []);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccess("");
    setSubmitError("");

    try {
      schema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};

        error.issues.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });

        setErrors(newErrors);
      }
      return;
    }

    try {
      const response = await fetch("https://nightclub2026.onrender.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: Number(eventId),
          name: formData.name,
          email: formData.email,
          content: formData.content,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const newComment = await response.json();

      setComments((prev) => [newComment, ...prev]);

      setSuccess("Comment submitted successfully!");

      setFormData({
        name: "",
        email: "",
        content: "",
      });
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="px-4 md:px-0">
      <h2 className="uppercase text-2xl font-bold mb-4 md:mt-20 mx-0 md:mx-30">Leave A Comment</h2>

      <form className="mx-0 md:mx-30" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <input type="text" name="name" placeholder="Your Name" className="w-full mb-2 p-4 border" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="text-pink-500 text-sm mb-4">{errors.name}</p>}
          </div>

          <div className="w-full">
            <input type="email" name="email" placeholder="Your Email" className="w-full mb-2 p-4 border" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-pink-500 text-sm mb-4">{errors.email}</p>}
          </div>
        </div>

        <textarea name="content" placeholder="Your Comment" rows={10} className="w-full mb-2 p-4 border" value={formData.content} onChange={handleChange} />

        {errors.content && <p className="text-pink-500 text-sm mb-4">{errors.content}</p>}

        {success && <p className="text-green-500 mb-4">{success}</p>}

        {submitError && <p className="text-pink-500 mb-4">{submitError}</p>}

        <div className="flex justify-center md:justify-end mb-10">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentFormClient;
