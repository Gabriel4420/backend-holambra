BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[prospects] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [prospects_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [email] NVARCHAR(1000) NOT NULL,
    [document] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [phone] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [prospects_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [prospects_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[addresses] (
    [id] NVARCHAR(1000) NOT NULL,
    [country] NVARCHAR(1000) NOT NULL,
    [state] NVARCHAR(1000) NOT NULL,
    [district] NVARCHAR(1000) NOT NULL,
    [street] NVARCHAR(1000) NOT NULL,
    [numberStreet] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [addresses_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [prospectId] NVARCHAR(1000),
    CONSTRAINT [addresses_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [addresses_prospectId_idx] ON [dbo].[addresses]([prospectId]);

-- AddForeignKey
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [addresses_prospectId_fkey] FOREIGN KEY ([prospectId]) REFERENCES [dbo].[prospects]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
