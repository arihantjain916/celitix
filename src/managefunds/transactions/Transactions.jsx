import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IoSearch } from "react-icons/io5";
import { BsJournalArrowDown } from "react-icons/bs";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";
import InputField from "../../components/layout/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import TransactionsHistoryTable from "./components/TransactionsHistoryTable";
import TransactionsSummaryTable from "./components/TransactionsSummaryTable";
import { MultiSelect } from "primereact/multiselect";
import CustomTooltip from "../../components/common/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";
import { fetchTransactions } from "../../apis/settings/setting";

const Transactions = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [filterData, setFilterData] = useState({
    rechargeType: 0,
    toDate: new Date().toLocaleDateString("en-GB"),
    startDate: new Date().toLocaleDateString("en-GB"),
  });
  const [transactionalData, setTransactionalData] = useState([]);

  const handleSearch = async () => {
    const res = await fetchTransactions(filterData);
    setTransactionalData(res);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap">
        {/*<div className="w-full sm:w-56">
           <MultiSelect
            label={"Select User"}
            arrow
            className="custom-multiselect"
            placeholder="Select Groups"
            maxSelectedLabels={0}
            optionLabel="name"
            options={[{ name: "John Doe" }, { name: "Jane Doe" }]}
            // value={}
            onChange={(e) => {}}
            filter
          /> 
        </div>*/}
        <div className="w-full sm:w-56">
          <UniversalDatePicker
            id="transactionshistoryfrom"
            name="transactionshistoryfrom"
            label="From"
            placeholder="Pick a start date"
            tooltipContent="Select the starting date for your project"
            tooltipPlacement="right"
            errorText="Please select a valid date"
            value={setFilterData.startDate}
            onChange={(newValue) => {
              setFilterData({
                ...filterData,
                startDate: new Date(newValue).toLocaleDateString("en-GB"),
              });
            }}
          />
        </div>
        <div className="w-full sm:w-56">
          <UniversalDatePicker
            id="transactionshistoryto"
            name="transactionshistoryto"
            label="To"
            placeholder="Pick a start date"
            tooltipContent="Select the starting date for your project"
            tooltipPlacement="right"
            errorText="Please select a valid date"
            value={setFilterData.toDate}
            onChange={(newValue) => {
              setFilterData({
                ...filterData,
                toDate: new Date(newValue).toLocaleDateString("en-GB"),
              });
            }}
          />
        </div>

        {/* <div className="w-full sm:w-56">
          <AnimatedDropdown
            id="transactionshistoryservice"
            name="transactionshistoryservice"
            label="Service"
            tooltipContent="Select service"
            tooltipPlacement="right"
            options={[{ value: "All", label: "All" }]}
            placeholder="Service"
            // value={selectedHistoryService}
            onChange={(value) => {}}
          />
        </div> */}
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            id="transactionshistorytype"
            name="transactionshistorytype"
            label="Type"
            tooltipContent="Select type"
            tooltipPlacement="right"
            options={[
              { value: 0, label: "All" },
              { value: 1, label: "Recharge" },
              { value: 3, label: "Credit" },
              { value: 4, label: "Debit" },
            ]}
            placeholder="Type"
            value={filterData.rechargeType}
            onChange={(value) => {
              setFilterData({
                ...filterData,
                rechargeType: value,
              });
            }}
          />
        </div>

        <div className="w-max-content ">
          <UniversalButton
            id="manageCampaignSearchBtn"
            name="manageCampaignSearchBtn"
            label={isFetching ? "Searching..." : "Search"}
            icon={<IoSearch />}
            variant="primary"
            onClick={handleSearch}
            disabled={isFetching}
          />
        </div>
      </div>
      {isFetching ? (
        <div className="">
          <UniversalSkeleton height="35rem" width="100%" />
        </div>
      ) : (
        <div className="w-full">
          <TransactionsHistoryTable
            id="transactionshistorytable"
            name="transactionshistorytable"
            transactionalData={transactionalData}
          />
        </div>
      )}
    </div>
  );
};

export default Transactions;
