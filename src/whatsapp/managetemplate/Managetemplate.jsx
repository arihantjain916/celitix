import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import toast from "react-hot-toast";

import DataTable from "./components/Datatable.jsx";
import AnimatedDropdown from "../components/AnimatedDropdown";
import InputField from "../components/InputField";
import UniversalDatePicker from "../components/UniversalDatePicker";
import UniversalButton from "../components/UniversalButton";
import UniversalSkeleton from "../components/UniversalSkeleton";
import Loader from "../components/Loader";
import {
  getWabaList,
  getWabaTemplate,
  getWabaTemplateDetails,
  syncStatus,
} from "../../apis/whatsapp/whatsapp.js";
import { CustomTabPanel, a11yProps } from "./components/CustomTabPanel";
import "../style.css";
import { Dialog } from "primereact/dialog";

const ManageTemplate = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [value, setValue] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [wabaAccountId, setWabaAccountId] = useState("");

  //syncStatus
  const [syncStatusVisible, setSyncStatusVisible] = useState(false);
  const [syncWabaId, setSyncWabaId] = useState(null);

  // Filters
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWaba, setSelectedWaba] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [templateName, setTemplateName] = useState("");

  // Data
  const [wabaList, setWabaList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Reset filters when WABA changes
  useEffect(() => {
    setTemplateName("");
    setSelectedCategory("");
    setSelectedType("");
    setSelectedStatus("");
    setSelectedDate(null);
    setFilteredData([]);
    setHasSearched(false);
  }, [selectedWaba]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/\s/g, "");
    setTemplateName(newValue);
  };

  // Fetch WABA List
  useEffect(() => {
    const fetchWabaList = async () => {
      setIsLoading(true);
      try {
        const response = await getWabaList();
        console.log("WABA List:", response);
        if (response) {
          setWabaList(response);
        } else {
          console.error("Failed to fetch WABA List");
        }
      } catch (error) {
        console.error("Error fetching WABA List:", error);
      }
      setIsLoading(false);
    };
    fetchWabaList();
  }, []);

  useEffect(() => {
    const fetchTemplateData = async () => {
      if (!selectedTemplate || !wabaAccountId) return;
      try {
        const response = await getWabaTemplate(wabaAccountId, selectedTemplate);

        if (response && response.data && response.data.length > 0) {
          setTemplateData(response.data[0]);
        } else {
          toast.error("Failed to load template data!");
        }
      } catch (error) {
        toast.error("Error fetching template data.");
      }
    };
    fetchTemplateData();
  }, [selectedTemplate, wabaAccountId]);

  const handleSearch = async () => {
    if (!selectedWaba) {
      toast.error("Please select a (WABA) Account to proceed.");
      return;
    }
    setIsFetching(true);
    setHasSearched(true);
    try {
      const response = await getWabaTemplateDetails(selectedWaba);
      if (response) {
        applyFilters(response);
      } else {
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching template data:", error);
      setFilteredData([]);
    }
    setIsFetching(false);
  };

  const applyFilters = (data) => {
    const filtered = data.filter((item) => {
      const itemCategory = item.category?.toLowerCase().trim() || "";
      const itemType = item.type?.toLowerCase().trim() || "";
      const itemStatus = item.status?.toLowerCase().trim() || "";
      const itemName = item.templateName?.toLowerCase().trim() || "";
      const itemDateLocal = new Date(item.createdDate).toLocaleDateString(
        "en-CA"
      );
      let selectedDateLocal = "";
      if (selectedDate) {
        selectedDateLocal = new Date(selectedDate).toLocaleDateString("en-CA");
      }
      return (
        (!selectedCategory ||
          itemCategory === selectedCategory.toLowerCase().trim()) &&
        (!selectedType || itemType === selectedType.toLowerCase().trim()) &&
        (!selectedStatus ||
          itemStatus === selectedStatus.toLowerCase().trim()) &&
        (!templateName ||
          itemName.includes(templateName.toLowerCase().trim())) &&
        (!selectedDate || itemDateLocal === selectedDateLocal)
      );
    });
    setFilteredData(filtered);
  };

  const handleSyncTemplate = async () => {
    try {
      console.log("syncWabaId", syncWabaId);
      const res = await syncStatus(syncWabaId);
      toast(
        `InsertCount: ${res.InsertCount}, \nApproved: ${res.Approved},\nRejectedCount: ${res.Rejected}, \nInsertCount: ${res.InsertCount}, \nDuplicateCount: ${res.DuplicateCount}`
      );
      setSyncStatusVisible(false)
    } catch (e) {
      console.log(e);
      toast.error("Failed to sync template.");
    }
  };
  return (
    <div className="w-full">
      {isLoading ? (
        <Loader />
      ) : (
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
                  <GradingOutlinedIcon size={20} /> Templates
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
                  <LibraryBooksOutlinedIcon size={20} /> Library
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
              <div className="flex flex-wrap items-center justify-between w-full gap-4 align-middle">
                <div>
                  <h1 className="mb-4 text-xl font-semibold text-gray-800">
                    Manage Templates
                  </h1>
                </div>
                <div className="flex gap-2">
                  <div className="w-max-content">
                    <UniversalButton
                      id="manageTemplateAddNewBtn"
                      name="manageTemplateAddNewBtn"
                      label="Add New"
                      onClick={() => navigate("/createtemplate")}
                      variant="primary"
                    />
                  </div>
                  <div className="w-max-content ">
                    <UniversalButton
                      id="syncStatusBtn"
                      name="syncStatusBtn"
                      label="Sync Status"
                      variant="primary"
                      onClick={() => {
                        setSyncStatusVisible(true);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-end justify-start w-full gap-4 mb-5">
                <div className="w-full sm:w-56">
                  <UniversalDatePicker
                    id="manageTemplateDate"
                    name="manageTemplateDate"
                    label="Start Date"
                    value={selectedDate}
                    onChange={setSelectedDate}
                    placeholder="Pick a start date"
                    tooltipContent="Select the starting date for your project"
                    tooltipPlacement="right"
                    error={!selectedDate}
                    errorText="Please select a valid date"
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    id="manageTemplateWaba"
                    name="manageTemplateWaba"
                    label="Select WABA"
                    tooltipContent="Select your whatsapp business account"
                    tooltipPlacement="right"
                    options={wabaList.map((waba) => ({
                      value: waba.mobileNo,
                      label: waba.name,
                    }))}
                    value={selectedWaba}
                    onChange={setSelectedWaba}
                    placeholder="Select WABA"
                  />
                </div>
                <div className="w-full sm:w-56">
                  <InputField
                    id="manageTemplateName"
                    name="manageTemplateName"
                    label="Template Name"
                    value={templateName}
                    onChange={handleInputChange}
                    tooltipPlacement="right"
                    tooltipContent="Your templatename should not contain spaces."
                    placeholder="Template Name"
                  />
                </div>

                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    id="manageTemplateCategory"
                    name="manageTemplateCategory"
                    label="Category"
                    tooltipContent="Select category"
                    tooltipPlacement="right"
                    options={[
                      { value: "marketing", label: "Marketing" },
                      { value: "utility", label: "Utility" },
                      { value: "authentication", label: "Authentication" },
                    ]}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    placeholder="Category"
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    id="manageTemplateType"
                    name="manageTemplateType"
                    label="Type"
                    tooltipContent="Select Type"
                    tooltipPlacement="right"
                    options={[
                      { value: "text", label: "Text" },
                      { value: "image", label: "Image" },
                      { value: "document", label: "Document" },
                      { value: "carousel", label: "Carousel" },
                    ]}
                    value={selectedType}
                    onChange={setSelectedType}
                    placeholder="Type"
                  />
                </div>
                <div className="w-full sm:w-56">
                  <AnimatedDropdown
                    id="manageTemplateStatus"
                    name="manageTemplateStatus"
                    label="Status"
                    tooltipContent="Select Status"
                    tooltipPlacement="right"
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "rejected", label: "Rejected" },
                      { value: "approved", label: "Approved" },
                    ]}
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    placeholder="Status"
                  />
                </div>

                <div className="w-max-content ">
                  <UniversalButton
                    id="manageTemplateSearchBtn"
                    name="manageTemplateSearchBtn"
                    label="Search"
                    icon={<IoSearch />}
                    onClick={handleSearch}
                    variant="primary"
                  />
                </div>
              </div>
              {isFetching ? (
                <UniversalSkeleton height="35rem" width="100%" />
              ) : (
                <DataTable
                  id="whatsappManageTemplateTable"
                  name="whatsappManageTemplateTable"
                  wabaNumber={selectedWaba}
                  wabaList={wabaList}
                  data={filteredData}
                />
              )}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-800">
                Libraries
              </h1>
            </div>
          </CustomTabPanel>
        </Box>
      )}

      <Dialog
        header="Sync Templates"
        visible={syncStatusVisible}
        onHide={() => setSyncStatusVisible(false)}
        className="w-1/3"
        draggable={false}
      >
        <div className="flex flex-col gap-4">
          <AnimatedDropdown
            label="Sync Waba Account"
            id="syncWabaAccount"
            name="syncWabaAccount"
            options={wabaList.map((waba) => ({
              value: waba.wabaSrno,
              label: waba.name,
            }))}
            value={syncWabaId}
            onChange={(e) => {
              setSyncWabaId(e);
            }}
          />

          <UniversalButton
            id="syncTemplates"
            name="syncTemplates"
            label="Sync"
            // icon={<IoSearch />}
            onClick={handleSyncTemplate}
            variant="primary"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ManageTemplate;
