import SubscribeList from "../../components/subsciber/SubscribeList"

const SubscribersPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <SubscribeList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubscribersPage