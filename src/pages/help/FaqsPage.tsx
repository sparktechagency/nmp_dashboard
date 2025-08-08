import FaqList from "../../components/faq/FaqList";


const FaqsPage = () => {
  return (
    <div className="p-6 mx-auto h-full bg-white rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">FAQs</h2>
      <FaqList/>
    </div>
  );
};

export default FaqsPage;