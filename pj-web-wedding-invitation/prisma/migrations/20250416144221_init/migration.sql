-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "postcode" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "isRepresentative" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "firstNameKana" TEXT NOT NULL,
    "familyNameKana" TEXT NOT NULL,
    "sex" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "isJoin" BOOLEAN NOT NULL,
    "message" TEXT,
    "guestCode" INTEGER NOT NULL,
    "allergyComment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
