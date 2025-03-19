import React, { useEffect, useState } from "react";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import InputField from "../../whatsapp/components/InputField";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import { IoSearch } from "react-icons/io5";
import ManageUserTable from "./components/ManageUserTable";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchAllUsers } from "../../apis/admin/admin";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";

const ManageUser = () => {
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [dataToFilter, setDataToFilter] = useState({
    userId: "",
    mobileNo: "",
    companyName: "",
    status: "",
  });

  const handleAdduser = () => {
    navigate("/manageadduser");
  };

  //fetchAllUsersDetails
  const fetchAllUsersDetails = async () => {
    const data = {
      userId: dataToFilter.userId ?? "",
      mobileNo: dataToFilter.mobileNo ?? "",
      companyName: dataToFilter.companyName ?? "",
      status: dataToFilter.status ?? "",
    };
    try {
      setIsFetching(true);
      const res = await fetchAllUsers(data);
      setAllUsers(res.userMstPojoList);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAllUsersDetails();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-end w-full gap-4 pb-1 align-middle">
        {/* Name Input Field */}

        <div className="w-max-content">
          <UniversalButton
            id="manageadduserbtn"
            name="manageadduserbtn"
            label="Add User"
            onClick={handleAdduser}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-3 align-middle">
        {/* Name Input Field */}
        <div className="w-full sm:w-48">
          <InputField
            label="Name"
            id="manageuserid"
            name="manageuserid"
            placeholder="Enter User ID"
            // value={manageId}
            // onChange={(e) => setManageID(e.target.value)}
          />
        </div>

        {/* Mobile Number Input */}
        <div className="w-full sm:w-48">
          <InputField
            label="Mobile Number"
            id="managemobile"
            name="managemobile"
            placeholder="Enter Mobile Number"
            type="number"
            // value={manageMobile}
            // onChange={(e) => setManageMobile(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <InputField
            label="Company Name"
            placeholder="Enter Company Name"
            id="managecompanyname"
            name="managecompanyname"
            type="text"
            // value={managecompanyname}
            // onChange={(e) => setManageCompanyName(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-48">
          <AnimatedDropdown
            label="Status"
            placeholder="Status"
            id="managestatus"
            name="managestatus"
            options={[
              { value: 1, label: "Active" },
              { value: 0, label: "Inactive" },
            ]}
            // value={selectedOption}
            onChange={() => {}}
          />
        </div>

        {/* ✅ Search Button */}
        <div className="w-max-content">
          <UniversalButton
            id="managesearchbtn"
            name="managesearchbtn"
            label={isFetching ? "Searching..." : "Search"}
            icon={<IoSearch />}
            // onClick={handleSearch}
            // disabled={isFetching}
          />
        </div>
      </div>

      <div>
        {isFetching ? (
          <UniversalSkeleton height="35rem" width="100%" />
        ) : (
          <ManageUserTable allUsers={allUsers} />
        )}
      </div>
    </div>
  );
};

export default ManageUser;
