import { useSubmission } from "@solidjs/router";
import { Show } from "solid-js";
import Layout from "~/components/Layout";
import { generateAction } from "~/cards/generate";

export default function Create() {
    const submission = useSubmission(generateAction)
    return (
    <Layout protected>
      <main class="text-center text-gray-700 p-8 max-w-md bg-white rounded-lg shadow-lg -ml-1">
        <h1 class="text-4xl md:text-6xl text-sky-700 font-thin uppercase mb-8">Create your flashcards</h1>
        <Show when={submission.error}>
          <p class="text-red-500 mb-4">Error: {submission.error.message}</p>
        </Show>

        <form method='post' class="flex flex-col gap-4" action={generateAction}>
          <input
            type="title"
            name="title"
            placeholder="Title"
            class="p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            class="p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="text"
            name="content"
            placeholder="Content"
            class="p-3 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            class="bg-sky-700 text-white py-3 px-4 rounded hover:bg-sky-800 transition"
            disabled={submission.pending}
          >
            Generate
          </button>
        </form>
      </main>
    </Layout>

    );
}