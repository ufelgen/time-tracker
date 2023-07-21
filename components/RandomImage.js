import Image from "next/image";
import { StyledImagePage, StyledImageContainer } from "./AllStyles";

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
          alt="awesome picture"
          fill
          resizeMode="cover"
          priority
        />
      </StyledImageContainer>
    </StyledImagePage>
  );
}
