import "./devProfile.css";

import React, { useState, useContext } from "react";
import { EditSharp, InsertPhotoRounded } from "@material-ui/icons";
import {
  createProfile,
  updateProfile,
  uploadProfilePhoto,
} from "../../api_Calls/profileCalls"
import { profileContext } from "../../context/profile_context/profileContext"
import { authContext } from "../../context/auth_context/authContext"
import { Spinner } from "react-bootstrap"
import { useEffect, useRef } from "react"
import Experience from "../../components/candidate_components/experience/Experience"
import Education from "../../components/candidate_components/education/Education"
import SocialMedia from "../../components/candidate_components/social_media/SocialMedia"
import { axiosInstance, PF } from "../../config/axiosInstance"
import { useLocation } from "react-router-dom"
const CadidateProfile = () => {
  const [editProfile, setEditProfile] = useState(false)
  const [bio, setBio] = useState("")
  const [title, setTitle] = useState("")
  const { user } = useContext(authContext)
  const { dispatch, profile, isFetching } = useContext(profileContext)
  const isMounted = useRef(true)
  const { pathname } = useLocation()
  console.log(pathname)
  const id = pathname.split("/").pop()
  useEffect(() => {
    createProfile(dispatch)
    async function fetchProfile() {
      try {
        const res = await axiosInstance.get(`/developersProfiles/${id}`)
        console.log(res.data)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchProfile()
  }, [])
  const body = { bio, title }
  const handleUpdate = (e) => {
    e.preventDefault()
    updateProfile(body, dispatch)
    setEditProfile(false)
  }
  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      console.log("mounted")
    }
    return () => {
      console.log("unmounted")
      isMounted.current = false
    }
  }, [isMounted, dispatch])
  const handleUpload = (e) => {
    uploadProfilePhoto(e, profile, dispatch)
  }
  console.log(profile?.photo)

  return (
    <>
      {!isMounted.current && isFetching ? (
        <div className="spinner-parent">
          <Spinner
            className="load-profile-spinner m-3"
            variant="primary"
            animation="border"
            role="status"
            setBoiUpdating
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          {/* create JS animatino */}
          <h4>Please wait ...</h4>
        </div>
      ) : (
        <div className="dev-profile  row">
          <div className="profile-info col-md-3">
            <div className="img-container">
              <img
                className="img-fluid profile-img"
                src={user?.photo && !profile?.photo && `${PF}${user.photo}`}
                alt=""
              />

              {isFetching ? (
                <Spinner
                  className="change-profile-photo-spinner"
                  animation="border"
                  role="status"
                ></Spinner>
              ) : (
                <label htmlFor="file-input">
                  {" "}
                  <InsertPhotoRounded className="change-profile-photo" />
                </label>
              )}

              <input //upload profile photo
                type="file"
                id="file-input"
                className="upload_profile-photo-input"
                onChange={handleUpload}
              />
            </div>
            <form
              className="profile-init-form col-11 mb-3 row"
              onSubmit={handleUpdate}
            >
              <>
                {isFetching ? (
                  <Spinner animation="grow" className="update-boi-spinner">
                    {" "}
                  </Spinner>
                ) : (
                  <>
                    <div className="user-name col-12">
                      <h6>{user?.userName && user.userName}</h6>
                      {!editProfile && (
                        <span
                          className=" edit-btn"
                          onClick={() => setEditProfile(true)}
                        >
                          <EditSharp />
                        </span>
                      )}
                      {editProfile ? (
                        <div className="col-12">
                          <label>what is your title?</label>
                          <input
                            autoFocus
                            className="w-100"
                            defaultValue={profile?.title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            name="title"
                          />
                        </div>
                      ) : (
                        <h4>{profile?.title && profile?.title}</h4>
                      )}
                    </div>
                    {editProfile ? (
                      <div className="col-12">
                        <label>write something about yourself </label>
                        <textarea
                          type="text"
                          name="bio"
                          defaultValue={profile?.bio && profile?.bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="about-me-parent ">
                        <h5 className="about-me-title">about me</h5>
                        <p className="about-me">
                          {profile?.bio && profile?.bio}
                        </p>
                      </div>
                    )}
                    {/* <Skills /> */}
                    {editProfile && (
                      <div className="edit-profile-actions-parent">
                        {profile?.bio && profile?.title ? (
                          <button className="btn btn-primary btn-sm">
                            update
                          </button>
                        ) : (
                          <button className="btn btn-primary btn-sm">
                            Update
                          </button>
                        )}

                        <span
                          className="btn btn-danger btn-sm"
                          onClick={() => setEditProfile(false)}
                        >
                          concel
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            </form>
          </div>

          <div className="row col-12 col-md-9">
            <Experience />
            <Education />
            <SocialMedia />
          </div>

          {/* {res.data.education.length === 0 && <Education profile={profile} />} */}
        </div>
      )}
    </>
  )
}

export default CadidateProfile;
