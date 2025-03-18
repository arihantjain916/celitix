import React, { useEffect, useState } from "react";
import AnimatedDropdown from "../../whatsapp/components/AnimatedDropdown";
import UniversalButton from "../../whatsapp/components/UniversalButton";
import InputField from "../../whatsapp/components/InputField";
import { IoSearch } from "react-icons/io5";
import ManageTemplatetableRcs from "./components/ManageTemplatetableRcs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchAllTemplates,
  updateTemplateStatusbySrno,
} from "../../apis/rcs/rcs";
import UniversalSkeleton from "../../whatsapp/components/UniversalSkeleton";

const ManageTemplateRcs = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [templateData, setTemplateData] = useState({
    templateName: "",
  });
  const [summaryTableData, setSummaryTableData] = useState([]);
  const [summaryFilterData, setSummaryFilterData] = useState([]);
  const [summaryTableUpdateData, setSummaryTableUpdateData] = useState(false);

  const navigate = useNavigate();

  const handleaddTemplate = () => {
    navigate("/rcsaddtemplatercs");
  };

  const handleFetchTempData = async () => {
    try {
      setIsFetching(true);
      const res = await fetchAllTemplates();
      setSummaryFilterData(res.data);
      setSummaryTableData(res.data);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearch = () => {
    const data = {
      ...templateData,
      templateType: templateData.templateType ?? "",
      status: templateData.status ?? "",
    };
    const notNull = Object.keys(data).filter((key) => data[key] != "");

    const filterData = summaryTableData.filter((item) => {
      return notNull.every((key) => String(item[key]).includes(data[key]));
    });

    setSummaryFilterData(filterData);
  };

  const updateTemplateStatus = async (data) => {
    //reverse problem in status
    const updateData = {
      sr_no: data.srno,
      status: String(Number(data.active)),
    };

    try {
      const res = await updateTemplateStatusbySrno(updateData);
      if (res.includes(true)) {
        toast.success("Status Updated Successfully");
        setSummaryFilterData((prev) =>
          prev.map((item) =>
            item.srno == data.srno
              ? { ...item, active: Number(!item.active) }
              : item
          )
        );
      } else {
        toast.error("Something went wrong.");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    console.log(summaryFilterData);
  }, [summaryFilterData]);

  useEffect(() => {
    handleFetchTempData();
  }, []);

  return (
    <div className="w-full">
      <div>
        <div className="flex flex-wrap items-end justify-end w-full gap-4 pb-1 align-middle">
          {/* Name Input Field */}

          <div className="w-max-content">
            <UniversalButton
              id="addtemplatebtn"
              name="addtemplatebtn"
              label="Add Template"
              onClick={handleaddTemplate}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-end w-full gap-2 mb-2">
          <div className="w-full sm:w-56">
            <InputField
              label="Template Name"
              id="templateName"
              name="templateName"
              placeholder="Enter Template Name"
              value={templateData.templateName}
              onChange={(e) => {
                setTemplateData((prevData) => ({
                  ...prevData,
                  templateName: e.target.value,
                }));
              }}
            />
          </div>
          <div className="w-full sm:w-56">
            <AnimatedDropdown
              label="Template Type"
              id="templatetype"
              name="templatetype"
              options={[
                { label: "Text", value: "text" },
                { label: "Image", value: "image" },
                {
                  label: "Rich Card Stand Alone",
                  value: "richcardstandalone",
                },
                {
                  label: "Rich Card Carausel",
                  value: "richcardcarousel",
                },
              ]}
              value={templateData.templateType}
              onChange={(newValue) => {
                setTemplateData((prevData) => ({
                  ...prevData,
                  templateType: newValue,
                }));
              }}
              placeholder="Select Template Type"
            />
          </div>
          <div className="w-full sm:w-56">
            <AnimatedDropdown
              label="Status"
              id="status"
              name="status"
              options={[
                { label: "Pending", value: "Pending" },
                { label: "Approved", value: "Approved" },
                { label: "Operator processing", value: "Operator processing" },
                { label: "Submitted", value: "Submitted" },
              ]}
              value={templateData.status}
              onChange={(newValue) => {
                setTemplateData((prevData) => ({
                  ...prevData,
                  status: newValue,
                }));
              }}
              placeholder="Select Template Type"
            />
          </div>

          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton
              label="Search"
              id="manageSearch"
              name="manageSearch"
              variant="primary"
              icon={<IoSearch />}
              onClick={handleSearch}
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
            <ManageTemplatetableRcs
              id="manageTemplatetable"
              name="manageTemplatetable"
              updateTemplateStatus={updateTemplateStatus}
              data={summaryFilterData}
              setSummaryTableUpdateData={setSummaryTableUpdateData}
            />
          </div>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default ManageTemplateRcs;
