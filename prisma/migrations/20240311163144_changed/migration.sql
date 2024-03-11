/*
  Warnings:

  - You are about to drop the column `title` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `UserDeTail` table. All the data in the column will be lost.
  - Made the column `description` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "title",
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserDeTail" DROP COLUMN "password";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDeTail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
