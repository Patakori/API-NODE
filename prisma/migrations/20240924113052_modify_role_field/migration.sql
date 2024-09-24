/*
  Warnings:

  - The `roles` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roles",
ADD COLUMN     "roles" "Role" NOT NULL DEFAULT 'MEMBER';
