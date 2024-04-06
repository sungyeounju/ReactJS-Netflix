import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { styled } from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImgPath } from "../utils";

const Loading = styled.div`
  display: flex;
  align-items: center;
  height: 20vh;
  font-size: 50px;
`;
const Wrapper = styled.div`
  background: black;
`;
export interface bgPhotoPathin {
  bgPhotoPath: string;
}
const Banner = styled.div<{ $bgPhotoPath: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding-left: 60px;
  background: linear-gradient(0, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)),
    url(${(props) => props.$bgPhotoPath});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 60px;
`;
const Overview = styled.p`
  width: 50%;
  margin-top: 10px;
  font-size: 28px;
`;
const Slider = styled.div`
  position: relative;
  top: -200px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  overflow: hidden;
  position: relative;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  &:first-child {
    transition-origin: center left;
  }
  &:last-child {
    transition-origin: center right;
  }
`;
const Info = styled(motion.div)`
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 20px;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.8);
`;
const rowVarients = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    zIndex: 99,
    transition: {
      type: "tween",
      delay: 0.3,
      duration: 0.3,
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.1,
      type: "tween",
    },
  },
};
const offset = 6;
function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wrapper>
      {isLoading ? (
        <Loading> loading... </Loading>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            $bgPhotoPath={makeImgPath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVarients}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      $bgPhoto={makeImgPath(movie.backdrop_path, "w500")}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                    >
                      <Info variants={infoVariants}>{movie.title}</Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
