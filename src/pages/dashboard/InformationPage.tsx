import { useGetInformationQuery } from "../../redux/features/information/informationApi";
import InformationLoading from "../../components/loader/InformationLoading";
import UpdateHeroImgPreview from "../../components/information/UpdateHeroImgPreview";
import ContactInformation from "../../components/information/ContactInformation";
import CountDownSection from "../../components/information/CountDownSection";
import MapLocation from "../../components/information/MapLocation";

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
     <>
        <section className="flex flex-col md:flex-row gap-6">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-12">
            <UpdateHeroImgPreview heroImg={information?.heroImg} />
            <MapLocation information={information}/>
          </div>

          {/* Right: Information */}
         <div className="w-full md:w-1/2 mx-auto space-y-4"> 
           <ContactInformation information={information}/>
           <CountDownSection information={information}/>
         </div>
        </section>
     </>
    )
  }
}

export default InformationPage;
