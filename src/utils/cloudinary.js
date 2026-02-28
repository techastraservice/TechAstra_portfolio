export const uploadToCloudinary = async (file, folder = 'techastra_portfolio') => {
    const cloudName = "dpzuulsdk";
    const apiKey = "286747155225814";
    const apiSecret = "J8OmOiitUY3WB-Ec7D_jagNKsEA";

    const timestamp = Math.round((new Date).getTime() / 1000);

    // Generate signature payload according to Cloudinary spec
    // Parameters must be sorted alphabetically
    const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;

    // Create SHA-1 signature using Web Crypto API
    const msgBuffer = new TextEncoder().encode(signatureString);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const err = await response.json();
        console.error("Cloudinary Error:", err);
        throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();

    // Returning the secure URL which can be directly saved to Firebase
    // Inject transformation parameters to optimize image delivery (resize to 400x400 max, auto format, auto quality)
    const optimizedUrl = data.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill,q_auto,f_auto/');

    return optimizedUrl;
};
