import EventDetail from "@/components/EventDetail";
import Hero from "@/components/Hero";
import { Suspense } from "react";
import CommentForm from "@/components/CommentForm/CommentForm";
import Loader from "@/components/Loader";

const DetailEvent = async ({ params }) => {
  return (
    <main>
      <Suspense fallback={<Loader text="Loading event details..." />}>
        <FetchEventDetail params={params} />
      </Suspense>
    </main>
  );
};
const FetchEventDetail = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`https://nightclub2026.onrender.com/events/${id}`, {});
  const event = await response.json();

  const commentsResponse = await fetch(`https://nightclub2026.onrender.com/comments`);
  const commentsData = await commentsResponse.json();

  const comments = commentsData.filter((comment) => comment.eventId === Number(id)).slice(0, 3);

  return (
    <div>
      <EventDetail id={id} heroAsset={event.heroAsset?.url} title={event.title} description={event.description} date={event.date} doorsOpen={event.doorsOpen} location={event.location} category={event.category} price={event.price} ageLimit={event.ageLimit} lineup={event.lineup} schedule={event.schedule} />
      <h2 className="uppercase text-2xl font-bold mb-4 mt-10 px-4 md:mt-20 md:mx-30 md:px-0">{comments.length} Comments</h2>

      <div className="px-4 mb-10 md:mx-30 md:px-0 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <h3 className="font-bold text-lg">{comment.name}</h3>

              <span className="hidden md:block"> - </span>

              <p className="text-lg text-primary-500">
                Posted{" "}
                {new Date(comment.date).toLocaleDateString("da-DK", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <p className="text-gray-300 mt-2">{comment.content}</p>
          </div>
        ))}
      </div>
      <CommentForm eventId={id} />
    </div>
  );
};

export default DetailEvent;
