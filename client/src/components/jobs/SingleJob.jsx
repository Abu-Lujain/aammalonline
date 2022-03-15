import "./styles/singleJob.css"
import React, { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
 
 
import { axiosInstance } from "../../config/axiosInstance"
function SingleJob() {
  const isMounted = useRef(false)
  const { pathname } = useLocation()
  const [singleJob, setSingleJob] = useState([])

  useEffect(() => {
    isMounted.current = true
    async function fetchData() {
      try {
        const res = await axiosInstance.get(`/jobs${pathname}`)
        if (isMounted.current) {
          res.data && setSingleJob(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return () => {
      isMounted.current = false
    }
  }, [])
  console.log(singleJob)

  return (
    <div className=" row single-job col-12">
      {singleJob && (
        <>
          <header className=" col-12 row">
            <div className="details col-md-4 col-12">
              <h1>Job Details - </h1>{" "}
              <h6 className=""> {singleJob?.industry}</h6>
              {/* <button className="m-2 btn btn-primary apply-btn">Appy</button> */}
            </div>
            <div className="title col-md-7 col-12 m-auto">
              <h3>
                <span className="text-primay">
                  {/* <span className="work-place">Remote</span> -{singleJob?.shift}{" "} */}
                </span>{" "}
                {singleJob?.title} - <span>{singleJob?.shift} </span>
              </h3>
              <h5>
                <Link to={`/company/${singleJob?.company}`}>
                  {" "}
                  {singleJob?.companyName}
                </Link>
                <span className="work-place ms-3">work from office</span>
              </h5>{" "}
            </div>{" "}
          </header>
          <div className=" col-11 p-2 row details-parent">
            <div className=" col-md-3 col-5 experience-needed">
              <h3 className="text-primary">Experience</h3>
              <h4 className="job-date">{singleJob?.experienceRequired}</h4>
            </div>
            <div className=" col-md-3 col-5 education">
              <h6 className="text-primary">Education</h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
            </div>{" "}
            <div className="working-days col-md-2 col-5">
              <h6 className=" text-primary">Working Days</h6>
              {singleJob?.workingDays?.map((day) => (
                <li>{day}</li>
              ))}
            </div>
            <div className=" col-6 col-md-3 perks">
              <h6 className="text-primary ">entitlements and perks</h6>
              {singleJob &&
                singleJob?.perks?.map((p) => {
                  return <li key={p}> {p}</li>
                })}
            </div>
          </div>
          <div className="more-details  col-11 row">
            <div className="left col-md-6 col-12 ">
              <div className="description">
                <h4>description</h4>
                <p>{singleJob?.description}</p>
              </div>
            </div>{" "}
            <div className="right col-md-5 col-12 ms-auto">
              <h4>Recruitment process</h4>
              <p>{singleJob?.recruitmentProcess}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SingleJob
