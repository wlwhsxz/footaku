import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Fragment,
  Suspense,
  lazy,
  memo,
} from "react";
import styled from "styled-components";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PostType } from "../../../types";
import { useLikeStore } from "../../../store/useLikeStore";
import SkeletonPost from "./SkeletonPost";

const Header = lazy(() => import("./Header"));
const Content = lazy(() => import("./Content"));
const Footer = lazy(() => import("./footer/Footer"));

const Post: React.FC = () => {
  const [postData, setPostData] = useState<PostType[]>([]);
  const [nextPageToken, setNextPageToken] = useState<number | null>(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const updatePostLikes = useLikeStore((state) => state.updatePostLikes);
  const updateCommentLikes = useLikeStore((state) => state.updateCommentLikes);

  const lastPostElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasMore &&
            !loading &&
            nextPageToken !== null
          ) {
            fetchPosts();
          }
        },
        {
          rootMargin: "100px",
          threshold: 0.1,
        }
      );
      if (node) observer.current.observe(node);
    },
    [hasMore, loading, nextPageToken]
  );

  const fetchPosts = useCallback(async () => {
    if (nextPageToken === null || loading) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        {
          params: {
            pageToken: nextPageToken,
            limit: 3,
          },
          withCredentials: true,
        }
      );
      const data = response.data as {
        data: PostType[];
        nextPageToken: number | null;
      };

      if (data && data.data) {
        setPostData((prevPosts) => [...prevPosts, ...data.data]);
        setNextPageToken(data.nextPageToken);
        setHasMore(data.data.length > 0 && data.nextPageToken !== null);

        data.data.forEach((post) => {
          updatePostLikes(
            post.postId,
            post.likes.map((like) => like)
          );
          post.content?.comments?.forEach((comment) => {
            updateCommentLikes(
              comment._id.toString(),
              comment.likes.map((like) => like)
            );
          });
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  }, [nextPageToken, hasMore, loading, updatePostLikes, updateCommentLikes]);

  useEffect(() => {
    fetchPosts();
  }, []);

  if (postData.length === 0 && !loading) return <div>Loading...</div>;

  return (
    <HelmetProvider>
      <Fragment>
        <Helmet>
          {postData.map((post) => (
            <link
              key={post.postId}
              rel="preload"
              href={post.content?.postImg}
              as="image"
            />
          ))}
        </Helmet>
        <Suspense
          fallback={
            <Fragment>
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonPost key={index} />
              ))}
            </Fragment>
          }
        >
          {postData.map((post, index) => (
            <PostContainer
              key={`${post.postId}+${index}`}
              ref={index === postData.length - 1 ? lastPostElementRef : null}
            >
              <Header
                name={post.name}
                profileImg={post.profileImg}
                pastDate={new Date(post.publishedAt)}
              />
              <Content postImg={post.content?.postImg} postURL={post.postURL} />
              <Footer
                _id={post._id}
                postId={post.postId}
                comments={post.content?.comments}
                summary={post.content?.summary}
              />
            </PostContainer>
          ))}
          {loading && (
            <Fragment>
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonPost key={index} />
              ))}
            </Fragment>
          )}
        </Suspense>
      </Fragment>
    </HelmetProvider>
  );
};

export default memo(Post);

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 468px;
  margin-bottom: 20px;
  padding: 0 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;
