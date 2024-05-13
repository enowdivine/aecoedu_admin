import { useState } from "react";
import { useDispatch, } from "react-redux";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import { showNotification } from "../headerSlice";
import {
  deleteEvent,
  deleteHostCenter,
  deleteNews,
  deletePartner,
  deleteTestimony,
  deleteArticle,
  deleteJob,
  deleteTeamMember
} from "../../../app/reducers/app";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const { message, type, id, item } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.EVENT_DELETE) {
      setLoading(true)
      dispatch(deleteEvent(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.TESTIMONY_DELETE) {
      setLoading(true)
      dispatch(deleteTestimony(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.name} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.NEWS_DELETE) {
      setLoading(true)
      dispatch(deleteNews(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.HOSTCENTER_DELETE) {
      setLoading(true)
      dispatch(deleteHostCenter(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.PARTNER_DELETE) {
      setLoading(true)
      dispatch(deletePartner(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.ARTICLE_DELETE) {
      setLoading(true)
      dispatch(deleteArticle(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.JOB_DELETE) {
      setLoading(true)
      dispatch(deleteJob(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.title} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.TEAM_DELETE) {
      setLoading(true)
      dispatch(deleteTeamMember(item._id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(showNotification({ message: res.payload, status: 0 }));
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: `${item.name} Deleted!`, status: 1 }));
        setLoading(false)
        window.location.reload()
        return
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
