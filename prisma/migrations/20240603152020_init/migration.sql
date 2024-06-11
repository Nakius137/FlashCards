-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Passowrd" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "AuthorId" INTEGER NOT NULL,
    "SubscriberId" INTEGER NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Words" (
    "id" SERIAL NOT NULL,
    "OriginalWord" TEXT NOT NULL,
    "TranslatedWord" TEXT NOT NULL,
    "SetId" INTEGER NOT NULL,

    CONSTRAINT "Words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersProgress" (
    "id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "SetId" INTEGER NOT NULL,
    "Progress" INTEGER NOT NULL,

    CONSTRAINT "UsersProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Name_key" ON "User"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Set_Name_key" ON "Set"("Name");

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_SubscriberId_fkey" FOREIGN KEY ("SubscriberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Words" ADD CONSTRAINT "Words_SetId_fkey" FOREIGN KEY ("SetId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersProgress" ADD CONSTRAINT "UsersProgress_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersProgress" ADD CONSTRAINT "UsersProgress_SetId_fkey" FOREIGN KEY ("SetId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
