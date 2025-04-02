import { A } from "@solidjs/router";
import Counter from "~/components/Counter";
import Sheet from "~/components/Sheet";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">STAK</h1>
      <Counter />
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p>

      <div class="flex flex-col flex-1 gap-4">
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
        <Sheet />
      </div>

    </main>
  );
}
