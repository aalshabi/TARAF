-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "budget" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "classification" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "nationality" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "sessionId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "transcript" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "urgency" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "Lead_sessionId_idx" ON "Lead"("sessionId");

-- CreateIndex
CREATE INDEX "Lead_source_idx" ON "Lead"("source");
