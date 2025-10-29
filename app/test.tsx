const personImageURL = "./attractive-young-man-standing-all-isolated-on-white-background-BX7MEE.jpg";
const clothingImageURL = "OIP (1).webp";

// 2. Call the Replicate API
const response = await fetch("https://api.replicate.com", {
  method: "POST",
  headers: {
    Authorization: `Token ${"r8_5Cy6dx3UxXq9psRl79zzYXuuzRlXJov17xRni"}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    version: "model-version-id", // e.g., TryOnDiffusion model version ID
    input: {
      person_image: personImageURL,
      clothing_image: clothingImageURL,
    },
  }),
});

const result = await response.json();

// 3. Get the output image URL
const outputUrl = result.output[0]; // usually the first URL in the array
console.log("Generated try-on image:", outputUrl);