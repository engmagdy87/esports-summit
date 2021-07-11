const setClipPath = () => {
  const mobile = window.matchMedia("(max-width: 600px)");
  if (mobile.matches) {
    const upperSegment = document.getElementsByClassName("upper-segment");
    const bottomLeftSegment = document.getElementsByClassName(
      "lower-segment__left"
    );
    const bottomRightSegment = document.getElementsByClassName(
      "lower-segment__right"
    );

    const upperElement = upperSegment[0];
    const bottomLeftSegmentElement = bottomLeftSegment[0];
    const bottomRightSegmentElement = bottomRightSegment[0];

    const upperClippedPath = `polygon(
      ${(20 / upperElement.clientWidth) * 100}% 0,
      100% 0%,
      ${100 - (20 / upperElement.clientWidth) * 100}% 0,
      100% ${(20 / upperElement.clientHeight) * 100}%,
      100% 0,
      100% 100%,
      0 100%,
      0 100%,
      0 ${(20 / 67) * 100}%
    )`;

    const bottomLeftSegmentClippedPath = `polygon(
      0 0,
      100% 0%,
      100% 100%,
      100% 0,
      100% 0,
      100% 100%,
      0 100%,
      16% 100%,
      0 0
    )`;
    const bottomRightSegmentClippedPath = `polygon(
      0 0,
      100% 0%,
      100% 100%,
      100% 0,
      100% 0,
      100% 100%,
      0 100%,
      16% 100%,
      0 0
    )`;

    upperElement.style.clipPath = upperClippedPath;
    bottomLeftSegmentElement.style.clipPath = bottomLeftSegmentClippedPath;
    bottomRightSegmentElement.style.clipPath = bottomRightSegmentClippedPath;
  }
};

export default setClipPath;
