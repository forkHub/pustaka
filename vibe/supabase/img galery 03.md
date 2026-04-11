Got it — you want the user to upload **one image only**, and then your JavaScript should handle creating both the **thumbnail** and the **original** version before uploading them separately to Supabase. That means you’ll need to do some **client-side image processing** in the browser.

Here’s how the workflow looks:

---

## 🔹 Workflow
1. User selects a single image file.
2. JavaScript reads the file into a `<canvas>`.
3. Generate a **resized thumbnail** (e.g., 150×150).
4. Convert both the **thumbnail** and the **original** into `Blob` objects.
5. Upload them separately to Supabase Storage (e.g., `thumbnails/` and `originals/` folders).

---

## 🔹 Example Code

```html
<input type="file" id="imageInput" />
<button id="uploadBtn">Upload</button>

<script>
async function uploadImage(file, folder) {
  const filePath = `${folder}/${file.name}`;
  const { data, error } = await supabaseClient.storage
    .from("images")
    .upload(filePath, file, { upsert: false });

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data: urlData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

function createThumbnail(file, maxWidth = 150, maxHeight = 150) {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      // Scale down proportionally
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        resolve(new File([blob], "thumb_" + file.name, { type: file.type }));
      }, file.type);
    };

    reader.readAsDataURL(file);
  });
}

document.getElementById("uploadBtn").addEventListener("click", async () => {
  const file = document.getElementById("imageInput").files[0];
  if (!file) return;

  // Create thumbnail
  const thumbnailFile = await createThumbnail(file);

  // Upload both
  const thumbUrl = await uploadImage(thumbnailFile, "thumbnails");
  const originalUrl = await uploadImage(file, "originals");

  console.log("Thumbnail URL:", thumbUrl);
  console.log("Original URL:", originalUrl);
});
</script>
```

---

## 🔹 What Happens Here
- User uploads one image.
- JavaScript generates a **thumbnail** using `<canvas>`.
- Both files are uploaded to Supabase Storage:
  - `images/thumbnails/thumb_filename.jpg`
  - `images/originals/filename.jpg`
- You now have **two URLs**: one for the thumbnail, one for the original.

---

This way, your gallery can load thumbnails quickly, and when a user clicks, you show the full-size original.

Would you like me to extend this into a **paired gallery loader** that automatically matches `thumb_filename.jpg` with `filename.jpg` so clicking a thumbnail opens the correct original? That would complete the end-to-end workflow neatly.