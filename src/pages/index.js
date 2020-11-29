import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"

const Html = styled.div`
  margin: 0px;
  padding: 0px;
  position: absolute;
  height: 100%;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 300px;
  background-color: #f0f8ff;
`
const HeaderContents = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(250px, 40%) 60%;
  width: 50%;
  height: 300px;
`

const ImgWrapper = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 70%;
  overflow: hidden;
  grid-column: 1;

  margin-top: 10%;
`
const MyFaceImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Intro = styled.div`
  width: 100%;
  grid-column: 2 / 3;
  display: inline;
  text-align: left;
  margin-left: 30px;
`
const Name = styled.div`
  font-size: 35px;
  font-weight: bold;
  border-bottom: 3px solid;
  font-family: Impact, Charcoal, "sans-serif";
  margin-top: 70px;
`
const Explain = styled.div`
  font-size: 20px;
  margin-top: 50px;
  font-family: cursive, Charcoal, "sans-serif";
`

const BodyWrapper = styled.div`
  display: grid;
  width: 100%;
  min-height: 100%;
  grid-template-columns: 40% 60%;
  font-size: 25px;
`

const LeftWrapper = styled.div`
  width: 100%;
  display: inline;
  text-align: left;
  padding-left: 10%;
  padding-right: 10%;
  background-color: #fffafa;
  font-family: Times, "Times New Roman", serif;
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
 margin-bottom:10px;
 display:grid;
 grid-template-columns: 70% 30%;
`


const RightWrapper = styled.div`
  width: 100%;
  background-color: #f8f8ff;
  display: inline;
  text-align: left;
  padding-left: 10%;
  padding-right: 10%;
  font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
`

const RightTitle = styled.div`
  font-size: 35px;
  margin-top: 40px;
  letter-spacing: 10px;
  color: #778899;
  font-weight: bold;
`
const RightContent = styled.div`
  font-size: 20px;
  margin-top: 10px;
`
const Ul = styled.ul`
  padding-left: 10px;
`
const Home = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Html>
      <SEO title="문대승" />
      <Header>
        <HeaderContents>
          <ImgWrapper>
            <MyFaceImg src={`my_face.png`}></MyFaceImg>
          </ImgWrapper>
          <Intro>
            <Name>Moon Dae Seung</Name>
            <Explain>
              I hope to be programmar who can solve the problem creatively
            </Explain>
          </Intro>
        </HeaderContents>
      </Header>

      <BodyWrapper>
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
            : 
              posts.map(post => {
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
          </LeftContent>
          <LeftTitle>Contact</LeftTitle>
          <LeftContent>
            Email: anseotmd555@naver.com
            <br />
            PhoneNumber: 010-2307-1189
            <br />
            Feel free to contact
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
            <li>gatsby를 통해 페이지를 구성할 수 있습니다. (현재 페이지)</li>
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
        </RightWrapper>
      </BodyWrapper>
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
