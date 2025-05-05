import { useSubmission } from '@solidjs/router';
import { Show } from 'solid-js';
import LayoutCon from '~/components/LayoutCon';
import { registerAction } from '~/session/registration';

export default function Register() {
  const submission = useSubmission(registerAction)

  return (
    <LayoutCon protected>
    <main class="text-center mx-auto text-gray-700 p-4 max-w-md">
      <h1 class="text-6xl text-sky-700 font-thin uppercase my-16">WELCOME TO STAK</h1>
      <Show when={submission.error}>
        <p>Error: {submission.error.message}</p>
      </Show>

      <form method='post' class="flex flex-col gap-4" action={registerAction}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          class="p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          class="p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          class="p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Type in your password one more time"
          class="p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          class="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 transition"
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
            Already have an account ? Login
          </a>
        </div>
    </main>
    </LayoutCon>

  );
}
