import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import CustomTooltip from "../whatsapp/components/CustomTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MultiSelect } from "primereact/multiselect";
import AnimatedDropdown from "../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../whatsapp/components/UniversalButton";
import { IoSearch } from "react-icons/io5";
import InputField from "../components/layout/InputField";
import WhatsappManageContactsTable from "./components/WhatsappManageContactsTable";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { Dropdown } from "primereact/dropdown";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RadioGroupField from "../whatsapp/components/RadioGroupField";
import UniversalDatePicker from "../whatsapp/components/UniversalDatePicker";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { MdOutlineDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import UniversalSkeleton from "../whatsapp/components/UniversalSkeleton";
import {
  addContact,
  addGrp,
  deleteGrp,
  getContactListByGrpId,
  getGrpList,
} from "../apis/contact/contact";
import DropdownWithSearch from "../whatsapp/components/DropdownWithSearch";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CustomNoRowsOverlay from "../whatsapp/components/CustomNoRowsOverlay";

const ManageContacts = () => {
  const [selectedMultiGroup, setSelectedMultiGroup] = useState(null);
  const [selectedMultiGroupContact, setSelectedMultiGroupContact] =
    useState(null);
  const [selectedmanageGroups, setSelectedManageGroups] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [addGroupvisible, setaddGroupVisible] = useState(false);
  const [addContactvisible, setaddContactVisible] = useState(false);
  const [selectedddImportContact, setSelectedAddImportContact] =
    useState("option2");
  const [selectedaddwish, setSelectedAddWish] = useState("No");
  const [selectedgamderadd, setSelectedGamderAdd] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [totalRecords, setTotalRecords] = useState("");
  const [manageContactFirst, setMmanageContactFirst] = useState("");
  const [manageContactMobile, setManageContactMobile] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  const [grpList, setGrpList] = useState([]);
  const [addContactDetails, setAddContactDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNo: "",
    emailId: "",
    birthDate: "",
    mariageDate: "",
    allowishes: "",
    gender: "",
  });
  const [groupName, setGroupName] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [deleteGrpId, setDeleteGrpId] = useState("");

  useEffect(() => {
    async function getGrpListData() {
      const res = await getGrpList();
      setGrpList(res);
    }

    getGrpListData();
  }, []);

  const handleAddGroup = async () => {
    const res = await addGrp({
      groupName,
    });

    if (res.flag) {
      setGroupName("");
      toast.success(res.message);
      setaddGroupVisible(false);
    } else {
      toast.error(res.message ?? "Something went wrong");
    }
  };

  const multiGroup = [
    { value: "Group 1", label: "Group 1" },
    { value: "Group 2", label: "G2" },
    { value: "Group 3", label: "Group 3" },
    { value: "Group 4", label: "Group 4" },
    { value: "Group 5", label: "Group 5" },
  ];
  const multiGroupContact = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const manageGroups = [
    { name: "Group1", code: "G1" },
    { name: "Group2", code: "G2" },
    { name: "Group3", code: "G3" },
    { name: "Group4", code: "G4" },
    { name: "Group5", code: "G5" },
  ];

  const addImportContact = [
    { value: "option1", label: "Add Contact" },
    { value: "option2", label: "Import Contacts" },
  ];
  const handleOptionChange = (event) => {
    setSelectedAddImportContact(event.target.value);
    // console.log("Selected Option:", event.target.value);
  };
  const addwish = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const selectedManageGroups = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const handleAllAddContact = async () => {
    if (!selectedMultiGroupContact) {
      toast.error("Please select group contact");
      return;
    }
    const emptyState = Object.keys(addContactDetails).find(function (x) {
      return addContactDetails[x] === "" || addContactDetails[x] === null;
    });

    if (emptyState) {
      toast.error(`${emptyState} is required`);
      return;
    }

    const data = {
      groupSrNo: selectedMultiGroupContact,
      ...addContactDetails,
      birthDate: new Date(addContactDetails.birthDate).toLocaleDateString(
        "en-GB"
      ),
      mariageDate: new Date(addContactDetails.mariageDate).toLocaleDateString(
        "en-GB"
      ),
      allowishes: addContactDetails.allowishes === "Yes" ? 1 : 0,
    };

    const res = await addContact(data);
    if (res.flag) {
      setAddContactDetails({});
      setSelectedMultiGroupContact("");
      setaddContactVisible(false);
      toast.success(res.message);
    } else {
      toast.error(res.message ?? "Something went wrong");
    }
  };

  const manageGroupsOption = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };

  const options = [
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchGroup = async () => {
    if (!selectedMultiGroup) {
      toast.error("Please select group");
      return;
    }

    setIsFetching(true);
    const res = await getContactListByGrpId({
      groupSrNo: selectedMultiGroup,
      status: selectedStatus,
    });
    if (!res.flag) {
      setAllContacts([]);
    }
    setAllContacts(res);

    setIsFetching(false);
  };


  // handle File drop
  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      const validExtensions = [".xls", ".xlsx", ".xlsm"];
      const fileExtension = file.name.split(".").pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split(".")[0])) {
          setUploadedFile(file);
          setIsUploaded(false);
          parseFile(file);
        } else {
          toast.error(
            "File name can only contain alphanumeric characters, underscores, or hyphens."
          );
        }
      } else {
        toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
      }
    }
  };

  // handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = [".xls", ".xlsx", ".xlsm"];
      const fileExtension = file.name.split(".").pop();

      if (validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        if (isValidFileName(file.name.split(".")[0])) {
          setUploadedFile(file);
          setIsUploaded(false);
          parseFile(file);
        } else {
          toast.error(
            "File name can only contain alphanumeric characters, underscores, or hyphens."
          );
        }
      } else {
        toast.error("Only Excel files (.xls, .xlsx, .xlsm) are supported.");
      }
    }
  };

  // Parse uploaded file and extract headers and data
  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const workbook = XLSX.read(reader.result, { type: "binary" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      // const headers = Object.keys(jsonData[0]);
      const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
      // const headers = Object.keys(jsonData[0] || {}).map(header => header.trim()); // Trim header names
      console.log("Extracted headers:", headers);

      setFileData(jsonData);
      setColumns(headers);
      setFileHeaders(headers);
      // setIsUploaded(false); // Reset to "File Selected" if a new file is selected
      setTotalRecords(jsonData.length);
    };
    reader.readAsBinaryString(file);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Excel file upload
  const handleFileUpload = async () => {
    // if (uploadedFile) {
    //   if (isUploaded) {
    //     toast.error("File already uploaded. Please select a different one.");
    //     return;
    //   }
    //   setIsUploading(true);
    //   try {
    //     const response = await campaignUploadFile(uploadedFile);
    //     console.log("File uploaded successfully :", response)
    //     setIsUploaded(true);
    //     toast.success("File uploaded successfully.");
    //     setColumns(response.headers);
    //     setFileData(response.sampleRecords);
    //     setFileHeaders(response.headers || [])
    //   } catch (error) {
    //     toast.error("File upload failed: " + error.message);
    //   } finally {
    //     setIsUploading(false);
    //   }
    // } else {
    //   toast.error("No file selected for upload.");
    // }
  };

  // Validate filename
  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    return regex.test(fileName);
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    // setAddCountryCode(false)
    // setSelectedCountryCode('');
    document.getElementById("fileInput").value = "";
    toast.success("File removed successfully.");
  };

  const handleManageContactMobile = (e) => {
    setManageContactMobile(e.target.value);
  };

  const handleManageContactFirst = (e) => {
    setMmanageContactFirst(e.target.value);
  };

  const handleGrpDelete = async () => {
    if (!deleteGrpId) return;
    const res = await deleteGrp(deleteGrpId.groupName, deleteGrpId.groupCode);
    toast.success(res);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-end w-full gap-4 pb-1 align-middle">
        {/* Name Input Field */}

        <div className="w-max-content">
          <UniversalButton
            id="addgroupbtn"
            name="addgroupbtn"
            label="Add Group"
            onClick={() => setaddGroupVisible(true)}
          />
        </div>

        <div className="w-max-content">
          <UniversalButton
            id="addcontactbtn"
            name="addcontactbtn"
            label="Add Contact"
            onClick={() => setaddContactVisible(true)}
          />
        </div>

        <div className="w-max-content">
          <UniversalButton id="exportbtn" name="exportbtn" label="Export" />
        </div>
      </div>
      <div className="flex items-end justify-start w-full gap-4 pb-5 align-middle flex--wrap">
        <div className="w-full sm:w-56">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium text-gray-700">User</label>

            <CustomTooltip title="Select User" placement="right" arrow>
              <span>
                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </span>
            </CustomTooltip>
          </div>
          <AnimatedDropdown
            className="custom-multiselect"
            placeholder="Select Groups"
            optionLabel="name"
            options={grpList?.map((item) => ({
              value: item.groupCode,
              label: item.groupName,
            }))}
            value={selectedMultiGroup}
            onChange={(e) => setSelectedMultiGroup(e)}
            filter
          />
        </div>

        <div className="w-full sm:w-56">
          <InputField
            label="First Name"
            id="name"
            name="name"
            type="text"
            tooltipContent="Enter First Name"
            placeholder="Enter First Name"
            value={manageContactFirst}
            onChange={handleManageContactFirst}
          />
        </div>
        <div className="w-full sm:w-56">
          <InputField
            label="Mobile Number"
            tooltipContent="Enter Mobile Number"
            id="mobile"
            name="mobile"
            type="number"
            value={manageContactMobile}
            onChange={handleManageContactMobile}
            placeholder="Enter Mobile Number"
          />
        </div>
        <div className="w-full sm:w-56">
          <AnimatedDropdown
            id="statusdropdown"
            name="statusdropdown"
            label="Status"
            tooltipContent="Select Status"
            tooltipPlacement="right"
            options={options}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            placeholder="Status"
          />
        </div>

        <div className="w-max-content ">
          <UniversalButton
            id="managegroupSearchBtn"
            name="managegroupSearchBtn"
            label={isFetching ? "Searching..." : "Search"}
            icon={<IoSearch />}
            onClick={handleSearchGroup}
            variant="primary"
            disabled={isFetching}
          />
        </div>
        <div className="w-max-content ">
          <UniversalButton
            id="managegroupdeletebtn"
            name="managegroupdeletebtn"
            label="Delete"
          />
        </div>
      </div>

      {isFetching ? (
        <UniversalSkeleton height="35rem" width="100%" />
      ) : allContacts?.length > 0 ? (
        <WhatsappManageContactsTable allContacts={allContacts} />
      ) : (
        <CustomNoRowsOverlay />
      )}

      <div className="flex card justify-content-center">
        {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
        <Dialog
          header="Group"
          visible={addGroupvisible}
          draggable={false}
          style={{ width: "40rem" }}
          onHide={() => {
            if (!addGroupvisible) return;
            setaddGroupVisible(false);
          }}
        >
          <div className="card">
            <TabView>
              <TabPanel header="Add New" leftIcon="pi pi-calendar mr-2">
                <InputField
                  id="addGroupname"
                  name="addGroupname"
                  type="text"
                  placeholder="Enter group name..."
                  value={groupName}
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                />
                <div className="flex justify-center mt-2">
                  <UniversalButton
                    id="addnewgroup"
                    name="addnewgroup"
                    label="Submit"
                    variant="primary"
                    onClick={handleAddGroup}
                  />
                </div>
              </TabPanel>
              <TabPanel header="Manage" rightIcon="pi pi-user ml-2">
                <div className="m-0">
                  <div className="flex card justify-content-center">
                    <DropdownWithSearch
                      value={selectedmanageGroups}
                      onChange={(e) => setSelectedManageGroups(e.value)}
                      options={grpList?.map((item) => ({
                        value: item.groupCode,
                        label: item.groupName,
                      }))}
                      optionLabel="name"
                      placeholder="Select Groups"
                      filter
                      valueTemplate={selectedManageGroups}
                      itemTemplate={manageGroupsOption}
                      className="w-full md:w-14rem"
                    />
                  </div>
                  <table className="w-full my-2 text-left border border-gray-300">
                    <thead className="bg-gray-100 border-b-2 border-gray-300">
                      <tr>
                        <th className="px-4 py-1 border-r">Group Name</th>
                        <th className="px-4 py-1">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grpList?.map((group) => (
                        <tr
                          key={group.id}
                          className="h-10 border-b border-gray-300"
                        >
                          <td className="px-4 py-1 border-r">
                            {group.groupName}
                          </td>
                          <td className="flex gap-3 px-4 py-1">
                            {/* <IconButton
                              className="no-xs"
                              // onClick={() => handleView(group)}
                            >
                            </IconButton> */}
                            <DeleteIcon
                              sx={{ fontSize: "1.2rem", color: "green" }}
                              onClick={() => {
                                setDeleteGrpId(group);
                                setDeleteDialogVisible(true);
                              }}
                            />
                            <IconButton>
                              <EditNoteIcon
                                sx={{ fontSize: "1.2rem", color: "gray" }}
                              />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </Dialog>
      </div>
      <div className="flex card justify-content-center">
        <Dialog
          header="Add Contact"
          visible={addContactvisible}
          draggable={false}
          style={{ width: "40rem" }}
          onHide={() => {
            if (!addContactvisible) return;
            setaddContactVisible(false);
          }}
        >
          <div className="m-0">
            <AnimatedDropdown
              className="custom-multiselect"
              placeholder="Select Groups"
              maxSelectedLabels={0}
              optionLabel="name"
              options={grpList?.map((item) => ({
                value: item.groupCode,
                label: item.groupName,
              }))}
              value={selectedMultiGroupContact}
              onChange={(e) => setSelectedMultiGroupContact(e)}
            />
            <RadioGroupField
              name="addImportContact"
              id="addImportContact"
              options={addImportContact}
              value={selectedddImportContact}
              onChange={handleOptionChange}
            />

            {selectedddImportContact === "option1" && (
              <div>
                <div className="grid flex-wrap grid-cols-2 gap-3 lg:flex-nowrap">
                  <InputField
                    placeholder="Enter first name.."
                    id="userfirstname"
                    name="userfirstname"
                    type="text"
                    value={addContactDetails.firstName}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        firstName: e.target.value,
                      })
                    }
                    required={true}
                  />
                  <InputField
                    placeholder="Enter middle name.."
                    id="usermiddlename"
                    name="usermiddlename"
                    type="text"
                    value={addContactDetails.middleName}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        middleName: e.target.value,
                      })
                    }
                  />
                  <InputField
                    placeholder="Enter last name.."
                    id="userlastname"
                    name="userlastname"
                    type="text"
                    value={addContactDetails.lastName}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        lastName: e.target.value,
                      })
                    }
                    required={true}
                  />
                  <InputField
                    placeholder="Enter mobile no.."
                    id="mobilenumber"
                    name="mobilenumber"
                    type="number"
                    value={addContactDetails.mobileNo}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        mobileNo: e.target.value,
                      })
                    }
                    required={true}
                  />
                  <InputField
                    placeholder="Enter email id.."
                    id="emailid"
                    name="emailid"
                    type="email"
                    value={addContactDetails.emailId}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        emailId: e.target.value,
                      })
                    }
                    required={true}
                  />
                  <InputField
                    placeholder="Enter unique id.."
                    id="uniqueid"
                    name="uniqueid"
                    type="text"
                    value={addContactDetails.uniqueId}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        uniqueId: e.target.value,
                      })
                    }
                  />
                  <UniversalDatePicker
                    label="Birth Date"
                    className="mb-0"
                    value={addContactDetails.birthDate}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        birthDate: e,
                      })
                    }
                    required={true}
                  />
                  <UniversalDatePicker
                    label="Anniversary Date"
                    className="mb-0"
                    value={addContactDetails.mariageDate}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        mariageDate: e,
                      })
                    }
                    required={true}
                  />
                  <RadioGroupField
                    label={"Allowishes?"}
                    name="addwish"
                    id="addwish"
                    options={addwish}
                    value={addContactDetails.allowishes}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        allowishes: e.target.value,
                      })
                    }
                    required={true}
                  />
                  <RadioGroupField
                    label={"Gender?"}
                    name="gamderadd"
                    id="addgamderaddImportContact"
                    options={[
                      { value: "m", label: "Male" },
                      { value: "f", label: "Female" },
                    ]}
                    value={addContactDetails.gender}
                    onChange={(e) =>
                      setAddContactDetails({
                        ...addContactDetails,
                        gender: e.target.value,
                      })
                    }
                    required={true}
                  />
                </div>
                <div className="flex justify-center mt-2">
                  <UniversalButton
                    id="addnewConcat"
                    name="addnewConcat"
                    label="Submit"
                    variant="primary"
                    onClick={handleAllAddContact}
                  />
                </div>
              </div>
            )}

            {selectedddImportContact === "option2" && (
              <div className="importcontacts">
                {/* Your content for Import Contacts */}
                <div className="mt-2 file-upload">
                  <div
                    className="file-upload-container"
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileInput"
                      name="fileInput"
                      accept=".xls,.xlsx,.xlsm"
                    />
                    <div className="flex items-center justify-center gap-2">
                      <label
                        htmlFor="fileInput"
                        className="inline-block px-3 py-2 text-sm font-medium tracking-wider text-center text-white bg-blue-400 rounded-lg cursor-pointer file-upload-button hover:bg-blue-500"
                      >
                        Choose or Drop File
                      </label>
                      <div className="upload-button-container ">
                        <button
                          onClick={handleFileUpload}
                          disabled={isUploading}
                          className={`px-2 py-1.5 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer ${
                            isUploading ? "disabled" : ""
                          }`}
                        >
                          <FileUploadOutlinedIcon
                            sx={{ color: "white", fontSize: "23px" }}
                          />
                        </button>
                      </div>
                    </div>
                    <p className="file-upload-text mt-2 text-[0.8rem] text-gray-400 tracking-wide">
                      Max 3 lacs records & mobile number should be with country
                      code. <br />
                      Supported File Formats: .xlsx
                    </p>
                    <div className="mt-3">
                      {uploadedFile ? (
                        <div className="flex items-center justify-center gap-1 file-upload-info">
                          <p className="file-upload-feedback file-upload-feedback-success text-sm text-green-500 font-[500]">
                            {isUploaded ? "File Uploaded: " : "File Selected: "}
                            <strong>{uploadedFile.name}</strong>
                          </p>
                          <button
                            className="file-remove-button rounded-2xl p-1.5 hover:bg-gray-200 cursor-pointer"
                            onClick={handleRemoveFile}
                          >
                            <MdOutlineDeleteForever
                              className="text-red-500 cursor-pointer hover:text-red-600"
                              size={20}
                            />
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm font-semibold tracking-wide text-gray-500 file-upload-feedback file-upload-feedback-error">
                          No file uploaded yet!
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-2">
                  <UniversalButton
                    id="addimportConcat"
                    name="addimportConcat"
                    label="Submit"
                    variant="primary"
                  />
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </div>

      <Dialog
        header="Confirm Deletion"
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        className="w-[30rem]"
        draggable={false}
      >
        <div className="flex items-center justify-center">
          {/* <ErrorOutlineOutlinedIcon
                  sx={{
                    fontSize: 64,
                  }}
                /> */}
          <CancelOutlinedIcon
            sx={{
              fontSize: 64,
              color: "#ff3f3f",
            }}
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-[1.1rem] font-semibold text-gray-700">
            Are you sure you want to delete the group <br />
            <span className="text-green-500">"{deleteGrpId?.groupName}"</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            This action is irreversible.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <UniversalButton
            label="Cancel"
            style={{
              backgroundColor: "#090909",
            }}
            onClick={() => setDeleteDialogVisible(false)}
          />
          <UniversalButton
            label="Delete"
            style={
              {
                // backgroundColor: "red",
              }
            }
            onClick={handleGrpDelete}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ManageContacts;
