import React from "react";
import styled, { keyframes } from "styled-components";

const skeletonAnimation = keyframes`
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #ddd;
  }
  100% {
    background-color: #eee;
  }
`;

const SkeletonContainer = styled.div`
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

const SkeletonHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px 12px 4px;
`;

const SkeletonProfileImg = styled.div`
  padding-right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eee;
  animation: ${skeletonAnimation} 1.5s infinite;
`;

const SkeletonProfileText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;

  & > div {
    width: 80%;
    height: 10px;
    background: #eee;
    animation: ${skeletonAnimation} 1.5s infinite;
  }
`;

const SkeletonMoreIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #eee;
  animation: ${skeletonAnimation} 1.5s infinite;
`;

const SkeletonContent = styled.div`
  width: 100%;
  height: 350px;
  background: #eee;
  animation: ${skeletonAnimation} 1.5s infinite;
  margin: 10px 0;
`;

const SkeletonFooter = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  padding: 10px;
`;

const SkeletonFooterText = styled.div`
  width: 100%;
  height: 20px;
  background: #eee;
  animation: ${skeletonAnimation} 1.5s infinite;
  margin-bottom: 5px;
`;

const SkeletonPost: React.FC = () => {
  return (
    <SkeletonContainer>
      <SkeletonHeader>
        <SkeletonProfileImg />
        <SkeletonProfileText>
          <div />
          <div />
        </SkeletonProfileText>
        <SkeletonMoreIcon />
      </SkeletonHeader>
      <SkeletonContent />
      <SkeletonFooter>
        <SkeletonFooterText />
        <SkeletonFooterText style={{ width: "80%" }} />
        <SkeletonFooterText style={{ width: "60%" }} />
      </SkeletonFooter>
    </SkeletonContainer>
  );
};

export default SkeletonPost;
