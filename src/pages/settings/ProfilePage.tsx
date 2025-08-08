"use client";

import ProfileLoading from "../../components/loader/ProfileLoading";
import ProfileForm from "../../components/Profile/ProfileForm"
import { useAppSelector } from "../../redux/hooks/hooks";
import { useGetMeQuery } from "../../redux/features/user/userApi";

const ProfilePage = () => {
  const { isLoading, isError } = useGetMeQuery(undefined);
  const { user } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <ProfileLoading />
  }

  if (!isLoading && !isError) {


    return (
      <div className="min-h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Admin Profile</h1>  
            <ProfileForm admin={user}/>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage;
