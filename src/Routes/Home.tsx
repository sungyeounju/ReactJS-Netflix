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
  height: 100vh;
  display: flex;
  background: black;
`;
export interface bgPhoto {
  bgPhotoPath: string;
}
const Banner = styled.div<bgPhoto>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-left: 60px;
  background: linear-gradient(0, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)),
    url(${(props) => props.bgPhotoPath});
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

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loading> loading... </Loading>
      ) : (
        <>
          <Banner
            bgPhotoPath={makeImgPath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
