import "./styles/hightPayingJobs.css";
import { useState, useRef, useEffect } from "react";

import { profiles } from "../../api_Calls/profiles"
import { axiosInstance } from "../../config/axiosInstance"
import { Spinner } from "react-bootstrap"

const TopProfiles = ({ profile }) => {
  const [loadingJobs, setLoadingJobs] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliding, setSliding] = useState(true)
  const [sliderWidth, setSliderWidth] = useState(0)

  const [highPayingJobs, setHighPayingJobs] = useState(0)
  let widthRef = useRef()
  useEffect(() => {
    async function fetchHighPayJobs() {
      setLoadingJobs(true)
      try {
        const res = await axiosInstance.get("/jobs/hightPaying")
        setHighPayingJobs(res.data)
        setLoadingJobs(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchHighPayJobs()
  }, [])
  useEffect(() => {
    setSliderWidth(widthRef?.current?.offsetWidth)
    if (sliding) {
      const slide = setInterval(() => {
        if (currentSlide === 0) {
          setCurrentSlide(currentSlide + 1)
        }
        if (currentSlide < 3) {
          setCurrentSlide(currentSlide + 1)
        }
        if (currentSlide === 3) {
          setCurrentSlide(0)
        }
        clearInterval(slide)
      }, 5000)
    }
  }, [currentSlide])

  return (
    <div className="high-paying-jobs-parent col-md-7 col-12 m-auto   mt-2 ">
      <h4 className="text-center high-paying-jobs-title">High Paying Jobs</h4>
      <div className="slider ">
        {loadingJobs && (
          <Spinner
            className=" slider-spinner col-12"
            animation="grow"
            role="status"
          />
        )}
        {highPayingJobs &&
          highPayingJobs?.slice(0, 3)?.map((job) => {
            return (
              // slide
              <div
                ref={widthRef}
                className="col slide col-12 p-2  "
                style={{
                  transform: `translateX(-${currentSlide * sliderWidth}px)`,
                }}
                key={job._id}
              >
                <div className="row col-12">
                  <header>
                    <div className="company-info">
                      <img
                        src={profile}
                        alt="profile-img "
                        className="hight-pay-job-img"
                      />
                      <span className="">
                        {job?.companyName} some other word
                      </span>
                    </div>{" "}
                    <div className="high-pay-job-title">
                      <span className="text-primary">{job?.shift} - </span>
                      <span className="high-pay-job-title h2">
                        {job?.title}
                      </span>
                      <span className="text-success ">{`- $${job?.salary}`}</span>
                    </div>
                  </header>
                  <div className=" col-12"></div>
                  <p className="High-paying-job-description">
                    {job?.description?.split(" ").slice(0, 30).join(" ")}{" "}
                    <span className="text-primary">...</span>
                  </p>
                </div>
                <button className="btn btn-outline-dark btn-lg">
                  View Details
                </button>
                {/* <div className="card-body ">{}</div> */}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default TopProfiles;
