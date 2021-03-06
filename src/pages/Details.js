import React from "react";
import moment from "moment";
import Swal from "sweetalert2";
import styled from "styled-components";
import $ from "jquery";
import { StoryContext } from "../contexts/StoryContext";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

export default function Story(props) {
  const {
    likeStory,
    getStory,
    story,
    loading,
    unlikeStory,
    makeComment,
  } = React.useContext(StoryContext);
  const { user } = React.useContext(AuthContext);
  const [value, setValue] = React.useState({ text: "" });
  const [mounted, setMounted] = React.useState(false);

  // get single story
  // const callGetStory = React.useCallback(() => {
  //   return () => mounted && getStory(props.match.params.id);
  // }, [mounted, getStory, props.match.params.id]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    background: "#fcb708",
  });

  const id = props.match.params.id;

  React.useEffect(() => {
    setMounted(true);
    //callGetStory();
    mounted && getStory(id);
    return () => {
      setMounted(false);
    };
  }, [id, mounted]);

  // post comment handler
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (user) {
      makeComment(story._id, { text: value });
      getStory(props.match.params.id);
      setValue({ text: "" });
    } else {
      Toast.fire({
        type: "warning",
        title: "Sign in to comment on a story",
      });
    }
  };

  const handleLike = () => {
    if (user) {
      likeStory(story?._id);
      getStory(props.match.params.id);
    } else {
      Toast.fire({
        type: "warning",
        title: "Sign in to like a story",
      });
    }
  };

  // comment word count
  $(document).ready(function () {
    $("*[data-max]").keyup(function () {
      let text_max = $(this).data("max");
      let text_length = $(this).val().length;
      let text_remaining = text_max - text_length;
      $(".char-max-alert").html(`${text_length}/${text_remaining}`);
    });
  });

  return (
    <SingleStory className='container mt-5'>
      {loading ? (
        <Spinner title='story loading...' />
      ) : (
        <>
          <div className='row mx-auto '>
            <div className='single-p col-sm-12 col-md-6 shadow p-4 mb-4'>
              <p className='title'>
                <strong>Title: </strong>
                {story?.title}
              </p>
              <p className='justify-body'>
                <strong>Content: </strong> {story?.content}
              </p>
              <p className='date'>
                <strong>Date: </strong>
                {moment(story?.createdAt).fromNow(true)} ago
              </p>
              <p className='date'>
                <strong>Story from: </strong>
                {story?.user?.username}
              </p>
              <div className='likes'>
                {story?.likes?.includes(user?._id) ? (
                  <i
                    className='fas fa-thumbs-down mr-3'
                    onClick={() => {
                      user && unlikeStory(story?._id);
                      getStory(props.match.params.id);
                    }}
                  ></i>
                ) : (
                  <i
                    className='fas fa-thumbs-up'
                    onClick={() => handleLike()}
                  ></i>
                )}
                <h4 className='red-text'>{story?.likes?.length} likes</h4>
              </div>
            </div>

            <div className='comment-form col-sm-12 col-md-5 offset-md-1'>
              <form onSubmit={handleCommentSubmit} className=''>
                <textarea
                  maxLength='55'
                  data-max='55'
                  type='text'
                  placeholder='Comment...'
                  onChange={(e) => setValue(e.target?.value)}
                  required
                ></textarea>
                <br />
                <button>{"Post comment"}</button>
                <p className='char-max-alert red-text'></p>
              </form>
            </div>
          </div>
          <div className='row mx-auto'>
            <div className='col-sm-12 col-md-6 mt-3 comments p-2'>
              <h5>
                {story?.comments?.length > 0 ? "Comments" : "No comments yet"}
              </h5>
              {story?.comments?.map((comment) => {
                return (
                  <div className='comment' key={comment._id}>
                    <p className=''>
                      <span>{comment?.username} = </span>
                      {comment?.text}
                      <i className='fas fa-thrash-alt'></i>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </SingleStory>
  );
}

const SingleStory = styled.div`
  .single-p {
    background-color: var(--clr-grey-5);
  }
  .comment-form textarea {
    background-color: white;
    color: purple;
  }

  .comment-form button,
  textarea {
    width: 100%;
  }
  .comment-form button {
    background-color: var(--clr-grey-2);
    color: var(--clr-white-1);
  }

  .comment-form button:hover {
    background-color: var(--clr-grey-3);
    color: var(--hover-color-1);
    transition: var(--mainTransition);
  }
  .comment-form textarea {
    height: 5rem;
    padding: 0.3rem;
  }

  .comments {
    background-color: var(--clr-grey-5);
    margin-bottom: 1rem;
  }
  .comments p {
    background-color: var(--clr-white-1);
    padding: 0.5rem;
    min-height: 5vh;
    overflow-y: scroll;
  }
`;
