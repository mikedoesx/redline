-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT', 'USER', 'AHJ');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roles" "Role"[];
