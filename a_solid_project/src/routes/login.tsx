import { login, loginAction } from '~/session/login';
import LayoutCon from '~/components/LayoutCon';

export default function Login() {
    return (
      <LayoutCon protected>
      <main class="text-center mx-auto text-gray-700 p-4 max-w-md">
        <h1 class="text-6xl text-sky-700 font-thin uppercase my-16">WELCOME TO STAK</h1>
  
        <form method="post" action={loginAction} class="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
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
  
          <button
            type="submit"
            class="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 transition"
          >
            Login
          </button>
        </form>
  
        <div class="mt-6">
          <a
            href="/register"
            class="text-sky-700 underline hover:text-sky-900"
          >
            Register
          </a>
        </div>
      </main>
      </LayoutCon>
    );
  }
  