import CommentFormClient from "./CommentFormClient";

const getComments = async (eventId) => {
  const res = await fetch(`https://nightclub2026.onrender.com/comments?eventId=${eventId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json();
};

const CommentForm = async ({ eventId }) => {
  const comments = await getComments(eventId);

  return <CommentFormClient eventId={eventId} initialComments={comments} />;
};

export default CommentForm;
