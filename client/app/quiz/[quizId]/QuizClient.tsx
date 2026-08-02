"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface QuizClientProps {
  quiz: any;
  userId: string;
}

export default function QuizClient({
  quiz,
}: QuizClientProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<
    Record<string, string>
  >({});

    const router = useRouter();

const [submitting, setSubmitting] = useState(false);

  const question = quiz.questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / quiz.questions.length) * 100;

  function selectAnswer(answer: string) {
    setAnswers({
      ...answers,
      [question.id]: answer,
    });
  }

  async function submitQuiz() {
  try {
    setSubmitting(true);

    const response = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizId: quiz.id,
        answers,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Quiz submit failed.");
      return;
    }

    router.push(`/quiz/${quiz.id}/result`);

  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  } finally {
    setSubmitting(false);
  }
}

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            {quiz.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {quiz.course.title}
          </p>

        </div>

        {/* Progress */}

        <div className="mb-8">

          <div className="mb-3 flex justify-between">

            <span className="font-medium">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>

            <span className="font-semibold text-blue-600">
              {Math.round(progress)}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Question Card */}

        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <h2 className="mb-8 text-2xl font-bold">

            Q{currentQuestion + 1}. {question.question}

          </h2>

          <div className="space-y-4">

            {[
              question.optionA,
              question.optionB,
              question.optionC,
              question.optionD,
            ].map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition

${
  answers[question.id] === option
    ? "border-blue-600 bg-blue-50"
    : "border-slate-200 hover:border-blue-400"
}`}
              >

                <input
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === option}
                  onChange={() => selectAnswer(option)}
                />

                <span className="text-lg">
                  {option}
                </span>

              </label>
            ))}

          </div>

                    {/* Navigation */}

          <div className="mt-10 flex items-center justify-between">

            <button
              onClick={() =>
                setCurrentQuestion((prev) => prev - 1)
              }
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 rounded-xl bg-slate-200 px-6 py-3 font-semibold transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            {currentQuestion < quiz.questions.length - 1 ? (

                <button
  onClick={() =>
    setCurrentQuestion((prev) => prev + 1)
  }
  disabled={!answers[question.id]}
  className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition
${
  answers[question.id]
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-slate-300 text-slate-500 cursor-not-allowed"
}`}
>
  Next
  <ArrowRight size={18} />
</button>

            ) : (

              <button
  onClick={submitQuiz}
  disabled={!answers[question.id] || submitting}
  className={`rounded-xl px-8 py-3 font-semibold transition
${
  answers[question.id]
    ? "bg-green-600 text-white hover:bg-green-700"
    : "bg-slate-300 text-slate-500 cursor-not-allowed"
}`}
>
  {submitting ? "Submitting..." : "Submit Quiz"}
</button>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}