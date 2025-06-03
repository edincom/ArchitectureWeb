import { deleteCardsAction } from "~/lib/server";

type Card = {
  id: string;
  title: string;
};

type SheetProps = {
  card: Card;
  showDelete?: boolean;
};

export default function Sheet(props: SheetProps) {
  return (
    <div class="relative aspect-square w-full max-w-[250px] rounded-2xl overflow-hidden bg-gradient-to-br from-sky-600 to-blue-400 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <a
        href={`/study/${props.card.id}`}
        class="flex items-center justify-center w-full h-full p-6 text-xl font-semibold tracking-wide text-white text-center"
      >
        {props.card.title}
      </a>

      {props.showDelete && (
        <form method="post" class="absolute top-2 right-2 z-10">
          <button
            formAction={deleteCardsAction.with(props.card.id)}
            class="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300 text-white text-sm shadow-md transition-all"
            title="Delete card"
          >
            🗑️
          </button>
        </form>
      )}
    </div>
  );
}