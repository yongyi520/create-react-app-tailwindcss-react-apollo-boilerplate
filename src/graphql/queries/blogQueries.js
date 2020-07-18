import { gql } from "apollo-boost";

export const ALL_BLOGS_QUERY = gql`
  {
    allBlogs {
      id
      userId
      slug
      title
      description
      content
      tags {
        name
      }
    }
  }
`;

export const BLOG_SINGLE_QUERY = gql`
  query($id: String!) {
    blog(id: $id) {
      id
      slug
      userId
      title
      description
      content
      tags {
        name
      }
    }
  }
`;
