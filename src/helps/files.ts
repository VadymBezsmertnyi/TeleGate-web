export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number; base64: string }> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };

    reader.onloadend = () => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const base64 = canvas.toDataURL("image/jpeg"); // або 'image/png', якщо потрібно
          resolve({
            width: img.width,
            height: img.height,
            base64: base64,
          });
        } else {
          reject(new Error("Failed to get canvas context"));
        }
      };
      img.onerror = (error) => reject(error);
    };

    reader.readAsDataURL(file);
  });
};
