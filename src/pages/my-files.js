import { graphql } from "gatsby"
import React from "react"

export default function Myfiles({ data, location }) {

  return (
    <div>
      <h1>my files</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>relativePath</th>
            <th>prettySize</th>
            <th>extension</th>
            <th>birthTime</th>
          </tr>
        </thead>
        <tbody>
          {data.allFile.edges.map(({ node }, index) => (
            <tr key={index}>
              <td>{node.name}</td>
              <td>{node.relativePath}</td>
              <td>{node.prettySize}</td>
              <td>{node.extension}</td>
              <td>{node.birthTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile {
      edges {
        node {
          name
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`
