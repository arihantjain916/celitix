import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";

import AnimatedDropdown from "../components/AnimatedDropdown";
import UniversalDatePicker from "../components/UniversalDatePicker";
import InputField from "../components/InputField";
import { HiOutlineChat } from "react-icons/hi";
import WhatsappConversationTable from "./components/WhatsappConversationTable";
import UniversalButton from "../components/UniversalButton";
import UniversalSkeleton from "../components/UniversalSkeleton";
import Loader from "../components/Loader";
import {
  getConversationReport,
  getWabaList,
} from "../../apis/whatsapp/whatsapp.js";
import { data } from "autoprefixer";
import { set } from "date-fns";

const WhatsappConversation = () => {
  const [selectedWaba, setSelectedWaba] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [inputMobile, setInputMobile] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [dataToBeFiltered, setdataToBeFiltered] = useState({
    wabaSrno: "",
    fromDate: new Date(),
    toDate: new Date(),
    mobileNo: "",
    page: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [wabaList, setWabaList] = useState(null);

  // WABA LIST
  useEffect(() => {
    const fetchWabaList = async () => {
      try {
        setIsLoading(true);
        const response = await getWabaList();
        if (response) {
          setWabaList(response);
        } else {
          console.error("Failed to fetch WABA details");
          toast.error("Failed to load WABA details!");
        }
      } catch (error) {
        console.error("Error fetching WABA list:", error);
        toast.error("Error fetching WABA list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWabaList();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ✅ Handle Search Click
  const handleSearch = async () => {
    if (!dataToBeFiltered.wabaSrno) {
      toast.error("Please select WABA");
      return;
    }

    const data = {
      ...dataToBeFiltered,
      fromDate: formatDate(dataToBeFiltered.fromDate),
      toDate: formatDate(dataToBeFiltered.toDate),
      mobileNo: dataToBeFiltered.mobileNo ?? "",
    };
    console.log(data);
    try {
      setIsFetching(true);
      const res = await getConversationReport(data);
      console.log(res);
    } catch (e) {
      console.log(e);
      toast.error("Error fetching Whatsapp Conversation");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="flex justify-center gap-1">
            <div className="pt-1">
              <HiOutlineChat className="text-2xl text-green-600" />
            </div>
            <h1 className="mb-5 text-xl font-semibold text-center text-green-600 font-m">
              Whatsapp Conversation
            </h1>
          </div>
          <div className="flex flex-wrap items-end justify-start w-full gap-4 mb-5 align-middle">
            {/* Select WABA Dropdown */}
            <div className="w-full sm:w-56">
              <AnimatedDropdown
                id="wabadropdown"
                name="wabadropdown"
                label="Select WABA"
                placeholder="Select WABA"
                options={wabaList?.map((waba) => ({
                  value: waba.wabaSrno,
                  label: waba.name,
                }))}
                value={dataToBeFiltered.wabaSrno}
                onChange={(value) => {
                  setdataToBeFiltered((prevData) => ({
                    ...prevData,
                    wabaSrno: value,
                  }));
                }}
              />
            </div>

            {/* From Date Picker */}
            <div className="w-full sm:w-56">
              <UniversalDatePicker
                id="conversationfrom"
                name="conversationfrom"
                label="From Date"
                error={!dataToBeFiltered.fromDate}
                errorText="Please select a valid date"
                value={dataToBeFiltered.fromDate}
                onChange={(value) => {
                  setdataToBeFiltered((prevData) => ({
                    ...prevData,
                    fromDate: value,
                  }));
                }}
              />
            </div>

            {/* To Date Picker */}
            <div className="w-full sm:w-56">
              <UniversalDatePicker
                id="conversationto"
                name="conversationto"
                label="To Date"
                errorText="Please select a valid date"
                error={!dataToBeFiltered.toDate}
                value={dataToBeFiltered.toDate}
                onChange={(value) => {
                  setdataToBeFiltered((prevData) => ({
                    ...prevData,
                    toDate: value,
                  }));
                }}
              />
            </div>

            {/* Mobile Number Input Field */}
            <div className="w-full sm:w-56">
              <InputField
                id="conversationmobile"
                name="conversationmobile"
                label="Mobile Number"
                type="number"
                placeholder="Enter Mobile Number"
                value={dataToBeFiltered.mobileNo}
                onChange={(e) => {
                  setdataToBeFiltered((prevData) => ({
                    ...prevData,
                    mobileNo: e.target.value,
                  }));
                }}
              />
            </div>

            {/* Search Button */}
            <div className="w-max-content">
              <UniversalButton
                id="conversationsearch"
                name="conversationsearch"
                label={isFetching ? "Searching..." : "Search"}
                icon={<IoSearch />}
                onClick={handleSearch}
                disabled={isFetching}
              />
            </div>

            {/* Export Button */}
            <div className="w-max-content">
              <UniversalButton
                id="conversationexport"
                name="conversationexport"
                label="Export"
                onClick={() => console.log("Export Clicked")} // ✅ Add function for export
              />
            </div>
          </div>

          {/* ✅ Show Loader or Table */}
          {isFetching ? (
            <div className="w-full">
              <UniversalSkeleton height="35rem" width="100%" />
            </div>
          ) : (
            <div className="w-full">
              <WhatsappConversationTable
                id="whatsappManageCampaignTable"
                name="whatsappManageCampaignTable"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WhatsappConversation;
