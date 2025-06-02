import { deleteCardsAction } from "~/cards/flashcards";

type Card = {
  id: string;
  title: string;
};

type SheetProps = {
  card: Card;
  showDelete?: boolean;
};

// export default function Sheet(props: SheetProps) {
//   return (
//     <div>
//       <a
//         href={`/study/${props.card.id}`}
//         class="w-[300px] block text-center rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
//       >
//         {props.card.title}
//       </a>
//     </div>
//   );
// }

export default function Sheet(props: SheetProps) {
  return (
    <div class="relative w-[300px] text-center">
      <a
        href={`/study/${props.card.id}`}
        class="block rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
      >
        {props.card.title}
      </a>

      {props.showDelete && (
        <form method="post" class="absolute -top-3 -right-3 z-10">
          <button
            formAction={deleteCardsAction.with(props.card.id)}
            class="flex items-center gap-1 rounded-full bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300 text-white text-xs px-3 py-1 shadow-md transition-all"
            title="Delete card"
          >
            🗑️
          </button>
        </form>
      )}
    </div>
  );
}