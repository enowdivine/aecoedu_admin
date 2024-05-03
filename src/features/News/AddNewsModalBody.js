import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { createNews } from "../../app/reducers/app";

const INITIAL_NEWS_OBJ = {
  title: "",
  desc: "",
  link: "",
  category: ""
};

function AddNewsModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newsObj, setnewsObj] = useState(INITIAL_NEWS_OBJ);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([])

  const handleCreateNews = async () => {
    try {
      if (
        newsObj.title &&
        newsObj.link &&
        newsObj.desc && newsObj.category
      ) {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', selectedFiles[0]);
        formData.append('title', newsObj.title,);
        formData.append('link', newsObj.link);
        formData.append('desc', newsObj.desc);
        formData.append('category', newsObj.category);
        await dispatch(createNews(formData)).then((res) => {
          if (res.meta.requestStatus === "rejected") {
            setErrorMessage(res.payload)
            setLoading(false)
            return
          }
          dispatch(showNotification({ message: "News Added!", status: 1 }));
          setLoading(false)
          window.location.reload()
          closeModal();
        }).catch((err) => {
          console.error(err)
          setLoading(false)
        })
      } else {
        dispatch(
          showNotification({ message: "All field are required!", status: 0 })
        );
        return;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newSelectedFiles = [...selectedFiles, ...files];
      setSelectedFiles(newSelectedFiles);
      displayImagePreviews(newSelectedFiles);
    }
  };

  const displayImagePreviews = (files) => {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        urls.push(reader.result);
        if (urls.length === files.length) {
          setPreviews(urls);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const removeImage = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);

    const newImagePreviewUrls = [...previews];
    newImagePreviewUrls.splice(index, 1);
    setPreviews(newImagePreviewUrls);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setnewsObj({ ...newsObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={newsObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={newsObj.category}
        updateType="category"
        containerStyle="mt-4"
        labelTitle="Category"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={newsObj.title}
        updateType="link"
        containerStyle="mt-4"
        labelTitle="Link"
        updateFormValue={updateFormValue}
      />
      <TextAreaInput
        labelTitle="Enter your news details"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={newsObj.desc}
        updateFormValue={updateFormValue}
        updateType="desc"
      />

      <p style={{ marginTop: 20 }}>Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange} className="input  input-bordered w-full mt-2" />

      <ul style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
        {previews?.map((url, index) => (
          <div style={{ width: "32%", margin: 2 }}>
            <img key={index} src={url} alt={`Image Preview ${index + 1}`}
              style={{ width: "100%", height: '80%', display: 'flex', border: '1px solid #ccc', cursor: 'pointer' }} />
            <p style={{ textAlign: 'right', cursor: 'pointer', color: 'red' }}
              onClick={() => removeImage(index)}
            >remove</p>
          </div>
        ))}
      </ul>

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => handleCreateNews()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddNewsModalBody;
