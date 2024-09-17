import styled from "@emotion/styled";

export const RovinoxTitle = styled.h2`
  font-family: monospace;
  padding: 5px;
  letter-spacing: 0.3rem;
  .orangeText {
    color: #ec572c;
  }
`;

export const CoursePromise = styled.p`
  display: flex;
  align-items: center;
  margin-left: 30px;
  font-size: 24px;
  font-weight: 600;
  padding: 12px;

  p {
    margin: 0;
  }
`;

export const ApplyButton = styled.a`
  border: 2px solid lightblue;
  background: linear-gradient(to right, #0a71a5, #23aef7),
    linear-gradient(90deg, #0a71a5, #23aef7);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  padding: 10px 50px 10px 50px;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #ffffff;
  height: 19px;
  line-height: 19px;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(to right, white, white),
      linear-gradient(90deg, #0a71a5, #23aef7);
    background-clip: padding-box, border-box;
    color: #0177a9 !important;
    cursor: pointer;
  }
`;
export const ApplyButton2 = styled.a`
  border: 2px solid lightblue;
  background: linear-gradient(to right, #0a71a5, #23aef7),
    linear-gradient(90deg, #0a71a5, #23aef7);
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  padding: 10px 50px 10px 50px;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.5px;
  color: #ffffff;
  height: 19px;
  line-height: 19px;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(to right, white, white),
      linear-gradient(90deg, #0a71a5, #23aef7);
    background-clip: padding-box, border-box;
    color: #0177a9 !important;
    cursor: pointer;
  }
`;

export const CoursePacketButton = styled.a`
  background-color: #05aae1;
  border-radius: 4px;
  box-shadow: 0px 6px 6px rgb(11 31 39 / 8%);
  color: #fff !important;
  font: 16px/19px ProximaNova-Bold, tahoma, verdana, arial, sans-serif;
  font-weight: 600;
  margin-left: 5px;
  padding: 23px 10px;
  text-align: center;
  text-decoration: none !important;
  transition: 0.21s;
  vertical-align: middle;
  // margin-top: 220px;

  &:hover {
    cursor: pointer;
    background: red;
  }
`;
