import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import myFace from "../../static/my_face.png"
import { device } from "../utils/device"

const Html = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  min-height: 300px;
  background-color: #f0f8ff;

  align-items: center;
  justify-content: center;
  text-align: center;
`
const HeaderWrapper = styled.div`
  display: grid;
  width: 50%;
  min-height: 300px;

  grid-template-columns: minmax(250px, 40%) 60%;

  @media ${device.mobile} {
    display: flex;
    width: 100%;
    background-color: #f8f8ff;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`

const ImgWrapper = styled.div`
  grid-column: 1;
  width: 250px;
  height: 250px;
  border-radius: 70%;
  overflow: hidden;

  margin-top: 10%;
`
const MyFaceImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Intro = styled.div`
  grid-column: 2 / 3;
  width: 100%;

  text-align: left;
  margin-left: 30px;
`
const Name = styled.div`
  font-size: 35px;
  font-weight: bold;
  border-bottom: 3px solid;
  font-family: Impact, Charcoal, "sans-serif";

  margin-top: 70px;

  @media ${device.mobile} {
    margin-top: 35px;
  }
`
const Explain = styled.div`
  font-size: 20px;
  font-family: cursive, Charcoal, "sans-serif";

  margin-top: 50px;
`

const Body = styled.div`
  display: grid;
  width: 100%;
  min-height: 100%;

  grid-template-columns: 40% 60%;
  font-size: 25px;

  @media ${device.mobile} {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`

const LeftWrapper = styled.div`
  width: 100%;
  background-color: #fffafa;

  text-align: left;
  font-family: Times, "Times New Roman", serif;

  padding-left: 10%;
  padding-right: 10%;

  @media ${device.mobile} {
    background-color: #f8f8ff;
    padding-left: 5%;
  }
`
const LeftTitle = styled.div`
  font-size: 35px;
  margin-top: 40px;
`
const LeftContent = styled.div`
  font-size: 20px;
  margin-top: 10px;
`
const PostContainer = styled.div`
  display: grid;
  grid-template-columns: 90%;

  margin-bottom: 10px;
`

const RightWrapper = styled.div`
  width: 100%;
  background-color: #f8f8ff;

  text-align: left;

  padding-left: 10%;
  padding-right: 10%;

  @media ${device.mobile} {
    padding-left: 5%;
  }
`
const RightTitle = styled.div`
  font-size: 35px;
  color: #778899;
  font-weight: bold;
  font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;

  margin-top: 40px;
  letter-spacing: 10px;
`
const RightContent = styled.div`
  font-size: 20px;
  margin-top: 10px;
  font-family: "나눔고딕", NanumGothic, "fontng";
`
const Space = styled.div`
  height: 30px;
`
const Footer = styled.div`
  display: grid;
  width: 100%;
  min-height: 200px;
  background-color: #778899;
  grid-template-columns: 40% 60%;

  @media ${device.mobile} {
    display: flex;
    width: 100%;
    flex-direction: column-reverse;
    align-items: left;
    justify-content: center;
    text-align: center;
  }
`
const FooterWrapper = styled.div`
  text-align: left;
  font-family: Times, "Times New Roman", serif;

  padding-left: 30px;
`
const FooterTitle = styled.div`
  font-size: 35px;
  color: white;
  font-weight: bold;
  margin-top: 10px;
`

const FooterContent = styled.div`
  font-size: 20px;
  color: #f8f8ff;
  margin-top: 10px;
`
const RightAlign = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Home = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Html>
      <SEO title="문대승" />
      <Header>
        <HeaderWrapper>
          <ImgWrapper>
            <MyFaceImg src={myFace}></MyFaceImg>
          </ImgWrapper>
          <Intro>
            <Name>Moon Dae Seung</Name>
            <Explain>
              I hope to be programmar who can solve the problem creatively
            </Explain>
          </Intro>
        </HeaderWrapper>
      </Header>

      <Body>
        <LeftWrapper>
          <LeftTitle>Profile</LeftTitle>
          <LeftContent>
            I've beem started to learn progaramming since March 2020 when I
            started to work as web service designer. When I worked at that time
            I felt it was interesting to express and develop my thought but I
            also thought it would be more interesting if I could implement
            service myself
          </LeftContent>
          <LeftContent>
            Actually I got opportunity to implement main business logic with
            SQL. It was pretty fun experience although I learned that SQL is not
            recommended to implement business logic beacuase of Scalability and
            Readability. (My SQL code was only valid in Maria DB rules.)
          </LeftContent>
          <LeftContent>
            Anyway I like learn programming so far. I've learned React and
            Redux, nest js(with Typescript and Node js) to be back-end
            programmar
          </LeftContent>
          <LeftTitle>Posts</LeftTitle>
          <LeftContent>
            {posts.lenght === 0
              ? ` No blog posts registered yet `
              : posts.map(post => {
                  const title = post.frontmatter.title || post.fields.slug

                  return (
                    <PostContainer>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                      <small>{post.frontmatter.date}</small>
                    </PostContainer>
                  )
                })}
            <RightAlign>
              {posts.lenght === 0 ? (
                ``
              ) : (
                <Link to="posts"> See more posts </Link>
              )}
            </RightAlign>
          </LeftContent>
        </LeftWrapper>

        <RightWrapper>
          <RightTitle>MERIT</RightTitle>
          <RightContent>
            <li>새로운 걸 배우는데 거부감이 없습니다</li>
            <li>논리적인 문제를 해결하는 것을 좋아합니다</li>
            <li>반복되는 작업을 줄이는 데에 재미를 느낍니다</li>
            <li>기한 내 처리하는 일들에 부담을 느끼지 않습니다</li>
          </RightContent>
          <RightTitle>SKIILS</RightTitle>
          <RightContent>
            <li>React 와 Redux를 통해 Api 요청을 보낼 수 있습니다</li>
            <li>
              타입스크립트와 nest js로 구성된 프로젝트를 코드 분석 및 수정할 수
              있습니다.
            </li>
            <li>
              RDBMS의 테이블를 설계하고 SQL로 데이터를 전처리할 수 있습니다.
            </li>
            <li>Spring과 JPA를 통해 비지니스 로직을 구현할 수 있습니다.</li>
          </RightContent>
          <RightTitle>EXPERIENCE</RightTitle>
          <RightContent>
            휴브알엔씨에서 약 8개월동안 아동 조음의 음소 반응을 토대로 다양한
            점수와 오류패턴을 검출하는 웹 서비스를 기획한 경험이 있습니다.
            비지니스 로직(점수와 오류패턴)을 구현하기 위해 여러 사례들을 연구한
            뒤, 규칙화 할 수 있도록 자료를 정리하는 것이 주 업무였습니다.
          </RightContent>
          <RightContent>
            그 밖에도 기억력 관련 문제 진단을 위한 프로그램의 수치가 정확한지
            검토하기 위해 VBA를 통해 새로 프로그램을 만들어 오류를 검출, 수정한
            경험이 있습니다.
          </RightContent>
          <Space />
        </RightWrapper>
      </Body>

      <Footer>
        <FooterWrapper>
          <FooterTitle>Contact</FooterTitle>
          <FooterContent>
            Email: anseotmd555@naver.com
            <br />
            Phone: 010-2307-1189
          </FooterContent>
        </FooterWrapper>
        <FooterWrapper>
          <FooterTitle>History</FooterTitle>
          <FooterContent>
            2017: 서울대학교 물리교육과 졸업
            <br />
            2019: 전역 (공군)
            <br />
            2020.3~: 휴브알엔씨 근무
            <br />
          </FooterContent>
        </FooterWrapper>
      </Footer>
    </Html>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
