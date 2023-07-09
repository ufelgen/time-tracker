import styled from "styled-components";
import Image from "next/image";

export default function RandomImage() {
  function getRandomNumber() {
    // adjust number according to number of images in collection
    return Math.floor(Math.random() * 405);
  }

  const url =
    "https://source.unsplash.com/collection/2022043/" + getRandomNumber();
  // adjust collection number

  return (
    <StyledImagePage>
      <StyledImageContainer>
        <Image
          src={url}
          alt="cute animal"
          layout="fill"
          objectFit="cover"
          priority
        />{" "}
      </StyledImageContainer>
    </StyledImagePage>
  );
}

const StyledImageContainer = styled.div`
  width: 300px;
  height: 300px;
  border-color: black;
  position: relative;
`;

const StyledImagePage = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    background-color: black;
    color: white;
    padding: 1rem;
    border: 1px solid darkmagenta;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    margin-top: 20px;
    width: 50%;
    position: absolute;
    bottom: -100px;
  }
`;
