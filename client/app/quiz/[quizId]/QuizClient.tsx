"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  Circle,
  Loader2,
  Menu,
  X,
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

type SubmitResponse = {
  success?: boolean;
  error?: string;
  message?: string;
  attemptId?: string;
};

export default function QuizClient({
  quiz,
}: QuizClientProps) {
  const router = useRouter();

  const questions = quiz.questions;

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState<
    Record<string, string>
  >({});

  const [submitting, setSubmitting] =
    useState(false);

  const [showNavigator, setShowNavigator] =
    useState(false);

  const [showSubmitConfirmation, setShowSubmitConfirmation] =
    useState(false);

  // ==========================================================
  // 1. RESTORE ANSWERS FROM SESSION STORAGE
  //
  // This protects answers against accidental navigation/reload
  // during the current browser session.
  // ==========================================================

  useEffect(() => {
    if (questions.length === 0) {
      return;
    }

    try {
      const storageKey = `icu-quiz-${quiz.id}-answers`;

      const savedAnswers =
        window.sessionStorage.getItem(
          storageKey
        );

      if (!savedAnswers) {
        return;
      }

      const parsed =
        JSON.parse(savedAnswers);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        setAnswers(parsed);
      }
    } catch (error) {
      console.error(
        "QUIZ ANSWER RESTORE ERROR:",
        error
      );
    }
  }, [quiz.id, questions.length]);

  // ==========================================================
  // 2. SAVE ANSWERS TO SESSION STORAGE
  // ==========================================================

  useEffect(() => {
    if (questions.length === 0) {
      return;
    }

    try {
      const storageKey = `icu-quiz-${quiz.id}-answers`;

      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify(answers)
      );
    } catch (error) {
      console.error(
        "QUIZ ANSWER SAVE ERROR:",
        error
      );
    }
  }, [answers, quiz.id, questions.length]);

  // ==========================================================
  // 3. EMPTY QUIZ PROTECTION
  // ==========================================================

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-6 py-12 text-center text-white sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <AlertTriangle
                  size={30}
                  className="text-amber-300"
                />
              </div>

              <h1 className="mt-5 text-2xl font-black sm:text-3xl">
                Quiz Unavailable
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
                This quiz does not contain any
                questions yet.
              </p>
            </div>

            <div className="p-6 text-center sm:p-8">
              <p className="text-sm font-semibold text-slate-500">
                Course
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                {quiz.course.title}
              </h2>

              <button
                type="button"
                onClick={() =>
                  router.push("/dashboard/quiz")
                }
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                <ArrowLeft size={18} />
                Quiz Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================================
  // 4. CURRENT QUESTION
  // ==========================================================

  const question =
    questions[currentQuestion];

  // ==========================================================
  // 5. DERIVED QUIZ DATA
  // ==========================================================

  const selectedAnswer =
    answers[question.id];

  const answeredCount =
    Object.keys(answers).filter((questionId) =>
      questions.some(
        (item) => item.id === questionId
      )
    ).length;

  const unansweredCount =
    questions.length - answeredCount;

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  const answerProgress =
    (answeredCount / questions.length) *
    100;

  const isFirstQuestion =
    currentQuestion === 0;

  const isLastQuestion =
    currentQuestion ===
    questions.length - 1;

  const allQuestionsAnswered =
    answeredCount === questions.length;

  const options = useMemo(
    () => [
      {
        key: "A",
        value: question.optionA,
      },
      {
        key: "B",
        value: question.optionB,
      },
      {
        key: "C",
        value: question.optionC,
      },
      {
        key: "D",
        value: question.optionD,
      },
    ],
    [question]
  );

  // ==========================================================
  // 6. SELECT ANSWER
  // ==========================================================

  function selectAnswer(
    answer: string
  ) {
    if (submitting) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [question.id]: answer,
    }));
  }

  // ==========================================================
  // 7. GO TO QUESTION
  // ==========================================================

  function goToQuestion(
    questionIndex: number
  ) {
    if (submitting) {
      return;
    }

    if (
      questionIndex < 0 ||
      questionIndex >= questions.length
    ) {
      return;
    }

    setCurrentQuestion(questionIndex);
    setShowNavigator(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================================================
  // 8. NEXT QUESTION
  // ==========================================================

  function goToNextQuestion() {
    if (submitting) {
      return;
    }

    if (!selectedAnswer) {
      alert(
        "Please select an answer before continuing."
      );

      return;
    }

    if (!isLastQuestion) {
      goToQuestion(
        currentQuestion + 1
      );
    }
  }

  // ==========================================================
  // 9. PREVIOUS QUESTION
  // ==========================================================

  function goToPreviousQuestion() {
    if (submitting) {
      return;
    }

    if (!isFirstQuestion) {
      goToQuestion(
        currentQuestion - 1
      );
    }
  }

  // ==========================================================
  // 10. OPEN SUBMIT CONFIRMATION
  // ==========================================================

  function requestSubmit() {
    if (submitting) {
      return;
    }

    if (!selectedAnswer) {
      alert(
        "Please select an answer for the current question."
      );

      return;
    }

    if (!allQuestionsAnswered) {
      const firstUnansweredIndex =
        questions.findIndex(
          (item) => !answers[item.id]
        );

      if (firstUnansweredIndex !== -1) {
        setCurrentQuestion(
          firstUnansweredIndex
        );
      }

      alert(
        `Please answer all questions before submitting. ${unansweredCount} question${
          unansweredCount === 1 ? "" : "s"
        } remaining.`
      );

      return;
    }

    setShowSubmitConfirmation(true);
  }

  // ==========================================================
  // 11. SUBMIT QUIZ
  // ==========================================================

  async function submitQuiz() {
    if (submitting) {
      return;
    }

    if (!allQuestionsAnswered) {
      setShowSubmitConfirmation(false);

      const firstUnansweredIndex =
        questions.findIndex(
          (item) => !answers[item.id]
        );

      if (firstUnansweredIndex !== -1) {
        setCurrentQuestion(
          firstUnansweredIndex
        );
      }

      alert(
        "Please answer all questions before submitting the quiz."
      );

      return;
    }

    try {
      setSubmitting(true);
      setShowSubmitConfirmation(false);

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

      let data: SubmitResponse = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        alert(
          data.error ||
            data.message ||
            "Quiz submission failed. Please try again."
        );

        return;
      }

      // ------------------------------------------------------
      // Clear saved answers only after successful submission.
      // ------------------------------------------------------

      try {
        window.sessionStorage.removeItem(
          `icu-quiz-${quiz.id}-answers`
        );
      } catch (error) {
        console.error(
          "QUIZ STORAGE CLEANUP ERROR:",
          error
        );
      }

      // ------------------------------------------------------
      // Result page
      // ------------------------------------------------------

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
        "Something went wrong while submitting the quiz. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ==========================================================
  // 12. OPTION BUTTON
  // ==========================================================

  function renderOption(
    optionKey: string,
    optionValue: string
  ) {
    const isSelected =
      selectedAnswer === optionValue;

    return (
      <button
        key={`${question.id}-${optionKey}`}
        type="button"
        onClick={() =>
          selectAnswer(optionValue)
        }
        disabled={submitting}
        aria-pressed={isSelected}
        className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5 ${
          isSelected
            ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-600/10"
            : "border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50 hover:shadow-sm"
        } ${
          submitting
            ? "cursor-not-allowed opacity-70"
            : "cursor-pointer"
        }`}
      >
        {/* Option Letter */}
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black transition ${
            isSelected
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700"
          }`}
        >
          {optionKey}
        </span>

        {/* Option Text */}
        <span
          className={`min-w-0 flex-1 text-sm font-semibold leading-6 sm:text-base ${
            isSelected
              ? "text-blue-950"
              : "text-slate-800"
          }`}
        >
          {optionValue}
        </span>

        {/* Selected Indicator */}
        {isSelected ? (
          <CheckCircle2
            size={22}
            className="shrink-0 text-blue-600"
          />
        ) : (
          <Circle
            size={21}
            className="shrink-0 text-slate-300 transition group-hover:text-blue-400"
          />
        )}
      </button>
    );
  }

  // ==========================================================
  // 13. RENDER
  // ==========================================================

  return (
    <main className="min-h-screen bg-slate-100">
      {/* ======================================================
          MOBILE QUESTION NAVIGATOR
      ====================================================== */}

      {showNavigator && (
        <div className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                  Quiz Navigator
                </p>

                <h2 className="mt-1 text-lg font-black text-slate-900">
                  {answeredCount} /{" "}
                  {questions.length} Answered
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowNavigator(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                aria-label="Close quiz navigator"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <QuestionNavigator
                questions={questions}
                answers={answers}
                currentQuestion={
                  currentQuestion
                }
                onQuestionClick={
                  goToQuestion
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          DESKTOP TOP HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Back */}
          <button
            type="button"
            onClick={() =>
              router.push("/dashboard/quiz")
            }
            disabled={submitting}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft size={18} />

            <span className="hidden sm:inline">
              Quiz Dashboard
            </span>

            <span className="sm:hidden">
              Back
            </span>
          </button>

          {/* Center */}
          <div className="hidden min-w-0 flex-1 justify-center md:flex">
            <div className="max-w-xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">
                ICU Learning Portal
              </p>

              <p className="truncate text-sm font-black text-slate-800">
                {quiz.title}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
              {currentQuestion + 1} /{" "}
              {questions.length}
            </span>

            <span className="hidden rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 sm:inline-flex">
              {answeredCount} Answered
            </span>

            {/* Mobile Navigator */}
            <button
              type="button"
              onClick={() =>
                setShowNavigator(true)
              }
              disabled={submitting}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 lg:hidden"
              aria-label="Open question navigator"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================
          QUIZ CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* ==================================================
              DESKTOP SIDEBAR
          ================================================== */}

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              {/* Sidebar Heading */}
              <div className="border-b border-slate-200 pb-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                  Assessment
                </p>

                <h2 className="mt-1 text-lg font-black text-slate-900">
                  Question Navigator
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Quickly move between questions.
                </p>
              </div>

              {/* Sidebar Stats */}
              <div className="grid grid-cols-2 gap-2 py-5">
                <div className="rounded-2xl bg-blue-50 p-3">
                  <p className="text-[10px] font-black uppercase tracking-wide text-blue-600">
                    Answered
                  </p>

                  <p className="mt-1 text-xl font-black text-blue-900">
                    {answeredCount}
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-3">
                  <p className="text-[10px] font-black uppercase tracking-wide text-amber-600">
                    Remaining
                  </p>

                  <p className="mt-1 text-xl font-black text-amber-900">
                    {unansweredCount}
                  </p>
                </div>
              </div>

              {/* Navigator */}
              <QuestionNavigator
                questions={questions}
                answers={answers}
                currentQuestion={
                  currentQuestion
                }
                onQuestionClick={
                  goToQuestion
                }
              />

              {/* Legend */}
              <div className="mt-5 border-t border-slate-200 pt-5">
                <div className="space-y-2">
                  <LegendItem
                    type="current"
                    label="Current question"
                  />

                  <LegendItem
                    type="answered"
                    label="Answered"
                  />

                  <LegendItem
                    type="unanswered"
                    label="Not answered"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* ==================================================
              MAIN QUIZ COLUMN
          ================================================== */}

          <section className="min-w-0">
            {/* Course / Quiz Intro */}
            <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-6 text-white shadow-xl sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-400/20">
                  Course Assessment
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-300 ring-1 ring-white/10">
                  {questions.length} Questions
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
                {quiz.title}
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {quiz.course.title}
              </p>

              {/* Progress */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-300">
                    Question Progress
                  </span>

                  <span className="text-xs font-black text-cyan-300">
                    {Math.round(progress)}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                ANSWER PROGRESS
            ================================================= */}

            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Your Progress
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {answeredCount} of{" "}
                    {questions.length} answered
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black text-blue-700">
                    {Math.round(
                      answerProgress
                    )}
                    %
                  </p>
                </div>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{
                    width: `${answerProgress}%`,
                  }}
                />
              </div>
            </div>

            {/* =================================================
                QUESTION CARD
            ================================================= */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              {/* Question Header */}
              <div className="border-b border-slate-200 bg-slate-50/80 px-5 py-5 sm:px-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1.5 text-xs font-black text-blue-700">
                    Question{" "}
                    {currentQuestion + 1}
                  </span>

                  {selectedAnswer ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-700">
                      <CheckCircle2
                        size={14}
                      />
                      Answered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-black text-amber-700">
                      <Circle size={14} />
                      Not answered
                    </span>
                  )}
                </div>
              </div>

              {/* Question Body */}
              <div className="p-5 sm:p-8 lg:p-10">
                <h2 className="text-xl font-black leading-8 text-slate-950 sm:text-2xl sm:leading-9">
                  {question.question}
                </h2>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  Select the best answer.
                </p>

                {/* Options */}
                <div className="mt-8 space-y-3 sm:space-y-4">
                  {options.map((option) =>
                    renderOption(
                      option.key,
                      option.value
                    )
                  )}
                </div>

                {/* Navigation */}
                <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  {/* Previous */}
                  <button
                    type="button"
                    onClick={
                      goToPreviousQuestion
                    }
                    disabled={
                      isFirstQuestion ||
                      submitting
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft size={18} />
                    Previous
                  </button>

                  {/* Current Position */}
                  <div className="order-first text-center sm:order-none">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Question
                    </p>

                    <p className="mt-0.5 text-sm font-black text-slate-700">
                      {currentQuestion + 1} /{" "}
                      {questions.length}
                    </p>
                  </div>

                  {/* Next / Submit */}
                  {!isLastQuestion ? (
                    <button
                      type="button"
                      onClick={
                        goToNextQuestion
                      }
                      disabled={
                        !selectedAnswer ||
                        submitting
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                    >
                      Next Question
                      <ArrowRight
                        size={18}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={requestSubmit}
                      disabled={
                        !selectedAnswer ||
                        submitting
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                    >
                      Submit Quiz
                      <CheckCircle
                        size={18}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                MOBILE NAVIGATION
            ================================================= */}

            <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
              <button
                type="button"
                onClick={
                  goToPreviousQuestion
                }
                disabled={
                  isFirstQuestion ||
                  submitting
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={17} />
                Previous
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowNavigator(true)
                }
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Menu size={17} />
                Questions
              </button>
            </div>

            {/* =================================================
                SUBMIT STATUS
            ================================================= */}

            {isLastQuestion && (
              <div
                className={`mt-6 rounded-2xl border p-5 ${
                  allQuestionsAnswered
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {allQuestionsAnswered ? (
                    <CheckCircle2
                      size={22}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                  ) : (
                    <AlertTriangle
                      size={22}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />
                  )}

                  <div>
                    <p
                      className={`text-sm font-black ${
                        allQuestionsAnswered
                          ? "text-emerald-900"
                          : "text-amber-900"
                      }`}
                    >
                      {allQuestionsAnswered
                        ? "All questions answered"
                        : `${unansweredCount} question${
                            unansweredCount ===
                            1
                              ? ""
                              : "s"
                          } still unanswered`}
                    </p>

                    <p
                      className={`mt-1 text-xs leading-5 ${
                        allQuestionsAnswered
                          ? "text-emerald-700"
                          : "text-amber-700"
                      }`}
                    >
                      {allQuestionsAnswered
                        ? "You can now submit your assessment."
                        : "Use the question navigator to review unanswered questions before submitting."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                MOBILE ANSWER SUMMARY
            ================================================= */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:hidden">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-700">
                  Answered
                </span>

                <span className="text-sm font-black text-blue-700">
                  {answeredCount} /{" "}
                  {questions.length}
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                  style={{
                    width: `${answerProgress}%`,
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ======================================================
          SUBMIT CONFIRMATION MODAL
      ====================================================== */}

      {showSubmitConfirmation && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-6 py-7 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/20">
                <CheckCircle
                  size={25}
                  className="text-emerald-300"
                />
              </div>

              <h2 className="mt-4 text-xl font-black">
                Submit Your Quiz?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                You have answered all{" "}
                {questions.length} questions.
                Once submitted, your answers
                will be evaluated.
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                  <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    Answered
                  </p>

                  <p className="mt-1 text-2xl font-black text-emerald-900">
                    {answeredCount}
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4 text-center">
                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                    Total
                  </p>

                  <p className="mt-1 text-2xl font-black text-blue-900">
                    {questions.length}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setShowSubmitConfirmation(
                      false
                    )
                  }
                  className="flex-1 rounded-xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-200"
                >
                  Review Answers
                </button>

                <button
                  type="button"
                  onClick={submitQuiz}
                  disabled={submitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
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
                      Submit Now
                      <CheckCircle
                        size={18}
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ==========================================================
// QUESTION NAVIGATOR
// ==========================================================

function QuestionNavigator({
  questions,
  answers,
  currentQuestion,
  onQuestionClick,
}: {
  questions: QuizQuestion[];
  answers: Record<string, string>;
  currentQuestion: number;
  onQuestionClick: (
    questionIndex: number
  ) => void;
}) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-5">
      {questions.map(
        (item, index) => {
          const isCurrent =
            currentQuestion === index;

          const isAnswered =
            Boolean(answers[item.id]);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onQuestionClick(index)
              }
              aria-label={`Go to question ${
                index + 1
              }${
                isAnswered
                  ? ", answered"
                  : ", not answered"
              }`}
              aria-current={
                isCurrent
                  ? "step"
                  : undefined
              }
              className={`flex aspect-square items-center justify-center rounded-xl text-xs font-black transition ${
                isCurrent
                  ? "bg-blue-700 text-white shadow-md shadow-blue-700/20 ring-2 ring-blue-200"
                  : isAnswered
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {index + 1}
            </button>
          );
        }
      )}
    </div>
  );
}

// ==========================================================
// LEGEND ITEM
// ==========================================================

function LegendItem({
  type,
  label,
}: {
  type:
    | "current"
    | "answered"
    | "unanswered";
  label: string;
}) {
  const classes =
    type === "current"
      ? "bg-blue-700"
      : type === "answered"
        ? "bg-emerald-100"
        : "bg-slate-100";

  const textClasses =
    type === "current"
      ? "text-white"
      : type === "answered"
        ? "text-emerald-700"
        : "text-slate-500";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-lg text-[9px] font-black ${classes} ${textClasses}`}
      >
        {type === "current"
          ? "1"
          : type === "answered"
            ? "✓"
            : "–"}
      </span>

      <span className="text-xs font-semibold text-slate-600">
        {label}
      </span>
    </div>
  );
}