import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
// import SearchBar from "../../components/Input/SearchBar";
import { getEvents } from "../../app/reducers/app";
import { showNotification } from "../common/headerSlice";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewEventModal = () => {
    dispatch(
      openModal({
        title: "Add New Event",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_EVENT,
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
        onClick={() => openAddNewEventModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Events() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const handleGetEvents = async () => {
    try {
      await dispatch(getEvents()).then((res) => {
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
        setEvents(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetEvents();
  }, []);

  const deleteCurrentEvent = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.EVENT_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrentItem = (item) => {
    dispatch(
      openModal({
        title: "Update Event",
        bodyType: MODAL_BODY_TYPES.UPDATE_EVENT,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Events"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Event List in table format loaded from the state */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Event Date</th>
                <th>Event Time</th>
                <th>Link</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No records found
                  </td>
                </tr>
              ) : (
                events?.map((event) => (
                  <tr key={event._id}>
                    <td>
                      <div>
                        <div className="font-bold">{event.title}</div>
                      </div>
                    </td>
                    <td>{event.category}</td>
                    <td>{event.date}</td>
                    <td>{event.eventTime}</td>
                    <td>{event.link}</td>
                    <td>{event.location}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => updateCurrentItem(event)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentEvent(event)}
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

export default Events;
