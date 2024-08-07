import React from "react";
import styled from "styled-components";

interface OverlayProps {
  content: string;
  address: string;
  phone: string | number;
  road: string;
}
const MapOverlay: React.FC<OverlayProps> = ({
  content,
  address,
  phone,
  road,
}) => {
  return (
    <OverlayWrapper>
      <OVContent>{content}</OVContent>
      <OVAdress>{address}</OVAdress>
      <OVRoad>{road}</OVRoad>
      <OVPhone>{phone ? phone : "번호없음"}</OVPhone>
    </OverlayWrapper>
  );
};
const OverlayWrapper = styled.div`
  width: 200px;
  height: 80px;
  text-align: left;
`;
const OVContent = styled.div`
  font-size: 16px;
  font-weight: 800;
  padding: 0.3rem;
`;
const OVAdress = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-top: 0.1rem;
  margin-left: 0.3rem;
  margin-bottom: 0.05rem;
  color: #505050;
`;
const OVPhone = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-left: 0.3rem;
  color: #0064ff;
`;
const OVRoad = styled.div`
  font-size: 10px;
  font-weight: 700;
  margin-left: 0.3rem;
  color: #737373;
  margin-bottom: 0.4rem;
`;
export default MapOverlay;
