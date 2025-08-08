import UserList from "../../components/user/UserList";

const UsersPage = () => {
  return (
    <>
      <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <UserList/>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
