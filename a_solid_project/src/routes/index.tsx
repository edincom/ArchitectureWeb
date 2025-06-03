import { deleteCardsAction, getCards, getCardsUser } from "~/lib/server";
import Layout from "~/components/Layout";
import Sheet from "~/components/Sheet";
import { getUser, logoutAction } from "~/lib/session/session";
import { createAsync, createAsyncStore, useSubmission, type RouteDefinition, } from "@solidjs/router";
import { For } from "solid-js";

export const route = {
  preload() {
    getCards();
  },
} satisfies RouteDefinition;

export default function Home() {
  const user = createAsync(() => getUser());
  const owner = () => user()?.email
  const cards = createAsyncStore(() => getCardsUser(owner()), {
    initialValue: [],
  });
  const deletingCards = useSubmission(deleteCardsAction)

  const filteredCards = () =>
    cards().filter((card) => {
      const submissions = Array.isArray(deletingCards) ? deletingCards : [];
      return !submissions.some((sub) => sub.input[0] === card.id);
    });

  return (
    <Layout protected>
      <main class="text-center mx-auto text-gray-700 p-4">
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">STAK</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <For each={filteredCards()}>
            {(card) => <Sheet card={card} showDelete />}
          </For>
        </div>

        <form method="post" action={logoutAction} class="mt-12">
          <button
            type="submit"
            class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition duration-200"
          >
            🔒 Log out
          </button>
        </form>
      </main>
    </Layout>
  );
}
