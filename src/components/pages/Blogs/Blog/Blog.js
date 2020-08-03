import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouteMatch, Link, useParams } from "react-router-dom";
import View from "./View";
import { BLOG_SINGLE_QUERY } from "../../../../graphql/queries/blogQueries";
import { useQuery } from "@apollo/react-hooks";

const Blog = () => {
  const { blogId } = useParams();
  const match = useRouteMatch();
  console.log("blog match", match);
  console.log("blog id", blogId);
  const { loading, data, error } = useQuery(BLOG_SINGLE_QUERY, {
    variables: { id: blogId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("single blog", data);
  return <View data={data}/>;
};

Blog.propTypes = {};

export default Blog;
