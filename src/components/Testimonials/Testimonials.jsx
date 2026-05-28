import TestimonialsSlider from "./TestimonialsSlider";

const Testimonials = async () => {
  const response = await fetch("https://nightclub2026.onrender.com/testimonials", {
    cache: "no-store",
  });

  const testimonials = await response.json();

  return <TestimonialsSlider testimonials={testimonials} />;
};

export default Testimonials;
