import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import { getPartners } from "../../app/reducers/app";

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
      <SearchBar />

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

  console.log(partners);

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

  const deleteCurrentPartner = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this partner?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.PARTNER_DELETE,
          id,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Partner images"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Logo</th>
                <th>Title</th>
                <th>Description</th>
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
                      <img src={partners.image} alt="partner image" />
                    </td>
                    <td>
                      <img src={partners.logo} alt="partner logo" />
                    </td>
                    <td>
                      <div className="font-bold">{partners.title}</div>
                    </td>
                    <td>{partners.desc}</td>
                    <td>{partners.link}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        // onClick={() => openShowPartnerModal(partners._id)}
                      >
                        <EyeIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentPartner(partners._id)}
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
