/*
  Warnings:

  - Added the required column `city` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[addresses] ALTER COLUMN [numberStreet] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[addresses] ADD [city] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
