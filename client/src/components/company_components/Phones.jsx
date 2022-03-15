import React from "react"
import PhoneCallback from "@material-ui/icons/PhoneCallback"
function Phones({ company }) {
  return (
    <>
      {company &&
        company?.contacts?.phones?.map((phone) => {
          return (
            <span key={phone}>
              <PhoneCallback className="phone-icon" />
              <a className="m-2 link" href={`tel:${phone}`}>
                {phone}
              </a>
            </span>
          )
        })}
    </>
  )
}

export default Phones
