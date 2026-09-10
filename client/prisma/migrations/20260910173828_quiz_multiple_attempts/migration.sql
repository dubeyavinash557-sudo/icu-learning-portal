-- DropIndex
DROP INDEX "public"."QuizAttempt_userId_quizId_key";

-- CreateIndex
CREATE INDEX "QuizAttempt_userId_quizId_idx" ON "public"."QuizAttempt"("userId", "quizId");

-- CreateIndex
CREATE INDEX "QuizAttempt_userId_createdAt_idx" ON "public"."QuizAttempt"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "QuizAttempt_quizId_createdAt_idx" ON "public"."QuizAttempt"("quizId", "createdAt");
