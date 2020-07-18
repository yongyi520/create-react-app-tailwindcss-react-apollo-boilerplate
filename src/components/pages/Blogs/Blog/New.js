import React, { useState } from "react";
import PropTypes from "prop-types";
import { NEW_BLOG_MUTATION } from "../../../../graphql/mutations/blogMutations";
import { useMutation } from "@apollo/react-hooks";

const New = () => {
  const [createNewBlog] = useMutation(NEW_BLOG_MUTATION)
  const [form, setForm] = useState({
    title: null,
    description: null,
    slug: null,
    content: null,
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
    const newBlogInput = {
      ...form,
      userId
    }
    console.log('new blog input', newBlogInput)
    const response = await createNewBlog({variables: {input: newBlogInput}})
    console.log('new blog response', response)
  }
  console.log("form", form);
  return (
    <div id="NewBlog">
      <h3>New Blog</h3>
      <form onSubmit={(e) => submit(e)}>
        <div>
          <label>Title</label>
          <input
            onChange={(event) => updateForm("title", event.target.value)}
          />
        </div>
        <div>
          <label>Slug</label>
          <input onChange={(event) => updateForm("slug", event.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input
            onChange={(event) => updateForm("description", event.target.value)}
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            onChange={(event) => updateForm("content", event.target.value)}
          />
        </div>
        <input type="submit" value="submit"/>
      </form>
    </div>
  );
};

New.propTypes = {};

export default New;
