import axios from "axios";
import { Base_Url } from "../utils/const";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_Url + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <div className="text-center">No Connections Found!</div>;

  return (
    <div>
      <div className="text-center flex flex-col gap-3 max-w-208 m-auto p-2 justify-center ">
        <h1 className="text-3xl font-bold my-4 ">Connections </h1>
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, about } = connection;

          return (
            <div
              key={connection._id}
              className="flex border bg-gray-900 gap-4 m-2 rounded-2xl"
            >
              <div>
                {" "}
                <img
                  className="w-30 h-30 rounded-l-2xl"
                  src={photoUrl}
                  alt="photo"
                />
              </div>
              <div className="flex flex-col gap-2 mt-3 ml-4">
                <p className="font-semibold">{firstName + " " + lastName}</p>
                <p className="max-w-150">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
