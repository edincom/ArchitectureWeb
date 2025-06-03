import { createAsyncStore, RouteDefinition, useParams } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { getCardById } from "~/lib/server";

export const route = {
  preload({ params }) {
    const id = decodeURIComponent(params.title ?? "");
    return getCardById(id);
  },
} satisfies RouteDefinition;

export default function StudyPage() {
  const [isStarted, setIsStarted] = createSignal(false);
  const [showAnswer, setShowAnswer] = createSignal(false);
  const [currentQuestion, setCurrentQuestion] = createSignal(null);

  const params = useParams();
  const id = decodeURIComponent(params.title ?? "");
  const card = createAsyncStore(() => getCardById(id), {
    initialValue: null,
  });

  const cardContent = () => card()?.content;

  const getRandomQuestion = () => {
    const content = cardContent();
    if (content?.question_answers && content.question_answers.length > 0) {
      const randomIndex = Math.floor(Math.random() * content.question_answers.length);
      return content.question_answers[randomIndex];
    }
    return null;
  };

  const getNextQuestion = () => {
    const question = getRandomQuestion();
    setCurrentQuestion(question);
    setShowAnswer(false);
  };

  return (
    <main class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-900 via-blue-800 to-blue-600 text-white p-8">
      <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-xl w-full text-center border border-white/20">
        <Show when={!isStarted()} fallback={(
          <div class="mt-8 bg-white/20 backdrop-blur-md p-8 rounded-xl">
            <p class="text-2xl font-semibold">{currentQuestion()?.question}</p>
            <Show when={showAnswer()}>
              <p class="mt-4 text-white">{currentQuestion()?.answer}</p>
            </Show>
            <div class="mt-6 flex justify-center gap-4 flex-wrap">
              <button
                class="w-[200px] rounded-full bg-gradient-to-b from-blue-800 to-blue-400 border border-white/30 hover:border-white/50 transition px-8 py-4 text-white"
                onClick={() => setShowAnswer(true)}
              >
                Show Answer
              </button>
              <button
                class="w-[200px] rounded-full bg-gradient-to-b from-blue-800 to-blue-400 border border-white/30 hover:border-white/50 transition px-8 py-4 text-white"
                onClick={getNextQuestion}
              >
                Next Question
              </button>
              <a
                href="/"
                class="w-[100px] rounded-full bg-gradient-to-b from-blue-800 to-blue-400 border border-white/30 hover:border-white/50 transition px-8 py-4 text-white text-center"
              >
                Done
              </a>
            </div>
          </div>
        )}>

          <h1 class="text-5xl font-extrabold mb-6 tracking-tight">
            Studying <span class="text-yellow-300">{card()?.title}</span>!
          </h1>
          <p class="text-lg text-white/80 mb-4">Ready to study? Let’s GO!</p>
          <div class="mt-6 flex justify-center gap-4 flex-wrap">
            <button
              class="w-[300px] rounded-full bg-gradient-to-b from-blue-800 to-blue-400 border border-white/30 hover:border-white/50 transition px-8 py-4 text-white"
              onClick={() => {
                setIsStarted(true);
                getNextQuestion();
              }}
            >
              Start
            </button>
            <a
              href="/"
              class="w-[300px] rounded-full bg-gradient-to-b from-blue-800 to-blue-400 border border-white/30 hover:border-white/50 transition px-8 py-4 text-white text-center"
            >
              Back
            </a>
          </div>
        </Show>
      </div>
    </main>
  );
}
