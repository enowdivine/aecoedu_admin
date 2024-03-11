import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateTestimony } from "../../app/reducers/app";

function UpdateTestimonialModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("")
  const [school, setSchool] = useState("")
  const [program, setProgram] = useState("")
  const [desc, setDesc] = useState("")
  const [rating, setRating] = useState("")
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [image, setImage] = useState("")
  const [previews, setPreviews] = useState([])

  const { item } = extraObject

  const updateHandler = async () => {
    if (name && school && desc && rating) {
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('name', name);
      formData.append('school', school);
      formData.append('desc', desc);
      formData.append('rating', rating);
      const data = { id: item._id, formData }
      await dispatch(updateTestimony(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "Testimony updated!", status: 1 }));
        setLoading(false)
        closeModal();
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
    else {
      return setErrorMessage("All field is required!");
    }
  }

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

  useEffect(() => {
    setName(item.name)
    setDesc(item.desc)
    setRating(item.rating)
    setSchool(item.school)
    setProgram(item.program)
    setImage(item.image)
  }, [item])


  return (
    <>
      <p style={{ marginTop: 20 }}>Name</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>School</p>
      <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Program</p>
      <input type="text" value={program} onChange={(e) => setProgram(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Rating</p>
      <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Description</p>
      <textarea className="textarea textarea-bordered w-full" value={desc}
        onChange={(e) => setDesc(e.target.value)}>

      </textarea>

      <p style={{ marginTop: 20 }}>Image</p>
      <input
        type="file"
        accept="image/*"
        multiple
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

      <div style={{ width: "32%", margin: 2, }}>
        <img
          style={{ width: "100%", height: "100%", border: '1px solid #ccc', cursor: 'pointer' }}
          src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${image}`}
          alt="Image"
        />
      </div>



      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => updateHandler()}>
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default UpdateTestimonialModalBody;
