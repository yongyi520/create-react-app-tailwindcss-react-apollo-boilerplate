import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  UPDATE_BLOG_MUTATION,
  NEW_BLOG_MUTATION,
} from "../../../../graphql/mutations/blogMutations";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

const View = ({ data }) => {
  const editorRef = useRef(null);
  const blog =
    data && data.blog
      ? {
          id: data.blog.id,
          title: data.blog.title,
          mainImage: data.blog.mainImage,
          description: data.blog.description,
          slug: data.blog.slug,
          content: data.blog.content,
        }
      : {
          id: null,
          title: null,
          mainImage: null,
          description: null,
          slug: null,
          content: null,
        };
  const [updateBlogMutation] = useMutation(UPDATE_BLOG_MUTATION);
  const [createNewBlog] = useMutation(NEW_BLOG_MUTATION);
  const [form, setForm] = useState(blog);
  const userId = "5efc10cedd12670a8d1f0551";
  const { title, description, slug, content } = form;
  const updateForm = (field, value) => {
    setForm((previousForm) => {
      return {
        ...previousForm,
        [field]: value,
      };
    });
  };
  const updateMainImage = async (files) => {
    let formData = new FormData();
    formData.append("file", files[0]);
    try {
      const response = await fetch("http://localhost:3000/api/upload-image", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      console.log("response", response);
      const { url } = response;
      updateForm("mainImage", url);
    } catch (e) {
      console.log("upload main image error", e);
    }
  };
  const submit = async () => {
    if (data && data.blog) {
      const blogInput = {
        ...form,
        content: editorRef.current.getInstance().getMarkdown(),
        userId,
        id: blog.id,
      };
      console.log("blog input", blogInput);
      const response = await updateBlogMutation({
        variables: { input: blogInput },
      });
      console.log("blog response", response);
    } else {
      const blogInput = {
        ...form,
        userId,
      };
      console.log("blog input", blogInput);
      const response = await createNewBlog({
        variables: { input: blogInput },
      });
      console.log("blog response", response);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between items-center pb-4">
        <Link className="text-blue-700" to={"/blogs"}>
          {" < Blogs"}
        </Link>
        <button
          className="py-2 px-4 bg-blue-600 text-white  rounded transition ease-out duration-500 hover:bg-blue-500"
          onClick={() => submit()}
        >
          {data && data.blog ? "Save" : "Add"}
        </button>
      </div>
      <div className="w-full flex flex-col divide-y divide-gray-300">
        <div className="w-full flex flex-col py-2">
          <label className="text-xs">Title:</label>
          <input
            className="font-bold"
            defaultValue={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
          />
        </div>
        <div className="w-full flex flex-col py-2">
          <label className="text-xs">Main Image:</label>
          {form?.mainImage ? <div className="h-64 overflow-auto" ><img src={form.mainImage} /></div> : null}
          <input
            type="file"
            accept="image/*"
            onChange={(event) => updateMainImage(event.target.files)}
          />
        </div>
        <div className="w-full flex flex-col py-2">
          <label className="text-xs">Slug:</label>
          <input
            defaultValue={form.slug}
            onChange={(event) => updateForm("slug", event.target.value)}
          />
        </div>
        <div className="w-full flex flex-col py-2">
          <label className="text-xs">Description:</label>
          <textarea
            rows={2}
            defaultValue={form.description}
            onChange={(event) => updateForm("description", event.target.value)}
          />
        </div>

        <div className="w-full flex flex-col py-2">
          <label className="text-xs">Content:</label>
          {/* <textarea
            rows={10}
            defaultValue={blog.content}
            onChange={(event) => updateForm("content", event.target.value)}
          /> */}
          <Editor
            previewStyle="vertical"
            initialValue={form.content}
            ref={editorRef}
          />
          {/* <button onClick={() => console.log('editor ref', editorRef.current.getInstance().getMarkdown())} >REF</button> */}
        </div>
      </div>
    </div>
  );
};

View.propTypes = {
  data: PropTypes.object,
};

export default View;
