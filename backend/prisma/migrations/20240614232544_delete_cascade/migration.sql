-- DropForeignKey
ALTER TABLE "groupList" DROP CONSTRAINT "groupList_userId_fkey";

-- DropForeignKey
ALTER TABLE "list" DROP CONSTRAINT "list_groupId_fkey";

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groupList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupList" ADD CONSTRAINT "groupList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
