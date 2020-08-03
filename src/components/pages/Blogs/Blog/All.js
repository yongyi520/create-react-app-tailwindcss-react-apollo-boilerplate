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
import { ALL_BLOGS_QUERY } from "../../../../graphql/queries/blogQueries";
import { DELETE_BLOG_MUTATION } from "../../../../graphql/mutations/blogMutations";

const AllBlogs = () => {
  const match = useRouteMatch();
  console.log("all blogs page");
  const [deleteBlogMutation] = useMutation(DELETE_BLOG_MUTATION);
  const { loading, data, error } = useQuery(ALL_BLOGS_QUERY);
  console.log("loading", loading);
  console.log("data", data);
  console.log("error", error);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { allBlogs } = data;
  const deleteBlog = async (id) => {
    const response = deleteBlogMutation({ variables: { id } });
    console.log("delete response", response);
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-row justify-end mb-5">
        <Link
          className="px-6 py-3 bg-blue-600 rounded transition ease-out duration-500 hover:bg-blue-500 text-white"
          to={`${match.url}/new`}
        >
          New Blog
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        {allBlogs.map((blog) => {
          return (
            <div
              key={blog.id}
              className="bg-white border shadow border-gray-400 rounded-lg w-full h-24 mb-5 px-6 py-3 flex flex-row justify-between items-center"
            >
              <div className="font-bold">{blog.title}</div>
              <div className="flex flex-row items-center">
                <Link
                  className="cursor-pointer w-24 px-6 py-3 bg-blue-600 rounded transition ease-out duration-500 hover:bg-blue-500 text-white text-base text-center"
                  to={`${match.url}/${blog.id}`}
                >
                  View
                </Link>

                <a onClick={() => deleteBlog(blog.id)} className="cursor-pointer w-24 px-6 py-3 ml-2 bg-red-600 rounded transition ease-out duration-500 hover:bg-red-500 text-white text-base text-center">
                  Delete
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

AllBlogs.propTypes = {};

export default AllBlogs;
