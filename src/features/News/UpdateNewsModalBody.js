import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { updateNews } from "../../app/reducers/app";
import RichEditor from "./RichEditor";

function UpdateNewsModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({ title: "", image: null, body: "" });
  const [url, setUrl] = useState("");

  const { item } = extraObject;

  const updateHandler = async () => {
    if (data.title && data.body && data.image) {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("title", data.title);
      formData.append("body", data.body);
      const object = { id: item._id, formData };
      await dispatch(updateNews(object))
        .then((res) => {
          if (res.meta.requestStatus === "rejected") {
            setErrorMessage(res.payload);
            setLoading(false);
            return;
          }
          dispatch(showNotification({ message: "News updated!", status: 1 }));
          setLoading(false);
          window.location.reload();
          closeModal();
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      return setErrorMessage("All field is required!");
    }
  };

  useEffect(() => {
    setData(item);
    setUrl(process.env.REACT_APP_BASE_URL + item.image);
  }, [item]);

  const handleImage = (image) => {
    setData({ ...data, image });
    const previewURL = URL.createObjectURL(image);
    setUrl(previewURL);
  };

  return (
    <>
      <p style={{ marginTop: 20 }}>Title</p>
      <input
        type="text"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        className="input input-bordered w-full mt-2"
      />

      <p style={{ marginTop: 20 }}></p>
      <RichEditor onChange={setData} newsObj={data} />

      <p style={{ marginTop: 20 }}>Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImage(e.target.files[0])}
        className="input  input-bordered w-full mt-2 mb-6"
      />

      <img
        src={url}
        alt={data.title}
        style={{
          width: "100%",
          height: "80%",
          display: "flex",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => updateHandler()}
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default UpdateNewsModalBody;
