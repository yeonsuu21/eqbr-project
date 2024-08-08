import { type } from "os";
import React from "react";
import styled from "styled-components";

type ExceptionComponentProps = {
  imageSrc: string;
  altText: string;
  message: string;
  messageSub?: string;
  messageTitle: string;
  buttonText?: string;
  onButtonClick?: () => void;
  imageWidth?: string;
  marginTop?: string;
}

const ExceptionComponent: React.FC<ExceptionComponentProps> = ({
  imageSrc,
  altText,
  message,
  messageSub,
  messageTitle,
  buttonText,
  onButtonClick,
  imageWidth = "100px",
  marginTop = "12rem",
}) => {
  return (
    <ExceptionWrapper style={{ marginTop }}>
      <Image src={imageSrc} alt={altText} style={{ width: imageWidth }} />
      <Message>{message}</Message>
      {messageSub && <MessageSub>{messageSub}</MessageSub>}
      <MessageTitle>{messageTitle}</MessageTitle>
      {buttonText && onButtonClick && (
        <ExceptBtn onClick={onButtonClick}>{buttonText}</ExceptBtn>
      )}
    </ExceptionWrapper>
  );
};

export default ExceptionComponent;

const ExceptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Image = styled.img`
  height: auto;
  margin-bottom: 30px;
`;

const Message = styled.div`
  font-size: 17px;
  color: #737373;
  margin-bottom: 0.3rem;
  font-weight: 800;
`;

const MessageSub = styled.div`
  font-size: 13px;
  color: #939393;
  margin-bottom: 1rem;
`;

const MessageTitle = styled.div`
  font-size: 25px;
  font-weight: 800;
  color: #333;
  margin-bottom: 3.5rem;
`;

const ExceptBtn = styled.button`
  border: none;
  font-family: pretendard;
  padding: 0.7rem 5rem;
  border-radius: 20px;
  font-weight: 700;
  color: #505050;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #253bff;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
