import React from "react";
import styled from "styled-components";

// Define the props for the ExceptionComponent
type ExceptionComponentProps ={
  imageSrc: string;
  altText: string;
  message: string;
  messageTitle: string;
}

const ExceptionComponent: React.FC<ExceptionComponentProps> = ({
  imageSrc,
  altText,
  message,
  messageTitle,
}) => {
  return (
    <ExceptionWrapper>
      <Image src={imageSrc} alt={altText} />
      <Message>{message}</Message>
      <MessageTitle>{messageTitle}</MessageTitle>
    </ExceptionWrapper>
  );
};

export default ExceptionComponent;

const ExceptionWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Image = styled.img`
  width: 170px;
  height: auto;
  margin-bottom: 2rem;
`;

const Message = styled.div`
  font-family: pretendard;
  font-weight: 600;
  font-size: 16px;
  color: #939393;
  margin-bottom: 0.4rem;
  font-weight: 800;
`;

const MessageTitle = styled.div`
  font-family: pretendard;
  font-size: 23px;
  font-weight: 800;
  color: #505050;
`;
