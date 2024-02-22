import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import PostButtons from '../../common/buttons/PostButtons';


interface PostDetailProps {
  onClose: () => void;
}

interface Post {
  content: {
    postImg: string;
    comments: [{
      comment: string,
      name: string,
      profileImg: string,
      userId: string,
    }];
  };
  name: String;
  profileImg: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [postData, setPostData] = useState<Post | null>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/api/posts');
      const data = await response.json();
      setPostData(data.data[0]);
    };

    fetchData();
  }, []);

  return (
    <PostDetailContainer>
      <CloseButton onClick={onClose}>
        <img src="https://cdn-icons-png.flaticon.com/128/458/458595.png" alt="Close" />
      </CloseButton>
      <ContentContainer>
        <PostMedia>
          {postData && <img src={postData.content.postImg} alt="Post" /> }
        </PostMedia>
        <PostSummary>
          <PostHeader>
            <img src={postData?.profileImg} />
            {postData?.name}
          </PostHeader>
          <PostCommentSection>
            {postData?.content.comments.map((comment) => {
              return (
                <Comment>
                  <img src={comment.profileImg}/>
                  {comment.comment}
                </Comment>
              );
            })}
          </PostCommentSection>
          <PostFooter>
            <PostButtons focusInput={focusInput}/>
          </PostFooter>
          <div>

          </div>
       </PostSummary>
      </ContentContainer>
    </PostDetailContainer>
  );
  ;
};

export default PostDetail;

const PostDetailContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;


  width: 100vw;
  height: 100vh;
`

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 20px 20px 0 0;

  img {
    width: 16px;
    height: 16px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 70vw;
  height: 90vh;
  
`

const PostMedia = styled.div`
  flex: 1;

  img {
    flex: 1;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`

const PostSummary = styled.div`
  flex: 1;
  background-color: yellow;
`

const PostHeader = styled.div`
  display: flex;

  img {
    width: 24px;
  }
`

const PostCommentSection = styled.div`
`

const Comment = styled.div`
  display: flex;
`

const PostFooter = styled.div`
`