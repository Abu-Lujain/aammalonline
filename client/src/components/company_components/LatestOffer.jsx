import "./styles/latestOffer.css"
import React, { useEffect, useState } from "react"
import { axiosInstance } from "../../config/axiosInstance"
function LatestOffer({ company }) {
  const [lastestOffer, setLatestOffer] = useState({})
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/jobs/company/" + company.user)
        console.log(res.data.slice(0, 1))
        lastestOffer(res.data)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [company, lastestOffer])

  console.log(lastestOffer)
  return (
    <div className="latest-offer col-12 col-md-7">
      <>
        <div class="card-body">
          <h5 class="card-title">Full Stack web developer</h5>
          <h6 class="card-subtitle mb-2 text-success">10K per month</h6>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content. Some quick example text to build on the
            card title and make up the bulk of the card's content.
          </p>
        </div>
        <div className="actions align-items bg-light p-2">
          <a href="#" class="btn btn-sm btn-info">
            View Details
          </a>
          <a href="#" class="btn btn-sm btn-primary">
            Apply
          </a>
        </div>
      </>
    </div>
  )
}

export default LatestOffer
