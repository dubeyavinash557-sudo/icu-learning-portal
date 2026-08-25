"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Loader2,
} from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface QuizClientProps {
  quiz: {
    id: string;
    title: string;
    course: {
      title: string;
    };
    questions: QuizQuestion[];
  };
}

export default function QuizClient({
  quiz,
}: QuizClientProps) {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState<
    Record<string, string>
  >({});

  const [submitting, setSubmitting] =
    useState(false);

  const questions = quiz.questions;

  // --------------------------------------------------
  // Empty quiz protection
  // --------------------------------------------------
  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
            <h1 className="text-2xl font-bold text-slate-900">
              Quiz Unavailable
            </h1>

            <p className="mt-3 text-slate-500">
              This quiz does not contain any questions yet.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/dashboard/quiz")
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={18} />
              Quiz Dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  const selectedAnswer = answers[question.id];

  // --------------------------------------------------
  // Select answer
  // --------------------------------------------------
  function selectAnswer(answer: string) {
    if (submitting) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [question.id]: answer,
    }));
  }

  // --------------------------------------------------
  // Next question
  // --------------------------------------------------
  function goToNextQuestion() {
    if (!selectedAnswer) {
      return;
    }

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
    }
  }

  // --------------------------------------------------
  // Previous question
  // --------------------------------------------------
  function goToPreviousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );
    }
  }

  // --------------------------------------------------
  // Submit quiz
  // --------------------------------------------------
  async function submitQuiz() {
    if (submitting) {
      return;
    }

    // Make sure every question has an answer.
    const unansweredQuestion = questions.find(
      (item) => !answers[item.id]
    );

    if (unansweredQuestion) {
      const unansweredIndex =
        questions.findIndex(
          (item) =>
            item.id === unansweredQuestion.id
        );

      setCurrentQuestion(unansweredIndex);

      alert(
        "Please answer all questions before submitting the quiz."
      );

      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "/api/quiz/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizId: quiz.id,
            answers,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data?.error ||
            "Quiz submission failed."
        );

        return;
      }

      router.push(
        `/quiz/${quiz.id}/result`
      );

      router.refresh();
    } catch (error) {
      console.error(
        "QUIZ_SUBMIT_CLIENT_ERROR:",
        error
      );

      alert(
        "Something went wrong while submitting the quiz."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const isLastQuestion =
    currentQuestion ===
    questions.length - 1;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {quiz.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {quiz.course.title}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="font-medium text-slate-700">
              Question {currentQuestion + 1}{" "}
              of {questions.length}
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
        <div className="rounded-3xl bg-white p-5 shadow-xl sm:p-8">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold text-blue-600">
              Question {currentQuestion + 1}
            </p>

            <h2 className="text-xl font-bold leading-8 text-slate-900 sm:text-2xl">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {[
              question.optionA,
              question.optionB,
              question.optionC,
              question.optionD,
            ].map((option, index) => {
              const isSelected =
                selectedAnswer === option;

              const optionLetter =
                String.fromCharCode(
                  65 + index
                );

              return (
                <label
                  key={`${question.id}-${option}`}
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition sm:p-5 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={isSelected}
                    disabled={submitting}
                    onChange={() =>
                      selectAnswer(option)
                    }
                    className="h-5 w-5 accent-blue-600"
                  />

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {optionLetter}
                  </span>

                  <span className="text-base font-medium text-slate-800 sm:text-lg">
                    {option}
                  </span>

                  {isSelected && (
                    <CheckCircle
                      size={22}
                      className="ml-auto shrink-0 text-blue-600"
                    />
                  )}
                </label>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Previous */}
            <button
              type="button"
              onClick={goToPreviousQuestion}
              disabled={
                currentQuestion === 0 ||
                submitting
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            {/* Next / Submit */}
            {!isLastQuestion ? (
              <button
                type="button"
                onClick={goToNextQuestion}
                disabled={
                  !selectedAnswer ||
                  submitting
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                Next
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={submitQuiz}
                disabled={
                  !selectedAnswer ||
                  submitting
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Quiz
                    <CheckCircle size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Answer Progress */}
        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600">
              Answered
            </span>

            <span className="text-sm font-bold text-blue-600">
              {
                Object.keys(answers).length
              }{" "}
              / {questions.length}
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-green-500 transition-all duration-300"
              style={{
                width: `${
                  (Object.keys(answers).length /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}