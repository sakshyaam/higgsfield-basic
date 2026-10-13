import { GoogleGenAI, VideoGenerationReferenceType, type VideoGenerationReferenceImage } from '@google/genai'
import axios from 'axios'
import { output } from 'zod'
const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_API
})

export async function generateVideo(prompt : string, imageUrls : string[], outputPath : string){

    const imageBuffers = await Promise.all( imageUrls.map( async imageUrl => {
        const base64Image = await axios.get(
            imageUrl, {
                responseType : 'arraybuffer'
            }
        ).
        then(response => Buffer.from(response.data, "binary")).toString('base64')
        


        return {
            image : { imageBytes : base64Image},
            referenceType : "ASSET" as VideoGenerationReferenceType
        }
    }))

    let operation = await ai.models.generateVideos({
        model: "veo-3.1-generate-preview",
        prompt: prompt,
        config: {
          referenceImages: imageBuffers
        },
      });

    // Poll the operation status until the video is ready.
    while (!operation.done) {
        console.log("Waiting for video generation to complete...");
        await new Promise((resolve) => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({
          operation: operation,
        });
      }
      
      // Download the video.
      ai.files.download({
        file: operation.response.generatedVideos[0].video,
        downloadPath: outputPath,
      });
      console.log(`Generated video saved to veo3.1_with_reference_images.mp4`);
    



}