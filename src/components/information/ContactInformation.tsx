import type { IInformation } from "../../types/information.type"
import { Mail, Phone, MapPin } from "lucide-react"
import UpdateInformationModal from "../modal/information/UpdateInformationModal";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";
import { SiSubtitleedit } from "react-icons/si";

type TProps = {
  information: IInformation
}

const ContactInformation = ({ information } : TProps) => {
  return (
    <>
         <div className="w-full mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6 relative">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Information</h2>
              </div>

              <UpdateInformationModal information={information} />

              {/* Contact Details */}
              <div className="space-y-4">
                {/* Title */}
                <div className="flex items-center space-x-3">
                  <MdOutlineTitle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Title</p>
                    <p className="text-gray-900">{information?.title || "not provided"}</p>
                  </div>
                </div>

                {/* Sub Title */}
                <div className="flex items-center space-x-3">
                  <SiSubtitleedit className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Sub Title</p>
                    <p className="text-gray-900">{information?.subTitle || "not provided"}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-gray-900">{information?.email || "not provided"}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                  {/* Phone */}
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-gray-900">{information?.phone || "not provided"}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    <p className="text-gray-900">{information?.address || "not provided"}</p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start space-x-3">
                  <FaInstagram className="h-5 w-5 text-[#E1306C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Instagram Link</p>
                    {information?.instagram ? (
                      <a
                        href={information.instagram}
                        target="_blank"
                        className="font-medium text-blue-500 hover:underline"
                      >
                        Click Here
                      </a>
                    ) : (
                      <p className="text-gray-500">not provided</p>
                    )}
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start space-x-3">
                  <FaFacebook className="w-5 h-5 text-[#1877F2] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Facebook Link</p>
                    {information?.facebook ? (
                      <a
                        href={information.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-500 hover:underline"
                      >
                        Click Here
                      </a>
                    ) : (
                      <p className="text-gray-500">not provided</p>
                    )}
                  </div>
                </div>
                {/* Age Validation */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Age Restriction</p>
                    <p className="text-gray-900">{information?.age || "not provided"}</p>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default ContactInformation