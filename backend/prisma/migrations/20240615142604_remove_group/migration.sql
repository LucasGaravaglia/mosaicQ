/*
  Warnings:

  - You are about to drop the column `groupId` on the `list` table. All the data in the column will be lost.
  - You are about to drop the `groupList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `list` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "groupList" DROP CONSTRAINT "groupList_userId_fkey";

-- DropForeignKey
ALTER TABLE "list" DROP CONSTRAINT "list_groupId_fkey";

-- AlterTable
ALTER TABLE "list" DROP COLUMN "groupId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "groupList";

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
