import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

const account = process.env.AZURE_STORAGE_ACCOUNT;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential,
);

export const uploadImageToAzureBlob = async (
  imageUrl: string,
  containerName: string,
) => {
  const key = `${crypto.randomUUID()}.png`;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(key);

  const imageResponse = await fetch(imageUrl);
  const imageBlob = await imageResponse.blob();
  const buffer = await imageBlob.arrayBuffer();

  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: 'image/png' },
  });

  return { key, url: blockBlobClient.url };
};

export const deleteImageFromAzureBlob = async (
  key: string,
  containerName: string,
) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(key);

  await blockBlobClient.delete();
};
