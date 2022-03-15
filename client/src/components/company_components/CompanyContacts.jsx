import "./styles/contacts.css"
import AddBoxOutlined from "@material-ui/icons/AddBoxOutlined"
import EmailOutlined from "@material-ui/icons/EmailOutlined"
import Edit from "@material-ui/icons/Edit"

import { companyContext } from "../../context/company_context/companyContext"
import { AddToProfile } from "../../api_Calls/companyCall"
import { useContext, useState } from "react"
import { authContext } from "../../context/auth_context/authContext"
import { useFetch } from "../../hooks/useFetch"
import { useLocation } from "react-router-dom"
import Phones from "./Phones"
import NoPhonesMsg from "./NoPhonesMsg"
import ContactsForm from "./ContactsForm"
function CompanyContacts({ setShowOverlay }) {
  const [phones, setPhones] = useState([])
  const [emails, setEmails] = useState([])
  const [showForm, setShowForm] = useState(false)
  const { user } = useContext(authContext)
  const { dispatch, company: currentCompany } = useContext(companyContext)
  const { pathname } = useLocation()
  const id = pathname.split("/").pop()
  const {
    data: company,
    loading,
    setFetcher,
    fetcher,
  } = useFetch(`/companiesProfiles/${id}`)
  const addContactsHandler = (e) => {
    e.preventDefault()
    const body = {
      contacts: {
        emails: emails.split(",").map((email) => email.trim()),
        phones: phones.split(",").map((phone) => phone.trim()),
      },
    }
    AddToProfile(body, dispatch)
    setFetcher(!fetcher)
    closeContactsForm()
  }
  const closeContactsForm = () => {
    setShowOverlay(false)
    setShowForm(false)
  }
  const showContactsForm = () => {
    console.log(showForm)
    setShowForm(true)
    setShowOverlay(true)
  }
  const authorized = user?._id === company?.user

  return (
    <div className="contacts col-12  ">
      <div className="text-warning">Contacs: </div>
      {company?.contacts?.emails < 1 && company?.contacts?.phones < 1 ? (
        <>
          {authorized ? (
            <div className="text-center small">
              Please Add your Comapany Phone Numbers and the Emails... Click
              here to add{" "}
              <AddBoxOutlined
                className="contacts-icon"
                onClick={showContactsForm}
              />
            </div>
          ) : (
            <div className="text-white text-center spacing">
              {company && company?.name} Did't Add Any Contacts!
            </div>
          )}
          <NoPhonesMsg />
        </>
      ) : (
        <>
          <div className="contacts-container">
            <Phones company={company} />
            <span className="email">
              {company &&
                company?.contacts?.emails?.map((email) => {
                  return (
                    <span key={email}>
                      <EmailOutlined className="email-icon" />
                      <a className="m-2 link" href={`mailto:${email}`}>
                        {email}
                      </a>
                    </span>
                  )
                })}
            </span>
            {authorized && (
              <Edit className="contacts-icon" onClick={showContactsForm} />
            )}
          </div>
        </>
      )}
      {showForm && (
        <ContactsForm
          company={company}
          setEmails={setEmails}
          closeContactsForm={closeContactsForm}
          setPhones={setPhones}
          addContactsHandler={addContactsHandler}
        />
      )}
    </div>
  )
}

export default CompanyContacts
