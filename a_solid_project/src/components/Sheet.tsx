

type Card = {
  title: string;
};

type SheetProps = {
  card: Card;
};

export default function Sheet(props: SheetProps) {

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