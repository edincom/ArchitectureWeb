import { getCards } from "~/cards/flashcards";
import Layout from "~/components/Layout";
import Sheet from "~/components/Sheet";
import { logoutAction } from "~/session/session";
import { createAsyncStore, type RouteDefinition, } from "@solidjs/router";

export const route = {
  preload() {
    getCards();
  },
} satisfies RouteDefinition;

export default function Home() {
  const cards = createAsyncStore(() => getCards(), {
    initialValue: [],
  });
  console.log("cards", cards());

  return (
    <Layout protected>
      <main class="text-center mx-auto text-gray-700 p-4">
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">STAK</h1>
        <div class="flex flex-col flex-1 gap-4">
          {cards() &&
            cards()!.map((card: { title: string; id: string}, index: any) => (
              <Sheet card={card} />
            ))}
        </div>
        <form method="post" action={logoutAction}>
          <input type="submit" value="Log out" />
        </form>
      </main>
    </Layout>
  );
}
