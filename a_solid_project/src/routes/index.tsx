import { deleteCardsAction, getCards, getCardsUser } from "~/cards/flashcards";
import Layout from "~/components/Layout";
import Sheet from "~/components/Sheet";
import { getUser, logoutAction } from "~/session/session";
import { createAsync, createAsyncStore, useSubmission, type RouteDefinition, } from "@solidjs/router";
import { For, Show } from "solid-js";

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

  //console.log("cards", cards());

  return (
    <Layout protected>
      <main class="text-center mx-auto text-gray-700 p-4">
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">STAK</h1>
        <div class="flex flex-col flex-1 gap-4">
          <For each={filteredCards()}>
            {(card) => <Sheet card={card} showDelete />}
          </For>
        </div>
        <form method="post" action={logoutAction}>
          <input type="submit" value="Log out" />
        </form>
      </main>
    </Layout>
  );
}
