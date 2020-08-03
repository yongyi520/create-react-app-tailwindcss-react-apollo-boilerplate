import { gql } from "apollo-boost";

export const NEW_BLOG_MUTATION = gql`
  mutation($input: BlogInput!) {
    newBlog(input: $input) {
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

export const UPDATE_BLOG_MUTATION = gql`
  mutation($input: BlogInput!) {
    updateBlog(input: $input) {
      id
      userId
      slug
      title
      mainImage
      description
      content
      tags {
        name
      }
    }
  }
`;

export const DELETE_BLOG_MUTATION = gql`
  mutation($id: String!) {
    deleteBlog(id: $id)
  }
`;
