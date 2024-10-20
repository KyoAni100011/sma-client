import instance from "./InternetService";


const postImage = async (formData: FormData) => {
    const res = await instance.post("/api/v1/upload/image", formData);
    console.log('Image upload response:', res);
    return res.data; 
};

const postVideo = async (formData: FormData) => {
    const res = await instance.post("/api/v1/upload/video", formData);
    console.log('Video upload response:', res);
    return res.data; 
};

export { postImage, postVideo };
