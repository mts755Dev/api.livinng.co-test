-- CreateTable

CREATE TABLE
    "Host" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "dni" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "emailVerified" BOOLEAN NOT NULL DEFAULT false,
        "phone" INTEGER,
        "password" TEXT NOT NULL,
        "disabled" BOOLEAN NOT NULL DEFAULT false,

CONSTRAINT "Host_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "Client" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" INTEGER,
        "disabled" BOOLEAN NOT NULL DEFAULT false,

CONSTRAINT "Client_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "Admin" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,

CONSTRAINT "Admin_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "Accommodation" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "image" TEXT [],
        "price" INTEGER NOT NULL,
        "guests" INTEGER NOT NULL,
        "bathroom" INTEGER NOT NULL,
        "description" TEXT NOT NULL,
        "address" TEXT,
        "rooms" INTEGER NOT NULL,
        "beds" INTEGER NOT NULL,
        "Views" INTEGER NOT NULL DEFAULT 0,
        "distribution" TEXT NOT NULL,
        "location" TEXT NOT NULL,
        "disabled" BOOLEAN NOT NULL DEFAULT false,
        "typeId" TEXT NOT NULL,
        "sizeId" TEXT NOT NULL,
        "hostId" TEXT NOT NULL,

CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "Favorites" (
        "id" TEXT NOT NULL,
        "clientId" TEXT,
        "accommodationId" TEXT,

CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "Token" (
        "id" TEXT NOT NULL,
        "token" TEXT NOT NULL,

CONSTRAINT "Token_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE "Types" ( "name" TEXT NOT NULL, 

CONSTRAINT "Types_pkey" PRIMARY KEY ("name") );

-- CreateTable

CREATE TABLE "Size" ( "name" TEXT NOT NULL, 

CONSTRAINT "Size_pkey" PRIMARY KEY ("name") );

-- CreateTable

CREATE TABLE "Services" ( "name" TEXT NOT NULL, 

CONSTRAINT "Services_pkey" PRIMARY KEY ("name") );

-- CreateTable

CREATE TABLE
    "Occupancy" (
        "id" SERIAL NOT NULL,
        "initialDate" TIMESTAMP(3) NOT NULL,
        "finalDate" TIMESTAMP(3) NOT NULL,

CONSTRAINT "Occupancy_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "Review" (
        "id" TEXT NOT NULL,
        "comment" TEXT NOT NULL,
        "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "Rating" INTEGER NOT NULL,
        "accommodationId" TEXT NOT NULL,
        "clientId" TEXT NOT NULL,

CONSTRAINT "Review_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "Reservations" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" BIGINT NOT NULL,
        "dates" TIMESTAMP(3) [],
        "childs" INTEGER,
        "adults" INTEGER NOT NULL,
        "price" INTEGER NOT NULL,
        "nights" INTEGER NOT NULL,
        "total" INTEGER NOT NULL,
        "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "stateId" TEXT NOT NULL DEFAULT 'Pendiente',
        "clientId" TEXT NOT NULL,
        "accommodationId" TEXT NOT NULL,
        "hostId" TEXT NOT NULL,
        "occupancyId" INTEGER,

CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE "State" ( "name" TEXT NOT NULL, 

CONSTRAINT "State_pkey" PRIMARY KEY ("name") );

-- CreateTable

CREATE TABLE
    "Epayco" (
        "email" TEXT NOT NULL,
        "amount" INTEGER NOT NULL,
        "title" TEXT NOT NULL,
        "id" TEXT NOT NULL,
        "routeLink" TEXT NOT NULL
    );

-- CreateTable

CREATE TABLE
    "Auth" (
        "id" SERIAL NOT NULL,
        "token" VARCHAR(900) NOT NULL,

CONSTRAINT "Auth_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "Authadmin" (
        "id" SERIAL NOT NULL,
        "token" VARCHAR(900) NOT NULL,

CONSTRAINT "Authadmin_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "_AccommodationServices" (
        "A" TEXT NOT NULL,
        "B" TEXT NOT NULL
    );

-- CreateTable

CREATE TABLE
    "_AccommodationOccupancy" (
        "A" TEXT NOT NULL,
        "B" INTEGER NOT NULL
    );

-- CreateIndex

CREATE UNIQUE INDEX "Host_email_key" ON "Host"("email");

-- CreateIndex

CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex

CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex

CREATE UNIQUE INDEX "Accommodation_name_key" ON "Accommodation"("name");

-- CreateIndex

CREATE UNIQUE INDEX "Epayco_title_key" ON "Epayco"("title");

-- CreateIndex

CREATE UNIQUE INDEX "_AccommodationServices_AB_unique" ON "_AccommodationServices"("A", "B");

-- CreateIndex

CREATE INDEX
    "_AccommodationServices_B_index" ON "_AccommodationServices"("B");

-- CreateIndex

CREATE UNIQUE INDEX "_AccommodationOccupancy_AB_unique" ON "_AccommodationOccupancy"("A", "B");

-- CreateIndex

CREATE INDEX
    "_AccommodationOccupancy_B_index" ON "_AccommodationOccupancy"("B");

-- AddForeignKey

ALTER TABLE "Accommodation"
ADD
    CONSTRAINT "Accommodation_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Accommodation"
ADD
    CONSTRAINT "Accommodation_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Accommodation"
ADD
    CONSTRAINT "Accommodation_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Favorites"
ADD
    CONSTRAINT "Favorites_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE
SET NULL ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Favorites"
ADD
    CONSTRAINT "Favorites_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE
SET NULL ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Review"
ADD
    CONSTRAINT "Review_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Review"
ADD
    CONSTRAINT "Review_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Reservations"
ADD
    CONSTRAINT "Reservations_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Reservations"
ADD
    CONSTRAINT "Reservations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Reservations"
ADD
    CONSTRAINT "Reservations_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Reservations"
ADD
    CONSTRAINT "Reservations_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Reservations"
ADD
    CONSTRAINT "Reservations_occupancyId_fkey" FOREIGN KEY ("occupancyId") REFERENCES "Occupancy"("id") ON DELETE
SET NULL ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE
    "_AccommodationServices"
ADD
    CONSTRAINT "_AccommodationServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE
    "_AccommodationServices"
ADD
    CONSTRAINT "_AccommodationServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Services"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE
    "_AccommodationOccupancy"
ADD
    CONSTRAINT "_AccommodationOccupancy_A_fkey" FOREIGN KEY ("A") REFERENCES "Accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE
    "_AccommodationOccupancy"
ADD
    CONSTRAINT "_AccommodationOccupancy_B_fkey" FOREIGN KEY ("B") REFERENCES "Occupancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
