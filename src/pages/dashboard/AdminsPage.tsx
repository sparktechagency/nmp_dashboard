import AdminList from "../../components/admin/AdminList";

const AdminsPage = () => {
  return (
    <>
      <div>
        <div className="bg-white shadow rounded-lg h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <AdminList/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminsPage;
