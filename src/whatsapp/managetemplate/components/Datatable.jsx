import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import { Paper, Typography, Box, Button } from "@mui/material";
import { MdClose } from "react-icons/md";
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay.jsx";

import {
  getWabaTemplate,
  getWabaTemplateDetails,
} from "../../../apis/whatsapp/whatsapp.js";
import whatsappImg from "../../../assets/images/whatsappdummy.webp";

const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

const CustomPagination = ({
  totalPages,
  paginationModel,
  setPaginationModel,
}) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) =>
      setPaginationModel({ ...paginationModel, page: newPage - 1 }),
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
      <PaginationList>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <Button
                key={index}
                variant={selected ? "contained" : "outlined"}
                size="small"
                sx={{ minWidth: "27px" }}
                {...item}
              >
                {page}
              </Button>
            );
          } else {
            children = (
              <Button
                key={index}
                variant="outlined"
                size="small"
                {...item}
                sx={{}}
              >
                {type === "previous" ? "Previous" : "Next"}
              </Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </PaginationList>
    </Box>
  );
};

const DataTable = ({ id, wabaNumber, data, name, wabaList }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [templateData, setTemplateData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [dialogVisible, setDialogVisible] = useState(false);

  const [visible, setVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // To track the clicked button

  // const handleView = (row) => {
  //     setSelectedRow(row);
  //     setDialogVisible(true);
  // };

  const handleView = async (row) => {
    if (!wabaNumber) {
      toast.error("Please select a WABA account.");
      return;
    }
    const selectedWaba = wabaList.find((waba) => waba.mobileNo === wabaNumber);
    if (!selectedWaba || !selectedWaba.wabaAccountId) {
      toast.error("WABA Account ID not found for the selected WABA.");
      return;
    }

    const wabaAccountId = selectedWaba.wabaAccountId;
    const templateName = row.templateName;

    try {
      const response = await getWabaTemplate(wabaAccountId, templateName);

      if (response && response.data.length > 0) {
        setSelectedRow({ ...row, templateData: response.data[0] });
        setDialogVisible(true);
      } else {
        toast.error("No matching template found.");
      }
    } catch (error) {
      toast.error("Error fetching template preview.");
      console.error("Error fetching template data:", error);
    }
  };

  const handleClose = () => {
    setDialogVisible(false);
  };

  const handleDuplicate = (row) => {
    // Implement duplicate logic here
  };

  const handleDelete = (row) => {
    // Implement delete logic here
  };

  // const handleDelete = (event, row) => {
  //     setCurrentRow(row);
  //     setAnchorEl(event.currentTarget);
  //     setVisible(true);
  // };

  // const acceptDelete = () => {
  //     toast.success(`Template "${currentRow.templateName}" deleted successfully.`);
  //     setVisible(false);
  // };

  // const rejectDelete = () => {
  //     toast.error(`Deletion of "${currentRow.templateName}" was cancelled.`);
  //     setVisible(false);
  // };

  // Fetch Templates when WABA number changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWabaTemplateDetails(wabaNumber);
        if (response) {
          setTemplateData(response);
        } else {
          toast.error("Failed to fetch template data!");
          console.error("Failed to fetch template data!");
        }
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };
    fetchData();
  }, [wabaNumber]);

  // **Format Date Function** (Ensures proper date format)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "templateName",
      headerName: "Template Name",
      flex: 1,
      minWidth: 120,
    },
    { field: "category", headerName: "Category", flex: 1, minWidth: 120 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 120 },
    { field: "health", headerName: "Health", flex: 1, minWidth: 120 },
    { field: "createdDate", headerName: "Created At", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <IconButton
            className="text-xs"
            onClick={() => handleView(params.row)}
          >
            <VisibilityIcon
              sx={{
                fontSize: "1.2rem",
                color: "green",
              }}
            />
          </IconButton>
          <IconButton onClick={() => handleDuplicate(params.row)}>
            <FileCopyIcon
              sx={{
                fontSize: "1.2rem",
                color: "gray",
              }}
            />
          </IconButton>
          <IconButton onClick={(event) => handleDelete(event, params.row)}>
            <DeleteForeverIcon
              sx={{
                fontSize: "1.2rem",
                color: "#e31a1a",
              }}
            />
          </IconButton>
        </>
      ),
    },
  ];

  // use this when you want to create rows dynamically
  // const rows = Array.from({ length: 500 }, (_, i) => ({
  //     id: i + 1,
  //     sn: i + 1,
  //     templateName: 'Ram',
  //     category: 'Sharma',
  //     status: 66,
  //     type: '5',
  //     health: 'High',
  //     createdDate: '12/10/2024',
  //     action: 'True',
  // }));

  const rows = data.map((item, index) => ({
    id: item.templateSrno,
    sn: index + 1,
    templateName: item.templateName || "N/A",
    category: item.category || "N/A",
    status: item.status || "N/A",
    type: item.type || "N/A",
    createdDate: formatDate(item.createdDate),
    // createdDate: item.createdDate ? format(new Date(item.createdDate)) : "N/A", // Using timeago.js
  }));

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const CustomFooter = () => {
    return (
      <GridFooterContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            lg: "space-between",
          },
          alignItems: "center",
          padding: 1,
          gap: 2,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {selectedRows.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                borderRight: "1px solid #ccc",
                paddingRight: "10px",
              }}
            >
              {selectedRows.length} Rows Selected
            </Typography>
          )}

          <Typography variant="body2">
            Total Records: <span className="font-semibold">{rows.length}</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <CustomPagination
            totalPages={totalPages}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
          />
        </Box>
      </GridFooterContainer>
    );
  };

  // <button className='flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md '>
  //                   <BsTelephoneFill className='mr-2' />
  //                   Contact us
  //                 </button>
  //                 <button className='flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded-md '>
  //                   <FaExternalLinkAlt className='mr-2' />
  //                   Visit us
  //                 </button>
  //                 <button
  //                   className='flex items-center justify-center w-full px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md'
  //                 >
  //                   <FaReply className='mr-2' />
  //                   View more
  //                 </button>
  const getBtnCss = (type) => {
    switch (type) {
      case "PHONE_NUMBER":
        return "bg-blue-500 text-white";
      case "QUICK_REPLY":
        return "text-gray-800 bg-gray-200";
      default:
        return "bg-green-500 text-white";
    }
  };

  const getBtnIcon = (type) => {
    switch (type) {
      case "PHONE_NUMBER":
        return <BsTelephoneFill className="mr-2" />;
      case "QUICK_REPLY":
        return <FaReply className="mr-2" />;
      default:
        return <FaExternalLinkAlt className="mr-2" />;
    }
  };

  const getBtnTitle = (type, phone, url, text) => {
    switch (type) {
      case "PHONE_NUMBER":
        return `Contact us: ${phone}`;
      case "QUICK_REPLY":
        return `View more: ${text}`;
      default:
        return `Visit us: ${url}`;
    }
  };

  return (
    <>
      <Paper sx={{ height: 558 }}>
        <DataGrid
          id={id}
          name={name}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 50]}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          rowHeight={45}
          slots={{
            footer: CustomFooter,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{ footer: { totalRecords: rows.length } }}
          onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
          disableRowSelectionOnClick
          // autoPageSize
          disableColumnResize
          disableColumnMenu
          sx={{
            border: 0,
            "& .MuiDataGrid-cellCheckbox": {
              outline: "none !important",
            },
            "& .MuiDataGrid-cell": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              color: "#193cb8",
              fontSize: "14px",
              fontWeight: "bold !important",
            },
            "& .MuiDataGrid-row--borderBottom": {
              backgroundColor: "#e6f4ff !important",
            },
            "& .MuiDataGrid-columnSeparator": {
              // display: "none",
              color: "#ccc",
            },
          }}
        />
      </Paper>

      {/* PrimeReact Dialog */}
      {/* <Dialog header={selectedRow?.templateName} visible={dialogVisible} style={{ width: "27rem" }} onHide={handleClose} draggable={false}>
                <div>
                    <h3>{selectedRow?.templateName}</h3>
                    <p>Category: {selectedRow?.category}</p>
                    <p>Status: {selectedRow?.status}</p>
                    <p>Created At: {selectedRow?.createdDate}</p>
                </div>
                <div className="modal-content rounded-xl">
                    <div className="p-2 border-2 border-gray-200 modal-body rounded-xl">
                        <div className="imgbox">
                            <img src={whatsappImg} alt="" className='w-full rounded-lg h-45' />
                        </div>
                        <div className="flex flex-col gap-2 py-2 overflow-scroll text-sm contentbox max-h-80">
                            <p>As vibrant hues fill the canvas of life, may this festival of colors bring immense joy, success and prosperity to your corporate endeavors🎇💻</p>
                            <p>Wishing our esteemed patrons and partners a Holi filled with the splendor of laughter, the warmth of togetherness and the brightness of positivity.📞📞</p>
                            <p>Here's to a colorful journey ahead!🎉🎊</p>
                            <p>Happy Holi!🎇✨</p>
                            <p>Best Regards,🎊🎉</p>
                            <p>Team Celitix</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <button className='flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-500 rounded-md '>
                                <BsTelephoneFill className='mr-2' />
                                Contact us
                            </button>
                            <button className='flex items-center justify-center px-4 py-2 text-sm text-white bg-green-500 rounded-md '>
                                <FaExternalLinkAlt className='mr-2' />
                                Visit us
                            </button>
                            <button
                                className='flex items-center justify-center w-full px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md'
                            >
                                <FaReply className='mr-2' />
                                View more
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog> */}

      {/* Handle View Dialog */}
      <Dialog
        header={selectedRow?.templateName}
        visible={dialogVisible}
        style={{ width: "27rem" }}
        onHide={handleClose}
        draggable={false}
      >
        <div className="modal-content rounded-xl">
          <div className="p-2 border-2 border-gray-200 modal-body rounded-xl">
            {selectedRow?.templateData ? (
              <>
                {/* Image if exists */}
                {selectedRow.templateData.components.some(
                  (comp) => comp.type === "HEADER" && comp.format === "IMAGE"
                ) && (
                  <div className="imgbox">
                    <img
                      src={
                        selectedRow.templateData.components.find(
                          (comp) => comp.type === "HEADER"
                        ).example?.header_handle[0]
                      }
                      alt="Template Preview"
                      className="object-contain w-full border border-gray-200 rounded-lg h-45"
                    />
                  </div>
                )}

                {/* Text Content */}
                <div className="flex flex-col gap-2 py-2 overflow-scroll text-sm contentbox max-h-80">
                  {selectedRow.templateData.components.map(
                    (component, index) => (
                      // <p key={index}>{component.text || "No content available"}</p>
                      <pre className="text-wrap" key={index}>
                        {component.text}
                      </pre>
                    )
                  )}
                </div>

                {/* Buttons if exists */}
                <div className="flex flex-col gap-2">
                  {selectedRow.templateData.components.some(
                    (comp) => comp.type === "BUTTONS"
                  ) &&
                    selectedRow.templateData.components
                      .find((comp) => comp.type === "BUTTONS")
                      .buttons.map((btn, index) => (
                        <button
                          key={index}
                          //   title={
                          //     btn.type === "PHONE_NUMBER"
                          //       ? `Call: ${btn.phone_number}`
                          //       : `Visit: ${btn.url}`
                          //   }
                          title={getBtnTitle(
                            btn.type,
                            btn.phone_number,
                            btn.url,
                            btn.text
                          )}
                          className={`flex items-center justify-center px-4 py-2 text-sm rounded-md cursor-pointer ${getBtnCss(
                            btn.type
                          )}`}
                          onClick={() =>
                            btn.type === "PHONE_NUMBER"
                              ? (window.location.href = `tel:${btn.phone_number}`)
                              : window.open(btn.url, "_blank")
                          }
                        >
                          {getBtnIcon(btn.type)}
                          {btn.text}
                        </button>
                      ))}
                </div>
              </>
            ) : (
              <p>No template data available.</p>
            )}
          </div>
        </div>
      </Dialog>

      {/* Handle Delete Popup */}
      {/* <ConfirmPopup
                target={anchorEl}
                visible={visible}
                onHide={() => setVisible(false)}
                message={`Are you sure you want to delete -  ${currentRow?.templateName} ?`}
                icon={<WarningAmberOutlinedIcon sx={{ color: "red" }} />}
                accept={acceptDelete}
                reject={rejectDelete}
            /> */}
    </>
  );
};

export default DataTable;
