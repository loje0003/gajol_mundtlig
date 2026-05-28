"use client";

import { useActionState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import { contactAction } from "./actions";

const initialState = {
  errors: {},
  success: "",
  submitError: "",
};

export default function Contact() {
  const [state, formAction, pending] = useActionState(contactAction, initialState);

  return (
    <div>
      <Nav />
      <Hero text="Contact us" />

      <div className="min-h-screen flex items-center justify-center p-6">
        <form action={formAction} className="w-full max-w-2xl space-y-5">
          <div>
            <input type="text" name="name" placeholder="Your Name" className="w-full border  placeholder-white px-5 py-5 outline-none focus:border-white transition" />
            {state.errors?.name && <p className="text-primary-500 mt-2">{state.errors.name}</p>}
          </div>

          <div>
            <input type="email" name="email" placeholder="Your Email" className="w-full border placeholder-white px-5 py-5 outline-none focus:border-white transition" />
            {state.errors?.email && <p className="text-primary-500 mt-2">{state.errors.email}</p>}
          </div>

          <div>
            <textarea name="content" placeholder="Your Comment" rows={10} className="w-full border  placeholder-white px-5 py-5 outline-none focus:border-white transition" />
            {state.errors?.content && <p className="text-primary-500 mt-2">{state.errors.content}</p>}
          </div>

          <div className="text-right">
            <Button type="submit" variant="primary" disabled={pending}>
              {pending ? "Sending..." : "SEND"}
            </Button>
          </div>

          {state.submitError && <p className="text-primary-500 mt-2">{state.submitError}</p>}

          {state.success && <p className="text-primary-500">{state.success}</p>}
        </form>
      </div>
    </div>
  );
}
