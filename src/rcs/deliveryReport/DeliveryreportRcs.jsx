import React, { useState } from "react";
import Loader from "../../whatsapp/components/Loader";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IoSearch } from "react-icons/io5";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import {
  a11yProps,
  CustomTabPanel,
} from "../../whatsapp/managetemplate/components/CustomTabPanel";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";
import InputField from "../../whatsapp/components/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import CampaignsLogsTable from "./components/CampaignsLogsTableRcs";
import DayWiseSummarytableRcs from "./components/DayWiseSummarytableRcs";

const DeliveryreportRcs = () => {
  const [value, setValue] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  //campaignState
  const [campaignData, setCampaignData] = useState({
    startDate: new Date(),
    templateType: "",
    campaignName: "",
    status: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCampaignSearch = () => {
    const data = {
      startDate: new Date(campaignData.startDate).toLocaleDateString("en-GB"),
      endDate: new Date(campaignData.startDate).toLocaleDateString("en-GB"),
      templateType: campaignData.templateType,
      campaignName: campaignData.campaignName,
      status: campaignData.status,
    };

    console.log(data);
  };
  return (
    <div>
      <div className="w-full">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Manage Campaigns Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label={
                <span>
                  <GradingOutlinedIcon size={20} /> Campaigns Logs
                </span>
              }
              {...a11yProps(0)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
            <Tab
              label={
                <span>
                  <LibraryBooksOutlinedIcon size={20} /> Day Wise Summary
                </span>
              }
              {...a11yProps(1)}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "#f0f4ff",
                  borderRadius: "8px",
                },
              }}
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <div className="w-full">
              <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap">
                <div className="w-full sm:w-56">
                  <UniversalDatePicker
                    label="Created On"
                    id="created"
                    name="created"
                    value={setCampaignData.startDate}
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        startDate: e,
                      });
                    }}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <InputField
                    label="Campaign Name"
                    id="campaignName"
                    name="campaignName"
                    placeholder="Enter campaign name"
                    value={campaignData.campaignName}
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        campaignName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="Template Type"
                    id="templateType"
                    name="templateType"
                    options={[
                      { label: "text", value: "text" },
                      { label: "image", value: "image" },
                    ]}
                    value={campaignData.templateType}
                    placeholder="Select Template Type"
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        templateType: e,
                      });
                    }}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    label="Status"
                    id="status"
                    name="status"
                    options={[
                      { label: "Cancelled", value: "Cancelled" },
                      { label: "Completed", value: "Completed" },
                    ]}
                    value={campaignData.status}
                    placeholder="Select Status"
                    onChange={(e) => {
                      setCampaignData({
                        ...campaignData,
                        status: e,
                      });
                    }}
                  />
                </div>
                <div className="w-full sm:w-56">
                  <div className="w-max-content">
                    <UniversalButton
                      label="Search"
                      id="campaignsearch"
                      name="campaignsearch"
                      variant="primary"
                      onClick={handleCampaignSearch}
                      icon={<IoSearch />}
                    />
                  </div>
                </div>
              </div>
            </div>
            {isFetching ? (
              <div className="">
                <UniversalSkeleton height="35rem" width="100%" />
              </div>
            ) : (
              <div className="w-full">
                <CampaignsLogsTable
                  id="whatsappManageCampaignTable"
                  name="whatsappManageCampaignTable"
                  // data={filteredData}
                />
              </div>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="flex flex-wrap items-end justify-start w-full gap-4 mb-5">
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="From Date"
                  id="fromDate"
                  name="fromDate"
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalDatePicker
                  label="To Date"
                  id="toDate"
                  name="toDate"
                />
              </div>
              <div className="w-full sm:w-56">
                <UniversalButton
                  label="Show"
                  id="show"
                  name="show"
                  variant="primary"
                  isLoading={isFetching}
                />
              </div>
            </div>
            {isFetching ? (
              <div className="">
                <UniversalSkeleton height="35rem" width="100%" />
              </div>
            ) : (
              <div className="w-full">
                <DayWiseSummarytableRcs />
              </div>
            )}
          </CustomTabPanel>
        </Box>

        {/* )} */}
      </div>
    </div>
  );
};

export default DeliveryreportRcs;

// {isFetching ? (
//   <UniversalSkeleton height="35rem" width="100%" />

// ) : (
//   // Case 3: Show data in the table
//   // <DataTable
//   //     id="whatsappManageTemplateTable"
//   //     name="whatsappManageTemplateTable"
//   //     wabaNumber={selectedWaba}
//   //     wabaList={wabaList}
//   //     data={filteredData}
//   // />
// )}
