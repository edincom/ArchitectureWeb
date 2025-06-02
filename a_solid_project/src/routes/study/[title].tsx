import { createAsyncStore, RouteDefinition, useParams } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { getCardById } from "~/cards/flashcards";

export default function StudyPage() {
  const [isStarted, setIsStarted] = createSignal(false); // Controls if the question is displayed
  const [showAnswer, setShowAnswer] = createSignal(false); // Controls if the answer is shown
  const [currentQuestion, setCurrentQuestion] = createSignal(null); // Holds the current random question
  const params = useParams();
  const id = decodeURIComponent(params.title ?? "");

  const card = createAsyncStore(() => getCardById(id), {
    initialValue: null,
  });

  const cardContent = () => card()?.content;

  // Function to get a random question
  const getRandomQuestion = () => {
    const content = cardContent();
    if (content?.question_answers && content.question_answers.length > 0) {
      const randomIndex = Math.floor(Math.random() * content.question_answers.length);
      return content.question_answers[randomIndex];
    }
    return null;
  };

  // Function to set a new random question
  const getNextQuestion = () => {
    const question = getRandomQuestion();
    setCurrentQuestion(question);
    setShowAnswer(false); // Reset answer visibility when changing questions
  };

  const route = {
    preload({ params }) {
      const id = decodeURIComponent(params.title ?? "");
      return getCardById(id);
    },
  } satisfies RouteDefinition;

  return (
    <main class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white p-8">
      <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-xl w-full text-center border border-white/20">
        <Show when={!isStarted()} fallback={(
          <div class="mt-8 bg-white/20 backdrop-blur-md p-8 rounded-xl">
            <p class="text-2xl font-semibold">{currentQuestion()?.question}</p>
            <Show when={showAnswer()}>
              <p class="mt-4 text-white">{currentQuestion()?.answer}</p>
            </Show>
            <div class="mt-6 flex justify-center gap-4">
              <button
                class="w-[200px] block text-center rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
                onClick={() => setShowAnswer(true)} // Show the answer
              >
                Show Answer
              </button>
              <button
                class="w-[200px] block text-center rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
                onClick={getNextQuestion} // Load the next question
              >
                Next Question
              </button>
              <div>
                <a
                  href='/'
                  class="w-[100px] block text-center rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
                >
                  Done
                </a>
              </div>
            </div>
          </div>
        )}>

          <h1 class="text-5xl font-extrabold mb-6 tracking-tight">
            Studying <span class="text-yellow-300">{card()?.title}</span>!
          </h1>
          <p class="text-lg text-white/80 mb-4">
            Ready to study? Let's GO!
          </p>
          <div class="mt-6 flex justify-center gap-4">
            <button
              class="w-[300px] block text-center rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
              onClick={() => {
                setIsStarted(true);
                getNextQuestion(); // Load the first question when starting
              }}
            >
              Start
            </button>
            <a
              href="/"
              class="w-[300px] block text-center rounded-full bg-gradient-to-b from-purple-900 to-purple-300 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem] text-white"
            >
              Back
            </a>
          </div>
        </Show>
      </div>
    </main>
  );
}