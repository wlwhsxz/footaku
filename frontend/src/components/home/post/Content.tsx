import styled from "styled-components";

const Content = () => {
  return (
    <div>
      <PostMedia><img src='https://cdn.k-trendynews.com/news/photo/202109/121431_157373_323.jpg' /></PostMedia>
    </div>
  )
}

export default Content;

const PostMedia = styled.div`

  img {
    width: 100%;
  }
`



