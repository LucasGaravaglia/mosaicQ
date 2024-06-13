/*
  Warnings:

  - You are about to drop the column `description` on the `groupList` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `groupList` table. All the data in the column will be lost.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groupList" DROP COLUMN "description",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
