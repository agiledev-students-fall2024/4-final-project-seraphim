import { TbXboxXFilled } from "react-icons/tb";

const CommunityPopup = ({ joinedBefore, close }) => {
  return (
    <div className="flex flex-row gap-2 justify-center p-4 bg-rose-800 rounded-md m-10 items-center w-[90%] md:w-[80%] lg:w-[60%] shadow-md shadow-ebony-900">
      <button className="Close-button" onClick={close}>
        <TbXboxXFilled
          size="24"
          style={{
            filter:
              "invert(25%) sepia(8%) saturate(2633%) hue-rotate(314deg) brightness(94%) contrast(82%)",
          }}
        />
      </button>
      {joinedBefore ? (
        <p className="text-ebony">You have already joined the community!</p>
      ) : (
        <p className="text-ebony">You joined the community successfully!</p>
      )}
    </div>
  );
};

export default CommunityPopup;
