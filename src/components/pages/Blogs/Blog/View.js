import React from "react";
import PropTypes from "prop-types";

const View = ({ data }) => {
  const { blog } = data;
  console.log('view data', blog)
  return (
    <div>
      <div>
        <label>Title</label>
        <span>{blog.title}</span>
      </div>
      <div>
        <label>Slug</label>
        <span>{blog.slug}</span>
      </div>
      <div>
        <label>Description</label>
        <span>{blog.description}</span>
      </div>

      <div>
        <label>Content</label>
        <div>{blog.content}</div>
      </div>
    </div>
  );
};

View.propTypes = {
  data: PropTypes.object.isRequired,
};

export default View;
