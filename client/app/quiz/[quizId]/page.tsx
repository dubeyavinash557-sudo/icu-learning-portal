import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import QuizClient from "./QuizClient";

interface PageProps {
  params: Promise<{
    quizId: string;
  }>;
}

export default async function QuizPage({
  params,
}: PageProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const { quizId } = await params;

  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      course: true,
      questions: {
  orderBy: {
    id: "asc",
  },
},
    },
  });

  if (!quiz) {
    notFound();
  }

  return (
    <QuizClient
      quiz={quiz}
      userId={user.id}
    />
  );
}