import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Form = ({ formData, forNewMovie = true }) => {
  const router = useRouter();
  const [form, setform] = useState({
    title: formData.title,
    plot: formData.plot,
  });
  const [message, setMessage] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setform({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (forNewMovie) {
      postData(form);
    } else {
      putData(form);
    }
  };

  const putData = async (form) => {
    const { id } = router.query;

    try {
      console.log(form);

      const res = await fetch(`/api/movie/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to edit Movie");
    }
  };

  const postData = async (form) => {
    try {
      console.log(form);

      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add Movie");
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Title"
        autoComplete="off"
        name="title"
        value={form.title}
        onChange={handleOnChange}
      />
      <input
        type="text"
        className="form-control my-2"
        placeholder="Plot"
        autoComplete="off"
        name="plot"
        value={form.plot}
        onChange={handleOnChange}
      />
      <button className="btn btn-primary w-100" type="submit">
        {forNewMovie ? " Add" : " Edit"}
      </button>
      <Link href="/">
        <a className="btn btn-warning w-100 my-2">Back</a>
      </Link>
      <p>{message}</p>
    </form>
  );
};

export default Form;
