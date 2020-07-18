import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouteMatch, Link, useParams } from "react-router-dom";
import Edit from "./Edit";
import View from "./View";
import { BLOG_SINGLE_QUERY } from "../../../../graphql/queries/blogQueries";
import { useQuery } from "@apollo/react-hooks";

const Blog = ({pageInput}) => {
  const { blogId } = useParams()
  const match = useRouteMatch()
  const [page, setPage] = useState(pageInput ? pageInput : 'view')
  console.log('blog match', match)
  console.log('blog id', blogId)
  const {loading, data, error} = useQuery(BLOG_SINGLE_QUERY, {variables: {id: blogId}})
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    console.log('single blog', data)
    console.log('page', page)
  return (
    <div>
      <div>
        <button onClick={() => setPage('view')} >View</button>
        <button onClick={() => setPage('edit')}>Edit</button>
      </div>
      {page === 'edit' ? <Edit data={data} />: null}
      {page === 'view' ? <View data={data} />: null}
    </div>
  );
};

Blog.propTypes = {
  pageInput: PropTypes.string
};

export default Blog;
