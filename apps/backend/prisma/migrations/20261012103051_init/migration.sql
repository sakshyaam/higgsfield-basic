-- CreateEnum
CREATE TYPE "AvatarImageType" AS ENUM ('User', 'Model');

-- CreateEnum
CREATE TYPE "AvatarVideoStatus" AS ENUM ('Done', 'Pending', 'Error');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvatarImage" (
    "id" SERIAL NOT NULL,
    "avatarId" TEXT NOT NULL,
    "type" "AvatarImageType" NOT NULL,

    CONSTRAINT "AvatarImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvatarVideo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "startFrame" TEXT,
    "endFrame" TEXT,
    "duration" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "status" "AvatarVideoStatus" NOT NULL,

    CONSTRAINT "AvatarVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvatarVideoReference" (
    "id" TEXT NOT NULL,
    "avatarVideoId" TEXT NOT NULL,
    "avatarId" TEXT NOT NULL,

    CONSTRAINT "AvatarVideoReference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvatarImage" ADD CONSTRAINT "AvatarImage_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvatarVideo" ADD CONSTRAINT "AvatarVideo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvatarVideoReference" ADD CONSTRAINT "AvatarVideoReference_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvatarVideoReference" ADD CONSTRAINT "AvatarVideoReference_avatarVideoId_fkey" FOREIGN KEY ("avatarVideoId") REFERENCES "AvatarVideo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
