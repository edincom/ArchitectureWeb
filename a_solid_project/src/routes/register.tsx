import { useSubmission } from '@solidjs/router';
import { Show } from 'solid-js';
import { registerAction } from '~/lib/session/registration';
import LayoutCon from '~/components/LayoutCon';

export default function Register() {
  const submission = useSubmission(registerAction)

  return (
    <LayoutCon protected>
      <main class="text-center text-gray-700 p-8 max-w-md bg-white rounded-lg shadow-lg -ml-32">
        <h1 class="text-4xl md:text-6xl text-sky-700 font-thin uppercase mb-8">WELCOME TO STAK</h1>
        <Show when={submission.error}>
          <p class="text-red-500 mb-4">Error: {submission.error.message}</p>
        </Show>

        <form method='post' class="flex flex-col gap-4" action={registerAction}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            class="p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            class="p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            class="p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="text"
            name="profession"
            placeholder="Profession"
            class="p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            class="p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Type in your password one more time"
            class="p-3 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            class="bg-sky-700 text-white py-3 px-4 rounded hover:bg-sky-800 transition"
            disabled={submission.pending}
          >
            Register
          </button>
        </form>

        <div class="mt-6">
          <a
            href="/login"
            class="text-sky-700 underline hover:text-sky-900"
          >
            Already have an account? Login
          </a>
        </div>
      </main>
    </LayoutCon>
  );
}