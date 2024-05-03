import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateEvent } from "../../app/reducers/app";

function UpdateEventModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [link, setLink] = useState("")
  const [location, setLocation] = useState("")
  const [details, setDetails] = useState("")

  const { item } = extraObject

  const updateHandler = async () => {
    if (title && category && link && date && eventTime && details && location) {
      const data = {
        id: item._id,
        title,
        category,
        link,
        date,
        eventTime,
        details, location
      }
      await dispatch(updateEvent(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "Testimony updated!", status: 1 }));
        setLoading(false)
        window.location.reload()
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

  useEffect(() => {
    setTitle(item.title)
    setCategory(item.category)
    setDate(item.date)
    setEventTime(item.eventTime)
    setLink(item.link)
    setLocation(item.location)
    setDetails(item.details)
  }, [item])


  return (
    <>
      <p style={{ marginTop: 20 }}>Title</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Category</p>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Event Date</p>
      <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Event Time</p>
      <input type="text" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Event Link</p>
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Event Location</p>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Event Details</p>
      <textarea className="textarea textarea-bordered w-full  mt-2" value={details}
        onChange={(e) => setDetails(e.target.value)}>

      </textarea>

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

export default UpdateEventModalBody;
