import { Mail, Phone, MapPin } from "lucide-react"
import UpdateInformationModal from "../../components/modal/information/UpdateInformationModal";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import { useGetInformationQuery } from "../../redux/features/information/informationApi";
import InformationLoading from "../../components/loader/InformationLoading";

const InformationPage = () => {
  const { data, isLoading, isError } = useGetInformationQuery(undefined);
  const information = data?.data || {};


  if (isLoading) {
    return <InformationLoading />
  }

  if (!isLoading && isError) {
    return <h1>Serever error occured</h1>
  }

  if (!isLoading && information) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6 relative">
        <UpdateInformationModal information={information}/>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Contact Information</h2>
          {/* <p className="text-gray-600 text-sm">Triple M Company</p> */}
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Email</p>
              <p className="text-gray-900">{information?.email || "not provided"}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Phone</p>
              <p className="text-gray-900">{information?.phone}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Address</p>
              <p className="text-gray-900">{information?.address}</p>
            </div>
          </div>
          {/* Instagram */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <FaInstagram className="h-5 w-5 text-[#E1306C]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Instagram Link</p>
              <a

                href={information?.instagram}
                target="_blank"
                className="font-medium text-blue-500 hover:underline"
              >
                Click Here
              </a>
            </div>
          </div>
          {/* Teligram */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <FaTelegram className="w-5 h-5 text-[#0088cc]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Teligram Link</p>
             <a

                href={information?.telegram}
                target="_blank"
                className="font-medium text-blue-500 hover:underline"
              >
                Click Here
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InformationPage;
