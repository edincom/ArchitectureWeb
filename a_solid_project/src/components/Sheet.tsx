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
        <form method="post" class="absolute top-2 right-2">
          <button
            formAction={deleteCardsAction.with(props.card.id)}
            class="text-xs bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </form>
      )}
    </div>
  );
}