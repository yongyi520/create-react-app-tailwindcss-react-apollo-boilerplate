import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouteMatch, Link } from "react-router-dom";
import { UPDATE_BLOG_MUTATION } from "../../../../graphql/mutations/blogMutations";
import { useMutation } from "@apollo/react-hooks";

const Edit = ({data}) => {
  const {blog} = data
  const [updateBlogMutation] = useMutation(UPDATE_BLOG_MUTATION)
  const [form, setForm] = useState({
    title: blog.title,
    description: blog.description,
    slug: blog.slug,
    content: blog.content,
  });
  const userId = "5efc10cedd12670a8d1f0551";
  const { title, description, slug, content } = form;
  const updateForm = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };
  const submit = async (e) => {
    e.preventDefault()
    const updateBlogInput = {
      ...form,
      // userId,
      id: blog.id
    }
    console.log('update blog input', updateBlogInput)
    const response = await updateBlogMutation({variables: {input: updateBlogInput}})
    console.log('update blog response', response)
  }
  console.log("form", form);
  return (
    <div id="EditBlog">
      <h3>Edit Blog</h3>
      <form onSubmit={(e) => submit(e)}>
        <div>
          <label>Title</label>
          <input
            defaultValue={title}
            onChange={(event) => updateForm("title", event.target.value)}
          />
        </div>
        <div>
          <label>Slug</label>
          <input defaultValue={slug} onChange={(event) => updateForm("slug", event.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input
            defaultValue={description}
            onChange={(event) => updateForm("description", event.target.value)}
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            defaultValue={content}
            onChange={(event) => updateForm("content", event.target.value)}
          />
        </div>
        <input type="submit" value="submit"/>
      </form>
    </div>
  );
};

Edit.propTypes = {
  data: PropTypes.object.isRequired
};

export default Edit;
