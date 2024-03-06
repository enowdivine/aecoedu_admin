import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { createPartner } from "../../app/reducers/app";

const INITIAL_PARTNER_OBJ = {
  title: "",
  desc: "",
  link: "",
};

function AddPartnerModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [PartnerObj, setPartnerObj] = useState(INITIAL_PARTNER_OBJ);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedLogoFiles, setSelectedLogoFiles] = useState([]);
  const [previews, setPreviews] = useState([])
  const [previewsLogo, setLogoPreviews] = useState([])


  const handleCreatePartner = async () => {
    try {
      if (
        PartnerObj.title &&
        PartnerObj.link &&
        PartnerObj.desc
      ) {
        setLoading(true);
        const formData = new FormData();
        formData.append('logo', selectedLogoFiles[0]);
        formData.append('image', selectedFiles[0]);
        formData.append('title', PartnerObj.title,);
        formData.append('link', PartnerObj.link);
        formData.append('desc', PartnerObj.desc);
        await dispatch(createPartner(formData)).then((res) => {
          if (res.meta.requestStatus === "rejected") {
            setErrorMessage(res.payload)
            setLoading(false)
            return
          }
          dispatch(showNotification({ message: "New Partner Added!", status: 1 }));
          setLoading(false)
          closeModal();
        }).catch((err) => {
          console.error(err)
          setLoading(false)
        })
      } else {
        dispatch(
          showNotification({ message: "All field are required!", status: 1 })
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

  const handleLogoFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newSelectedFiles = [...selectedLogoFiles, ...files];
      setSelectedLogoFiles(newSelectedFiles);
      displayLogoImagePreviews(newSelectedFiles);
    }
  };

  const displayLogoImagePreviews = (files) => {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        urls.push(reader.result);
        if (urls.length === files.length) {
          setLogoPreviews(urls);
        }
      };
      reader.readAsDataURL(files[i]);
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

  const removeLogoImage = (index) => {
    const newSelectedFiles = [...selectedLogoFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedLogoFiles(newSelectedFiles);

    const newImagePreviewUrls = [...previewsLogo];
    newImagePreviewUrls.splice(index, 1);
    setLogoPreviews(newImagePreviewUrls);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setPartnerObj({ ...PartnerObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={PartnerObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="url"
        defaultValue={PartnerObj.link}
        updateType="link"
        containerStyle="mt-4"
        labelTitle="link"
        updateFormValue={updateFormValue}
      />

      <TextAreaInput
        labelTitle="Enter Description"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={PartnerObj.desc}
        updateFormValue={updateFormValue}
        updateType="desc"
      />

      <p style={{ marginTop: 20 }}>Logo Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleLogoFileChange} className="input  input-bordered w-full mt-2" />

      <ul style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
        {previewsLogo?.map((url, index) => (
          <div style={{ width: "32%", margin: 2 }}>
            <img key={index} src={url} alt={`Image Preview ${index + 1}`}
              style={{ width: "100%", height: '80%', display: 'flex', border: '1px solid #ccc', cursor: 'pointer' }} />
            <p style={{ textAlign: 'right', cursor: 'pointer', color: 'red' }}
              onClick={() => removeLogoImage(index)}
            >remove</p>
          </div>
        ))}
      </ul>

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
        <button
          className="btn btn-primary px-6"
          onClick={() => handleCreatePartner()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddPartnerModalBody;
