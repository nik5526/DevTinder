import axios from "axios";
import { Base_Url } from "../utils/const";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const FeedCard = ({ user, compact = false }) => {
  const { _id, photoUrl, firstName, lastName, age, gender, about } = user;
  const dispatch = useDispatch();

  const manageFeed = async (status, _id) => {
    try {
      const res = await axios.post(
        Base_Url + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className={`card card-side bg-base-100 shadow-2xl border-2 border-slate-800 w-full ${
        compact ? "max-w-2xl" : "max-w-4xl"
      }`}
    >
      {photoUrl && (
        <figure className={compact ? "w-44 shrink-0" : "w-64 shrink-0"}>
          <img
            src={photoUrl}
            alt="photo"
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      <div className="card-body justify-start">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        <div className="flex flex-col gap-3">
          {age && <p>Age - {age}</p>}
          {gender && <p>Gender - {gender}</p>}
          {about && <p>About - {about}</p>}
        </div>

        <div className="card-actions mt-auto justify-center">
          <button
            className="btn btn-active btn-success"
            onClick={() => manageFeed("interested", _id)}
          >
            Send Request
          </button>
          <button
            className="btn btn-active btn-error"
            onClick={() => manageFeed("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
