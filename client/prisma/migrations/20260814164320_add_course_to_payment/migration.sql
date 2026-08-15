-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "courseId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
