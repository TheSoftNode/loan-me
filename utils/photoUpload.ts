import { storage } from '@/services/firebaseConfig';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export const uploadProfilePhoto = async (
    userId: string,
    photoUrl: string
): Promise<string> =>
{
    try
    {
        // Fetch the image from Google's URL
        const response = await fetch(photoUrl);
        const blob = await response.blob();

        // Convert blob to base64
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) =>
        {
            reader.onloadend = () => resolve(reader.result as string);
        });
        reader.readAsDataURL(blob);
        const base64Data = await base64Promise;

        // Upload to Firebase Storage
        const storageRef = ref(storage, `profile-photos/${userId}`);
        await uploadString(storageRef, base64Data, 'data_url');

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error)
    {
        console.error('Error uploading profile photo:', error);
        throw error;
    }
};