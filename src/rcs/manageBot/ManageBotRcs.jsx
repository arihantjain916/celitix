import React, { useEffect, useState } from "react";
import ManageBotTableRcs from "./components/ManageBotTableRcs";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import { IoSearch } from "react-icons/io5";
import { fetchAllAgents } from "../../apis/rcs/rcs";

const ManageBotRcs = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const botOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];

  //allBotState
  const [allBots, setAllBots] = useState([]);

  useEffect(() => {
    async function fetchAllBotsData() {
      const res = fetchAllAgents();
      setAllBots(res);
    }

    fetchAllBotsData();
  }, []);

  return (
    <div className="w-full">
      {/* {isLoading ? (
      <>
        <Loader />
      </>
    ) : ( */}
      <div>
        <div className="flex flex-wrap items-end w-full gap-2 mb-2">
          <div className="w-full sm:w-56">
            <AnimatedDropdown
              label="Bot Name"
              id="botName"
              name="botName"
              options={botOptions}
              value={selectedOption}
              onChange={(newValue) => setSelectedOption(newValue)}
              placeholder="select bot name"
            />
          </div>

          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton label="Show" disabled={isFetching} />
          </div>
        </div>

        {/* ✅ Show Loader or Table */}
        {isFetching ? (
          <div className="w-full">
            <UniversalSkeleton height="35rem" width="100%" />
          </div>
        ) : (
          <div className="w-full">
            <ManageBotTableRcs
              id="suggestionreport"
              name="suggestionreport"
              data={allBots}
            />
          </div>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default ManageBotRcs;
