//ui
import "./styles/posts.css"
//init
import { useEffect, useState } from "react"
//others
 //components
import PostHeader from "./PostHeader"
import PostBody from "./PostBody"
import InfoAndActioins from "./InfoAndActioins"
import Comments from "./Comments"
import Pagination from "../jobs/Pagination"
import { axiosInstance, PF } from "../../config/axiosInstance"
import Loaders from "../common/Loaders"
function ShowAll({ user, openDropDown, setOpenDropDown }) {
  const [loadingPosts, setLoadingPosts] = useState(false)

  const [posts, setPosts] = useState([])
  const [delMsg, setMsg] = useState("")
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const [commentedOn, setCommentedOn] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)
  useEffect(() => {
    async function fetchPost() {
      setLoadingPosts(true)
      try {
        const res = await axiosInstance.get("/posts")
        if (res.data) {
          setPosts(res.data)
          setLoadingPosts(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [delMsg, likes])

  const deletePostHandler = async (id) => {
    try {
      const res = await axiosInstance.delete(`/posts/${id}`)
      console.log(res.data)
      res.data && setMsg(res.data)
      setTimeout(() => {
        setMsg("")
      }, 3000)
    } catch (error) {}
  }
  const handleLike = async (id) => {
    try {
      const res = await axiosInstance.put(`/posts/likePost/${id}`)
      console.log(res.data)
      setLiked(id)
      setLiked(null)
      setLikes(res.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const handleUnlike = async (id) => {
    try {
      const res = await axiosInstance.put(`/posts/unlikePost/${id}`)
      console.log(res.data)
      setLiked(id)
      res.data && setLikes(res.data)
    } catch (error) {
      console.log(error.response.data.errors)
    }
  }

  const indexOfLastJob = currentPage * itemsPerPage
  const indexOfFirstJob = indexOfLastJob - itemsPerPage
  const currentJobs = posts.slice(indexOfFirstJob, indexOfLastJob)

  return (
    <div className="posts col-12 m-auto mt-2">
      <h6 className="posts-title">Posts from Candidates</h6>
      <div className="posts-container">
        {loadingPosts && <Loaders />}
        {posts &&
          currentJobs.map((post) => {
            const hasLike = post?.likes.find((like) => like.user === user?._id)

            return (
              <div className="post row" key={post._id}>
                <PostHeader
                  post={post}
                  user={user}
                  setOpenDropDown={setOpenDropDown}
                  openDropDown={openDropDown}
                  deletePostHandler={deletePostHandler}
                  PF={PF}
                />
                <PostBody post={post} />
                <InfoAndActioins
                  post={post}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                  commentedOn={commentedOn}
                  hasLike={hasLike}
                  liked={liked}
                  setShowComments={setShowComments}
                  comments={comments}
                />
                {}
                {showComments === post._id && (
                  <Comments
                    user={user}
                    comments={comments}
                    setCommentedOn={setCommentedOn}
                    setComments={setComments}
                    setShowComments={setShowComments}
                    // setDelCommentMsg={setDelCommentMsg}
                    post={post}
                  />
                )}
              </div>
            )
          })}
      </div>
      <Pagination
        items={posts}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default ShowAll
