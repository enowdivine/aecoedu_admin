import { useDispatch, useSelector } from "react-redux";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import { showNotification } from "../headerSlice";
import {
  deleteEvent,
  deleteHostCenter,
  deleteNews,
  deletePartner,
  deleteTestimony,
} from "../../../app/reducers/app";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, id } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.EVENT_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteEvent({ id }));
      dispatch(showNotification({ message: "Event Deleted!", status: 1 }));
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.TESTIMONY_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteTestimony({ id }));
      dispatch(showNotification({ message: "Testimony Deleted!", status: 1 }));
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.NEWS_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteNews({ id }));
      dispatch(showNotification({ message: "News Deleted!", status: 1 }));
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.HOSTCENTER_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteHostCenter({ id }));
      dispatch(
        showNotification({ message: "Host Center Deleted!", status: 1 })
      );
    } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.PARTNER_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deletePartner({ id }));
      dispatch(
        showNotification({ message: "Partner Deleted!", status: 1 })
      );
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
