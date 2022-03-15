import { useContext, useState } from "react"
import { companyContext } from "../../context/company_context/companyContext"
import logo from "../../assets/logo.jpg"
import { Edit, CloseRounded } from "@material-ui/icons"
import "./styles/name.css"
import { AddToProfile } from "../../api_Calls/companyCall"
import { authContext } from "../../context/auth_context/authContext"
function CompanyName({ setShowOverlay, fetcher, company, setFetcher }) {
  const [openForm, setOpenForm] = useState(false)
  const [name, setCompanyName] = useState(false)
  const { user } = useContext(authContext)
  const { dispatch } = useContext(companyContext)
  const body = { name }
  const handleAddValues = (e) => {
    console.log(body)
    e.preventDefault()
    AddToProfile(body, dispatch)
    setFetcher(!fetcher)
    closeValuesFormHandler()
  }
  const openValuesFormHandler = () => {
    setShowOverlay(true)
    setOpenForm(true)
  }
  const closeValuesFormHandler = () => {
    setShowOverlay(false)
    setOpenForm(false)
  }
  const authorized = user?._id === company?.user

  return (
    <div className="col-12 row company-name">
      {openForm && (
        <form className="edit-name-form" onSubmit={handleAddValues}>
          <h6 className="text-success">Enter a New Company's Name</h6>
          <CloseRounded
            className="close-values-form"
            onClick={closeValuesFormHandler}
          />
          <input
            name="name"
            placeholder="write name for your bussiness"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="submit"
            placeholder="Update Name"
            className="btn btn-success btn-sm add-value-submit"
          />
        </form>
      )}
      <img src={logo} alt="" className="logo col-3 " />

      <div className="name comapny-title col-8">
        <>
          <h5 className="company-title">{company && company.name}</h5>
          {user && authorized && (
            <Edit
              className="settings-icon name-icon"
              onClick={openValuesFormHandler}
            />
          )}
        </>
      </div>
    </div>
  )
}

export default CompanyName
