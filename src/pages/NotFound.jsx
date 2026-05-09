import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <StyledWrapper>
      <div className="not_found_body">
        <div className="not_found_container">
          <div className="not_found_main">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 355"
              className="not_found_svg"
            >
              <g id="not_found_ocean">
                <path
                  id="not_found_sky"
                  className="not_found_st0"
                  d="M0 0h1000v203.1H0z"
                />

                <linearGradient
                  id="not_found_water_1_"
                  gradientUnits="userSpaceOnUse"
                  x1={500}
                  y1={354}
                  x2={500}
                  y2="200.667"
                >
                  <stop offset={0} stopColor="#dcfce7" />
                  <stop offset={1} stopColor="#bbf7d0" />
                </linearGradient>

                <path
                  id="not_found_water"
                  fill="url(#not_found_water_1_)"
                  d="M0 200.7h1000V354H0z"
                />

                <path
                  id="not_found_land"
                  className="not_found_st0"
                  d="M0 273.4h1000V354H0z"
                />

                <g id="not_found_bumps">
                  <path
                    className="not_found_st0"
                    d="M0 275.2s83.8-28 180-28 197 28 197 28H0z"
                  />
                </g>
              </g>

              {/* TRACKS */}

              <g id="not_found_tracks">
                <path
                  className="not_found_st2"
                  d="M-499.5 300.2H1000v5.1H-499.5z"
                />

                <path
                  className="not_found_st3"
                  d="M-499.5 283.8H1000v2.8H-499.5z"
                />
              </g>

              {/* CLOUDS */}

              <g id="not_found_cloudsAll">
                <path
                  id="not_found_cloud1"
                  className="not_found_st4"
                  d="M19.5 69.7s-21.3.5-25-12.2c0 0-4.3-21.3 16-21.8 0 0-2.1-12.2 12.2-14.9 0 0 15-3.2 21.3 6.9 0 0 3.6-20.7 17.8-22.3 0 0 24-3 26.6 13.1 0 0 .1 9.5-2.8 13.5 0 0 9.5-15 26.5-4.8 0 0 12.1 7.9 7 20.2 0 0 16 4.8 10.1 18.1 0 0-10.2 8.5-17.1-1.1 0 0-5.5 16-32.5 16 0 0-19.1 2.1-27-13.3 0 0 .5 10.1-13.3 10.6-.1 0-20.3 3.2-19.8-8z"
                />

                <path
                  id="not_found_cloud2"
                  className="not_found_st4"
                  d="M19.3 159.5s-15.9.6-18.8-5.1c0 0-3.4-9.5 11.7-10.1 0 0-1.7-5.5 9-6.9 0 0 11.2-1.7 16 2.8 0 0 2.5-9.4 13.1-10.3 0 0 17.9-1.8 20 5.4 0 0 .2 4.3-2 6.1 0 0 6.9-6.9 19.8-2.6 0 0 9.1 3.4 5.5 9 0 0 6.5 0 4.5 6.7 0 0-2.6 5.6-9.6 1 0 0-4 7.3-24.2 7.7 0 0-14.2 1.3-20.4-5.5 0 0 .5 4.5-9.8 5 0 .1-15 1.8-14.8-3.2z"
                />
              </g>

              {/* TRAIN */}

              <g id="not_found_train">
                <path
                  fill="#22c55e"
                  d="M344.5 248.5h507.2v37.8H344.5z"
                />

                <g id="not_found_wheels">
                  <circle
                    className="not_found_st6"
                    cx="384.1"
                    cy="285.6"
                    r="15.1"
                  />

                  <circle
                    className="not_found_st6"
                    cx="469.1"
                    cy="285.6"
                    r="15.1"
                  />

                  <circle
                    className="not_found_st6"
                    cx="734.1"
                    cy="285.6"
                    r="15.1"
                  />
                </g>

                <path
                  id="not_found_car"
                  className="not_found_st8"
                  d="M321.8 300.7v-32.4s1.2.7-1.5-2.4v-29.1s3.1-11.6 10.7-21.1c0 0 7.6-12 15.5-17.5h1.3s10.2-4.9 30.9-28h.6s-.9-1.4 0-2.7c0 0 10.1-10.5 21-12.3 0 0 9.4-1.8 20.2-1.8h47.7V151H492v-1.1h10.1v1.1h19v2.2s8.2.9 19.2-4.2c0 0 1.4-1.1 28.8-1.1h291.5v6.8h7.5v2.2s12.2-.6 12.2 9.8V177l-10-.1v57.9s14.9-.5 14.9 10.2c0 0 1 9-14.9 8.9v3.8H719.5s-2.4.1-4.3 3l-15 29s-2.9 5.1-10.8 5.1H504.3s-2.9.1-6.1-5l-13.1-25s-4.5-7.1-11.8-7.1H369v2.4s-3.2 1.3-7.1 8.7L351.4 289s-2.9 6.3-6.9 6.4h-17.8l-4.9 5.3z"
                />

                <g id="not_found_Text">
                  <text
                    transform="translate(377.037 230.025)"
                    className="not_found_text"
                    fontSize={24}
                  >
                    404
                  </text>

                  <text
                    transform="translate(640 214)"
                    className="not_found_text"
                    fontSize={24}
                  >
                    Page not found
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .not_found_body {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #ffffff, #f0fdf4);
    overflow: hidden;
  }

  .not_found_container {
    width: 100%;
  }

  .not_found_main {
    margin: 0 auto;
    filter: drop-shadow(0 10px 30px rgba(34, 197, 94, 0.2));
  }

  .not_found_svg {
    width: 100%;
    height: auto;
    display: block;
  }

  /* COLORS */

  .not_found_st0 {
    fill: #dcfce7;
  }

  .not_found_st2 {
    fill: #166534;
  }

  .not_found_st3 {
    fill: #15803d;
  }

  .not_found_st4,
  .not_found_st6 {
    fill: white;
    stroke: #86efac;
    stroke-miterlimit: 10;
  }

  .not_found_st6 {
    stroke: #16a34a;
    stroke-width: 2;
  }

  .not_found_st7,
  .not_found_st8,
  .not_found_st9 {
    stroke: #16a34a;
    stroke-miterlimit: 10;
  }

  .not_found_st7 {
    stroke-width: 5;
    stroke-linecap: round;
    fill: none;
  }

  .not_found_st8 {
    fill: #22c55e;
  }

  .not_found_st9 {
    fill: none;
  }

  .not_found_text {
    fill: #14532d;
    font-weight: bold;
    letter-spacing: 1px;
  }

  /* ANIMATIONS */

  #not_found_cloud1 {
    animation: cloudMove 15s linear infinite;
  }

  #not_found_cloud2 {
    animation: cloudMove 25s linear infinite;
  }

  #not_found_tracks {
    animation: slideTrack 650ms linear infinite;
  }

  #not_found_bumps {
    animation: moveLand 10000ms linear infinite;
  }

  #not_found_train {
    animation: jig 0.35s linear infinite;
    filter: drop-shadow(0 0 12px rgba(34, 197, 94, 0.25));
  }

  @keyframes jig {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(1px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  @keyframes moveLand {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(1000px);
    }
  }

  @keyframes slideTrack {
    from {
      transform: translateX(0px);
    }

    to {
      transform: translateX(100px);
    }
  }

  @keyframes cloudMove {
    0% {
      transform: translateX(-1000px) translateY(3px);
    }

    100% {
      transform: translateX(1000px) translateY(0);
    }
  }

  @media (max-width: 768px) {
    .not_found_svg {
      transform: scale(1.15);
    }
  }
`;

export default Button;