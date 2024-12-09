import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubCommunity from "../components/SubCommunity";

const SubCommunityPage = (props) => {
  //stores the database data into data
  const [data, setData] = useState([]);
  const { communityId } = useParams();

  useEffect(() => {
    console.log("Currently getting subcommunity group's data...");

    axios
      .get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/community/${communityId}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log("Unable to retrieve subcommunity data.");
        console.error(err);
      });
  }, [communityId]);

  return (
    <div className="w-[95%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[80%] lg:w-[70%]">
      <SubCommunity
        image={`${process.env.REACT_APP_SERVER_HOSTNAME}${data.communityPicture}`}
        name={data.name}
        description={data.description}
      />
    </div>
  );
};

export default SubCommunityPage;
