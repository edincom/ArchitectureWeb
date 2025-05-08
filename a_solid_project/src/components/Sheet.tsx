// This file represent a component that when clicked on will display a flash card system
// The component is a button that when clicked will display a flash card system
// The flash card system will display a question and an answer


import { createSignal } from "solid-js";

type Card = {
  title: string;
};

type SheetProps = {
  card: Card;
};

export default function Sheet(props: SheetProps) {
  const [clicked, setClicked] = createSignal(false);

  return (
    // <button
    //   class="w-[300px] rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
    //   onClick={() => setClicked(true)}
    // >
    //   {props.card.title}
    // </button>


    <div>
      <a
        href={`/study/${props.card.title}`}
        class="w-[300px] block text-center rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
      >
        {props.card.title}
      </a>
    </div>


  );
}