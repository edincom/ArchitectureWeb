import { deleteCardsAction } from "~/lib/server";

type Card = {
  id: string;
  title: string;
  owner: string;
  category: string;
  shared: boolean;
  content: {
    question_answers: Array<{
      question: string;
      answer: string;
    }>;
  };
  createdAt: Date;
  updatedAt: Date;
};

type SheetProps = {
  card: Card;
  showDelete?: boolean;
};

export default function Sheet(props: SheetProps) {
  return (
    <div class="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-sky-800 to-blue-500 text-white shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <a
        href={`/study/${props.card.id}`}
        class="flex items-center justify-center w-full h-full p-6 text-xl font-semibold tracking-wide text-white text-center hover:bg-white/10 transition"
      >
        {props.card.title}
      </a>

      {props.showDelete && (
        <form method="post" class="absolute top-2 right-2 z-10">
          <button
            formAction={deleteCardsAction.with(props.card.id)}
            class="w-9 h-9 bg-red-500 hover:bg-red-600 text-white text-base rounded-full shadow-md flex items-center justify-center transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
            title="Delete card"
          >
            X
          </button>
        </form>
      )}
    </div>
  );
}
