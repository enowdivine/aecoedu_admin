import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import AddTestimonyModalBody from "../features/Testimony/AddTestimonyModalBody";
import UpdateTestimonialModalBody from "../features/Testimony/UpdateTestimonialModalBody";

import AddEventModalBody from "../features/Events/AddEventModalBody";
import UpdateEventModalBody from "../features/Events/UpdateTestimonialModalBody";

import AddPartnerModalBody from "../features/Partners/AddPartnerModalBody";
import AddNewsModalBody from "../features/News/AddNewsModalBody";
import AddHostCenterModalBody from "../features/HostCenters/AddHostCenterModalBody";
import UpdatePartnerModalBody from "../features/Partners/UpdatePartnerModalBody";
import UpdateNewsModalBody from "../features/News/UpdateNewsModalBody";
import UpdateHostCenterModalBody from "../features/HostCenters/UpdateHostCenterModalBody";

import UpdatePasswordModal from "../features/user/UpdatePasswordModal";
import UpdateEmailModal from "../features/user/UpdateEmailModal";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.ADD_NEW_TESTIMONY]: (
                <AddTestimonyModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_TESTIMONY]: (
                <UpdateTestimonialModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.ADD_NEW_EVENT]: (
                <AddEventModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_EVENT]: (
                <UpdateEventModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),


              [MODAL_BODY_TYPES.ADD_NEW_PARTNER]: (
                <AddPartnerModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_PARTNER]: (
                <UpdatePartnerModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),


              [MODAL_BODY_TYPES.ADD_NEW_NEWS]: (
                <AddNewsModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_NEWS]: (
                <UpdateNewsModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.ADD_NEW_HOSTCENTER]: (
                <AddHostCenterModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_HOST_CENTER]: (
                <UpdateHostCenterModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.UPDATE_USER_PASSWORD]: (
                <UpdatePasswordModal
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.UPDATE_USER_EMAIL]: (
                <UpdateEmailModal
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
