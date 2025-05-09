// import { useParams } from "@solidjs/router";

// export default function StudyPage() {
//   const params = useParams();
//   return <div>Stak  {params.title}</div>;
// }

import { useParams } from "@solidjs/router";

export default function StudyPage() {
  const params = useParams();

  return (
    <main class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white p-8">
      <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-xl w-full text-center border border-white/20">
        <h1 class="text-5xl font-extrabold mb-6 tracking-tight">
          Studying <span class="text-yellow-300">{decodeURIComponent(params.title ?? "")}</span> !
        </h1>
        <p class="text-lg text-white/80 mb-4">
          Ready to study? Let's GO!
        </p>
        <div class="mt-6 flex justify-center gap-4">
          {/* <button class="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200">
            Start
          </button> */}
          <a
            href={`/study/${params.title}/question`}
            class="w-[300px] block text-center rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
          >
            Start
          </a>
          {/* <button
            class="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-200">
            Back
          </button> */}
                    <a
            href="/"
            class="w-[300px] block text-center rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
          >
            Back
          </a>
        </div>
      </div>
    </main>
  );
}
