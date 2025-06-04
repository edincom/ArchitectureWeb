import {
  deleteCardsAction,
  getCards,
  getCardsUser,
} from "~/lib/server";
import Layout from "~/components/Layout";
import Sheet from "~/components/Sheet";
import { getUser, logoutAction } from "~/lib/session/session";
import {
  createAsync,
  createAsyncStore,
  useSubmission,
  type RouteDefinition,
} from "@solidjs/router";
import { For } from "solid-js";

export const route = {
  preload() {
    getCards();
  },
} satisfies RouteDefinition;

export default function Home() {
  const user = createAsync(() => getUser());
  const owner = () => user()?.email;
  const cards = createAsyncStore(() => getCardsUser(owner()), {
    initialValue: [],
  });
  const deletingCards = useSubmission(deleteCardsAction);

  const filteredCards = () =>
    cards().filter((card) => {
      const submissions = Array.isArray(deletingCards) ? deletingCards : [];
      return !submissions.some((sub) => sub.input[0] === card.id);
    });

  return (
    <Layout protected>
      <main class="text-white bg-background min-h-screen py-10 px-4">
        <h1 class="text-4xl md:text-3xl font-bold uppercase text-highlight text-center mb-12">
          List of decks
        </h1>

        <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 md:px-8">
          <For each={filteredCards()}>
            {(card) => (
              <div class="bg-accent text-white rounded-xl shadow-md p-4 transition hover:scale-[1.02]">
                <Sheet card={card} showDelete />
              </div>
            )}
          </For>
        </section>

        <form method="post" action={logoutAction} class="mt-16 text-center">
          <button
            type="submit"
            class="bg-primary hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-200"
          >
            🔒 Log out
          </button>
        </form>
      </main>
    </Layout>
  );
}
