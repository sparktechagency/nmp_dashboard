"use client";

import { useState } from "react";
import ProfileForm from "../../components/Profile/ProfileForm"
import ProfilePic from "../../components/Profile/ProfilePic";
import { useAppSelector } from "../../redux/hooks/hooks";

const ProfilePage = () => {
  const [file, setFile] = useState<File | null>(null)
  //const { isLoading, isError } = useGetMeQuery(undefined);
  const { user } = useAppSelector((state) => state.user);

  // if (isLoading) {
  //   return <ProfileLoading />
  // }

  //if (!isLoading && !isError) {


    return (
      <div className="min-h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Admin Profile</h1>

            <div className="flex justify-center mb-8">
              <div className="relative">
                <ProfilePic setFile={setFile}/>
              </div>
            </div>
            <ProfileForm user={user} file={file}/>
          </div>
        </div>
      </div>
    )
  //}
}

export default ProfilePage;