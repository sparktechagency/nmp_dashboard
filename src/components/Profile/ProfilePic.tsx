import { FaCamera } from "react-icons/fa";
import profile_placeholder from "../../assets/images/profile_placeholder.png";
import { useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useUpdateProfileImgMutation } from "../../redux/features/user/userApi";


const ProfilePic = () => {
  const { user } = useAppSelector((state) => state.user);
  const [imageSrc, setImageSrc] = useState(user?.profile_img ? user?.profile_img : profile_placeholder); // Default image
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [updateProfileImg] = useUpdateProfileImgMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (imgFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageSrc(reader.result);
        }
      };
      reader.readAsDataURL(imgFile);
      // update img
      const formData = new FormData();
      formData.append("file", imgFile);
      updateProfileImg(formData)
    }
  };

  return (
    <>
      {/* input file */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      {/* input file ended*/}

      <div className="relative">
        <img
          src={imageSrc}
          alt="Profile"
          onError={() => setImageSrc(profile_placeholder)}
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 bg-black/60 text-white p-2 rounded-full cursor-pointer hover:bg-black/80 transition duration-200 shadow-md"
          >
            <FaCamera size={16} />
          </div>
      </div>
    </>
  );
};

export default ProfilePic;
