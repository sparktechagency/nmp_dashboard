import ContactList from "../../components/contact/ContactList"

const ContactPage = () => {
  return (
    <>
      <div>
        <div className="bg-white rounded-lg shadow h-full overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <ContactList/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage