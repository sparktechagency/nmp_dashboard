import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/hooks';
import UserLoading from '../loader/UserLoading';
import profile_placeholder from "../../assets/images/profile_placeholder.png";
import { useGetMyProfileQuery } from '../../redux/features/user/userApi';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isFetching } = useGetMyProfileQuery(undefined);
  const { user } = useAppSelector((state) => state.user);


  return (
    <header className="bg-white text-white h-16 flex items-center justify-between px-4 z-10 border-b">
      <div className="flex items-center">
        {children}
        <h1 className="md:hidden text-lg font-semibold text-white">Dashflow</h1>
      </div>
      <div className="flex items-center space-x-3" onClick={() => navigate("/profile")}>
        {isLoading || isFetching ? (
          <UserLoading />
        ) : (
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={user?.profile_img ? user?.profile_img  : profile_placeholder}
              alt="Profile"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = profile_placeholder;
              }}
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-gray-800 font-medium">{user?.fullName}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;