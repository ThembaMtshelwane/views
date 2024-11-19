export const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxDimension = 500;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7); // Quality: 0.7 (70%)
        resolve(compressedDataUrl);
      }
    };

    reader.readAsDataURL(file);
  });
};

export const defaultEmptyTweet = {
  _id: "",
  caption: "",
  userId: "",
  media: [],
  likes: [],
  comments: [],
  createdAt: "",
  updatedAt: "",
};

export const currentDummyUser = "67346ab0d8813e388dc12188";
export const defaultImage =
  "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg";
