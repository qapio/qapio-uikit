import React from "react";
import styled from "styled-components";

type MaskedTextProps = {
    width?: number; // sets both container width and mask width
};

const TextContainer = styled.div<{ $w: number }>`
  position: relative;
  display: inline-block;
  width: ${({ $w }) => $w}px; /* must match the mask width */
  height: 150px;              /* must match the mask height */
  background: #1c1a2a;
  overflow: hidden;
`;

const BgVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mask: url(#text-mask);
  -webkit-mask: url(#text-mask);
`;

const SrOnly = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const VideoFillText: React.FC<MaskedTextProps> = ({ width = 800 }) => {
    return (
        <TextContainer $w={width}>
            <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
                <defs>
                    <mask
                        id="text-mask"
                        x="0"
                        y="0"
                        width={width}
                        height="150"
                        maskUnits="userSpaceOnUse"
                    >
                        <rect x="0" y="0" width={width} height="150" fill="#000" />
                        <text x="0" y="110" fill="#fff" fontSize="96" fontWeight="700">
                            Interviews.
                        </text>
                    </mask>
                </defs>
            </svg>

            <BgVideo autoPlay loop muted playsInline>
                <source src="https://cluely.com/videos/home/interviews-section/really-everything.mp4" type="video/mp4" />
                <source src="https://cluely.com/videos/home/interviews-section/really-everything.webm" type="video/webm" />
            </BgVideo>

            <SrOnly>Interviews.</SrOnly>
        </TextContainer>
    );
};
