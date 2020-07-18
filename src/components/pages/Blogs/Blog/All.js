import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ALL_BLOGS_QUERY } from '../../../../graphql/queries/blogQueries'
import { DELETE_BLOG_MUTATION } from "../../../../graphql/mutations/blogMutations";

const AllBlogs = () => {
  const match = useRouteMatch()
  console.log('all blogs page')
  const [deleteBlogMutation] = useMutation(DELETE_BLOG_MUTATION)
  const {loading, data, error} = useQuery(ALL_BLOGS_QUERY)
  console.log('loading', loading)
  console.log('data', data)
  console.log('error', error)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const {allBlogs} = data
  const deleteBlog = async (id) => {
    const response = deleteBlogMutation({variables: {id}})
    console.log('delete response', response)
  }
  return (
    <div>
      <ul>
        <Link to={`${match.url}/new`}>New Blog</Link>
        {allBlogs.map((blog) => {
          return ( 
            <div key={blog.id}>
            <li>      
              <Link to={`${match.url}/${blog.id}`}>{blog.title}</Link>
            </li>
            <button onClick={() => deleteBlog(blog.id)}>delete</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

AllBlogs.propTypes = {};

export default AllBlogs;
