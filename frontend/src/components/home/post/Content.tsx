import styled from "styled-components";
import React, { useEffect } from "react";

interface ContentProps {
  postImg: string;
}

declare global {
  interface Window {
    instgrm: any;
    twttr: any;
  }
}

const InstagramPost = () => {
  useEffect(() => {
    // Instagram embed 스크립트를 동적으로 추가하는 부분
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // 스크립트가 로드된 후 Instagram의 embed 처리 함수를 호출
    script.onload = () => {
      window.instgrm.Embeds.process();
    };

    // 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink="https://www.instagram.com/p/CuFC3Z5NISN/?utm_source=ig_embed&amp;utm_campaign=loading"
      data-instgrm-version="14"
    >
      ???
    </blockquote>
  );
};

const TwitterPostEmbed = () => {
  useEffect(() => {
    // Twitter 스크립트를 로드하는 함수
    const loadTwitterScript = () => {
      // 이미 스크립트가 페이지에 존재하는지 확인
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";

        // 스크립트를 body에 추가
        document.body.appendChild(script);
      } else {
        // 이미 로드된 경우, Twitter 위젯을 초기화
        window.twttr.widgets.load();
      }
    };

    loadTwitterScript();

    // 컴포넌트 언마운트 시 실행되는 정리 함수
    return () => {
      // 필요한 경우, 여기서 정리 작업을 수행
    };
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        And breath! Footballing wise we were no where near it today but grit and
        determination was top. Huge credit to the fans, hopefully you have nails
        left 😂❤️{" "}
        <a href="https://twitter.com/Arsenal?ref_src=twsrc%5Etfw">@Arsenal</a>
      </p>
      &mdash; Aaron (@AaronRamsdale98){" "}
      <a href="https://twitter.com/AaronRamsdale98/status/1581690452767830016?ref_src=twsrc%5Etfw">
        October 16, 2022
      </a>
    </blockquote>
  );
};

const Content: React.FC<ContentProps> = ({ postImg }) => {
  return (
    <div>
      <PostMedia>
        <InstagramPost />
        <TwitterPostEmbed />
        <img src={postImg} alt="postImg" />
      </PostMedia>
    </div>
  );
};

export default Content;

const PostMedia = styled.div`
  img {
    width: 100%;
  }
`;
