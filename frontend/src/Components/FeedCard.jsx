const FeedCard = ({ user, compact = false }) => {
  const { photoUrl, firstName, lastName, age, gender, about } = user;

  return (
    <div
      className={`card card-side bg-base-100 shadow-2xl border-2 border-slate-800 w-full ${
        compact ? "max-w-2xl" : "max-w-4xl"
      }`}
    >
      <figure className={compact ? "w-44 shrink-0" : "w-64 shrink-0"}>
        <img
          src={photoUrl}
          alt="photo"
          className="w-full h-full object-cover"
        />
      </figure>

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
          <button className="btn btn-primary bg-red-400">Ignore</button>

          <button className="btn btn-primary bg-green-400">Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
