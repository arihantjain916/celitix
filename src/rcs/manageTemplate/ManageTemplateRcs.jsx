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
import { Dialog } from "primereact/dialog";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaReply } from "react-icons/fa6";

const ManageTemplateRcs = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [templateData, setTemplateData] = useState({
    templateName: "",
  });
  const [summaryTableData, setSummaryTableData] = useState([]);
  const [summaryFilterData, setSummaryFilterData] = useState([]);
  const [templateDialogVisible, setTemplateDialogVisible] = useState(false);

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
              setTemplateDialogVisible={setTemplateDialogVisible}
            />
          </div>
        )}
      </div>
      <Dialog
        header="Template View"
        visible={templateDialogVisible}
        style={{ width: "27rem" }}
        onHide={() => {
          setTemplateDialogVisible(false);
        }}
        draggable={false}
      >
        <div className="modal-content rounded-xl">
          <div className="p-2 border-2 border-gray-200 modal-body rounded-xl">
            <div className="imgbox">
              {/* <img
                src={whatsappImg}
                alt=""
                className="w-full rounded-lg h-45"
              /> */}
            </div>
            <div className="flex flex-col gap-2 py-2 overflow-scroll text-sm contentbox max-h-80">
              <p>
                As vibrant hues fill the canvas of life, may this festival of
                colors bring immense joy, success and prosperity to your
                corporate endeavors🎇💻
              </p>
              <p>
                Wishing our esteemed patrons and partners a Holi filled with the
                splendor of laughter, the warmth of togetherness and the
                brightness of positivity.📞📞
              </p>
              <p>Here's to a colorful journey ahead!🎉🎊</p>
              <p>Happy Holi!🎇✨</p>
              <p>Best Regards,🎊🎉</p>
              <p>Team Celitix</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-500 rounded-md ">
                <BsTelephoneFill className="mr-2" />
                Contact us
              </button>
              <button className="flex items-center justify-center px-4 py-2 text-sm text-white bg-green-500 rounded-md ">
                <FaExternalLinkAlt className="mr-2" />
                Visit us
              </button>
              <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md">
                <FaReply className="mr-2" />
                View more
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageTemplateRcs;
