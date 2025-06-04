import { createAsync, createAsyncStore, useSubmission } from "@solidjs/router";
import { Show } from "solid-js";
import Layout from "~/components/Layout";
import { generateAction } from "~/lib/ai";
import { getUser } from "~/lib/session/session";

export default function Create() {
  const user = createAsync(() => getUser());
  const mail = () => user()?.email
  const submission = useSubmission(generateAction)
  return (
    <Layout protected>
      <main class="mt-20 mx-auto text-gray-700 p-8 max-w-md bg-white rounded-lg shadow-lg">
        
        <h1 class="text-4xl md:text-4xl text-sky-700 font-thin uppercase mb-8">Create here</h1>
        <Show when={submission.error}>
          <p class="text-red-500 mb-4">Error: {submission.error.message}</p>
        </Show>

        <form method='post' class="flex flex-col gap-4" action={generateAction}>
          <input type="hidden" name="owner" value={mail()} />
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
      <div class="mt-4">
        <Show when={submission.pending}>
          <div class="loader mx-auto" />
        </Show>
        <Show when={submission.result && !submission.pending}>
          <p class="text-green-600 text-sm text-center">Done!</p>
        </Show>
      </div>
    </Layout>

  );
}