import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
// import SearchBar from "../../components/Input/SearchBar";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { getPartners } from "../../app/reducers/app";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewPartnerModal = () => {
    dispatch(
      openModal({
        title: "Add New Partner",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_PARTNER,
      })
    );
  };

  return (
    <div className="">
      {/* <SearchBar /> */}
      <input type="text" className="input input-bordered w-50 mt-2" placeholder="Search text"
        onKeyUp={(e) => FilterFunnction(0, e.target)} />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewPartnerModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Partner() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState([]);

  const handleGetPartners = async () => {
    try {
      await dispatch(getPartners()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(
            showNotification({
              message: res.payload,
              status: 1,
            })
          );
          setLoading(false);
          return;
        }
        setPartners(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetPartners();
  }, []);

  const deleteCurrentPartner = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.PARTNER_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrentItem = (item) => {
    dispatch(
      openModal({
        title: "Update Event",
        bodyType: MODAL_BODY_TYPES.UPDATE_PARTNER,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Partners"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Logo & Title</th>
                <th>Image</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {partners.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No records found
                  </td>
                </tr>
              ) : (
                partners?.map((partners) => (
                  <tr key={partners._id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${partners?.logo[0]}`}
                              alt="Image"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{partners.title}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${partners?.image[0]}`}
                            alt="Image"
                          />
                        </div>
                      </div>
                    </td>
                    <td>{partners.link}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => updateCurrentItem(partners)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentPartner(partners)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Partner;
