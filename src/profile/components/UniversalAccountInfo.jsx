import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import UniversalButton from "../../../components/common/UniversalButton";
import UniversalButton from "../../components/common/UniversalButton";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridFooterContainer } from "@mui/x-data-grid";
import usePagination from "@mui/material/usePagination";
import styled from "styled-components";
import { getRcsRate, getWhatsAppRate } from "../../apis/user/user";

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

  const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
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

function AccountInfoModal({ show, handleClose }) {
  const [showRcsPricing, setShowRcsPricing] = useState(false);
  const [showWhatsPricing, setShowWhatsPricing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rcsrate, setRcsRate] = useState([]);
  const [whatsapprate, setWhatsAppRate] = useState([]);

  useEffect(() => {
    async function getRcsRateData() {
      const data = await getRcsRate();
      setRcsRate(data);
    }

    async function getWhatsAppRateDate() {
      const data = await getWhatsAppRate();
      setWhatsAppRate(data);
    }

    getRcsRateData();
    getWhatsAppRateDate();
  }, []);

  // Account Data
  const accountData = [
    {
      service: "SMS",
      credits: 25000,
      createdOn: "25/04/2023",
      expiry: "15/02/2024",
      pricing: "0.20 INR/Credit",
    },
    {
      service: "Two Way SMS",
      credits: 25000,
      createdOn: "25/04/2023",
      expiry: "15/02/2024",
      pricing: "0.20 INR",
    },
    {
      service: "RCS",
      credits: 25000,
      createdOn: "25/04/2023",
      expiry: "15/02/2024",
      pricing: (
        <button onClick={() => setShowRcsPricing(true)}>
          <VisibilityIcon className="text-green-600 cursor-pointer" />
        </button>
      ),
    },
    {
      service: "WhatsApp",
      credits: 25000,
      createdOn: "25/04/2023",
      expiry: "15/02/2024",
      pricing: (
        <button onClick={() => setShowWhatsPricing(true)}>
          <VisibilityIcon className="text-green-600 cursor-pointer" />
        </button>
      ),
    },
  ];

  // RCS Pricing Data
  const rcsPricingData = [
    { id: 1, country: "India", countryCode: "+91", rate: "0.30" },
    { id: 2, country: "USA", countryCode: "+1", rate: "0.50" },
    { id: 3, country: "UK", countryCode: "+44", rate: "0.45" },
    { id: 4, country: "Canada", countryCode: "+1", rate: "0.40" },
  ];

  // Handle Search
  const handleSearch = () => {
    const filtered = rcsPricingData.filter(
      (item) =>
        item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.countryCode.includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const WhatsAppcolumns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "country_name", headerName: "Country", flex: 1, minWidth: 120 },
    { field: "ISO_code", headerName: "Country Code", flex: 1, minWidth: 120 },
    {
      field: "transactional",
      headerName: "Transactional (INR/Credit)",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "promotional",
      headerName: "Promotional (INR/Credit)",
      flex: 1,
      minWidth: 120,
    },
  ];

  const Rcscolumns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "country_name", headerName: "Country", flex: 1, minWidth: 120 },
    { field: "ISO_code", headerName: "Country Code", flex: 1, minWidth: 120 },
    { field: "rate", headerName: "Rate (INR/Credit)", flex: 1, minWidth: 120 },
  ];

  const whatsApprows = Array.isArray(whatsapprate)
    ? whatsapprate.map((item, index) => ({
        id: index + 1,
        sn: index + 1,
        country_name: item.country_name ?? "-",
        ISO_code:  item.ISO_code ?? "-",
        transactional: item.transactional,
        promotional: item.promotional,
      }))
    : [];

  const rcsrows = Array.isArray(rcsrate)
    ? rcsrate.map((item, index) => ({
        id: index + 1,
        sn: index + 1,
        country_name: item.country_name,
        ISO_code: "+" + item.ISO_code,
        rate: item.rate,
      }))
    : [];

  // const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

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
          padding: 0,
          gap: 2,
          overflowX: "auto",
        }}
      >
        {/* <Box
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
                    Total Records: <span className='font-semibold'>{rows.length}</span>
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
            </Box> */}
      </GridFooterContainer>
    );
  };

  return (
    <>
      {/* Account Info Dialog */}
      <Dialog
        header="Account Info"
        visible={show}
        style={{ width: "50vw" }}
        onHide={handleClose}
        modal
        draggable={false}
      >
        {/* Account Expiry Badge */}
        <div className="flex justify-end mb-3">
          <span className="px-3 py-1 font-medium text-blue-700 bg-blue-100 rounded-md">
            Account Expiry: 25/02/2024
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden rounded-lg shadow-lg bg-gray-50">
            <thead className="text-center text-white bg-blue-500">
              <tr>
                <th className="p-3">Service</th>
                {/* <th className="p-3">Credits</th> */}
                <th className="p-3">Created On</th>
                <th className="p-3">Plan Expiry</th>
                <th className="p-3">Pricing</th>
              </tr>
            </thead>
            <tbody className="text-center divide-y divide-gray-300">
              {accountData.map((item, index) => (
                <tr
                  key={index}
                  className="transition even:bg-gray-100 hover:bg-blue-50"
                >
                  <td className="p-3">{item.service}</td>
                  {/* <td className="p-3">{item.credits}</td> */}
                  <td className="p-3">{item.createdOn}</td>
                  <td className="p-3">{item.expiry}</td>
                  <td className="p-3">{item.pricing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>

      {/* RCS Pricing Modal */}
      <Dialog
        header="RCS Price"
        visible={showRcsPricing}
        style={{ width: "50vw" }}
        onHide={() => setShowRcsPricing(false)}
        modal
        draggable={false}
      >
        <Paper sx={{ height: "auto" }}>
          <DataGrid
            rows={rcsrows}
            columns={Rcscolumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20, 50]}
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            // checkboxSelection
            rowHeight={45}
            slots={{ footer: CustomFooter }}
            // slotProps={{ footer: { totalRecords: rows.length } }}
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
      </Dialog>

      <Dialog
        header="WhatsApp Price"
        visible={showWhatsPricing}
        style={{ width: "50vw" }}
        onHide={() => setShowWhatsPricing(false)}
        modal
        draggable={false}
      >
        <Paper sx={{ height: "auto" }}>
          <DataGrid
            rows={whatsApprows}
            columns={WhatsAppcolumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20, 50]}
            pagination
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            // checkboxSelection
            rowHeight={45}
            slots={{ footer: CustomFooter }}
            // slotProps={{ footer: { totalRecords: rows.length } }}
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
      </Dialog>
    </>
  );
}

export default AccountInfoModal;
