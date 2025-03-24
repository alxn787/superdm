-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_publicKey_key" ON "User"("publicKey");
