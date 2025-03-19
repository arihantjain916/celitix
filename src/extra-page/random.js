<Dialog
        header="Assign Service"
        visible={assignService}
        onHide={() => setAssignService(false)}
        className="lg:w-[65rem] md:w-[50rem] w-[20rem]"
        draggable={false}
      >
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Assign Service Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label={
                <span>
                  <WhatsAppIcon size={20} /> WhatsApp
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
                <span className="flex items-center gap-2">
                  <BsJournalArrowDown size={18} />
                  RCS
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
            <Tab
              label={
                <span>
                  <SmsOutlinedIcon size={20} /> SMS
                </span>
              }
              {...a11yProps(2)}
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
                  <CampaignOutlinedIcon size={20} />
                  OBD
                </span>
              }
              {...a11yProps(3)}
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
                  <CampaignOutlinedIcon size={20} />
                  Two Way
                </span>
              }
              {...a11yProps(4)}
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
                  <PhoneMissedOutlinedIcon size={20} />
                  Missed Call
                </span>
              }
              {...a11yProps(5)}
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
                  <CampaignOutlinedIcon size={20} />
                  C2C
                </span>
              }
              {...a11yProps(6)}
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
                  <EmailOutlinedIcon size={20} />
                  E-mail
                </span>
              }
              {...a11yProps(7)}
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
                  <CampaignOutlinedIcon size={20} />
                  IBD
                </span>
              }
              {...a11yProps(8)}
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
          <CustomTabPanel value={value} index={0} className="">
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="whatsaapOption1"
                      name="whatsappredio"
                      value="enable"
                      onChange={handleChangewhatsapp}
                      checked={whatsappStatus === "enable"}
                    />
                    <label
                      htmlFor="whatsaapOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>

                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="whatsOption2"
                      name="whatsappredio"
                      value="disable"
                      onChange={handleChangewhatsapp}
                      checked={whatsappStatus === "disable"}
                    />
                    <label
                      htmlFor="whatsOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {/* <RadioGroupField
                id="whatsappenabledisabled"
                name="whatsappenabledisabled"
                // label="Enable Whatsapp"
                options={whatsappenabledisabled}
                value={whatsappStatus}
                onChange={(e) => setWhatsappStatus(e.target.value)}
              /> */}
              {whatsappStatus === "enable" && (
                <>
                  <div id="whatsapptable">
                    <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                      <AnimatedDropdown
                        id="whatsappcountryselect"
                        name="whatsappcountryselect"
                        label="Select Country"
                        options={countryOptions}
                        value={whatsappCountry}
                        onChange={(value) => setWhatsappCountry(value)}
                      />

                      <InputField
                        id="whatsapputility"
                        name="whatsapputility"
                        label="Utility"
                        placeholder="INR / Credit"
                        value={whatsappUtility}
                        onChange={(e) =>
                          validateInput(e.target.value, setWhatsappUtility)
                        }
                        type="text"
                        readOnly={!whatsappCountry}
                      />

                      <InputField
                        id="whatsappmarketing"
                        name="whatsappmarketing"
                        label="Marketing"
                        placeholder="INR / Credit"
                        value={whatsappMarketing}
                        onChange={(e) =>
                          validateInput(e.target.value, setWhatsappMarketing)
                        }
                        type="text"
                        readOnly={!whatsappCountry}
                      />

                      <UniversalButton
                        label="Add"
                        id="whatsaapaddcredit"
                        name="whatsaapaddcredit"
                        onClick={handleWhatsappAddCredit}
                      />
                    </div>

                    <Paper sx={{ height: 250 }} id={id} name={name}>
                      <DataGrid
                        id={id}
                        name={name}
                        rows={whatsapprows}
                        columns={whatsaappcolumns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[10, 20, 50]}
                        pagination
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        rowHeight={45}
                        slots={{
                          footer: CustomFooter,
                          noRowsOverlay: CustomNoRowsOverlay,
                        }}
                        onRowSelectionModelChange={(ids) =>
                          setSelectedRows(ids)
                        }
                        disableRowSelectionOnClick
                        disableColumnResize
                        disableColumnMenu
                        sx={{
                          border: 0,
                          "& .MuiDataGrid-cell": { outline: "none !important" },
                          "& .MuiDataGrid-columnHeaders": {
                            color: "#193cb8",
                            fontSize: "14px",
                            fontWeight: "bold !important",
                          },
                          "& .MuiDataGrid-row--borderBottom": {
                            backgroundColor: "#e6f4ff !important",
                          },
                          "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
                        }}
                      />
                    </Paper>
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="whatsappsave"
                      name="whatsappsave"
                    />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="rcsOption1"
                      name="rcsredio"
                      value="enable"
                      onChange={handleChangercs}
                      checked={rcsStatus === "enable"}
                    />
                    <label
                      htmlFor="rcsOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>

                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="rcsOption2"
                      name="rcsredio"
                      value="disable"
                      onChange={handleChangercs}
                      checked={rcsStatus === "disable"}
                    />
                    <label
                      htmlFor="rcsOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>

              {/* <RadioGroupField
                id="rcsenabledisabled"
                name="rcsenabledisabled"
                // label="Enable Whatsapp"
                options={rcsenabledisabled}
                value={rcsStatus}
                onChange={(e) => setRcsStatus(e.target.value)}
              /> */}
              {rcsStatus === "enable" && (
                <>
                  <div id="rcstable">
                    <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                      <AnimatedDropdown
                        id="rcscountryselect"
                        name="rcscountryselect"
                        label="Select Country"
                        options={rcscountryOptions}
                        value={rcsCountry}
                        onChange={(value) => setRcsCountry(value)}
                      />

                      <InputField
                        id="rcsrate"
                        name="rcsrate"
                        label="Rate"
                        placeholder="INR / Credit"
                        value={rcsrate}
                        onChange={(e) =>
                          validateInput(e.target.value, setRcsrate)
                        }
                        type="text"
                        readOnly={!rcsCountry}
                      />

                      <UniversalButton
                        label="Add"
                        id="rcsaddcredit"
                        name="rcsaddcredit"
                        onClick={handleRcsAddCredit}
                      />
                    </div>

                    <Paper sx={{ height: 250 }} id={id} name={name}>
                      <DataGrid
                        id={id}
                        name={name}
                        rows={rcsrows}
                        columns={rcscolumns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[10, 20, 50]}
                        pagination
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        rowHeight={45}
                        slots={{
                          footer: CustomFooter,
                          noRowsOverlay: CustomNoRowsOverlay,
                        }}
                        onRowSelectionModelChange={(ids) =>
                          setSelectedRows(ids)
                        }
                        disableRowSelectionOnClick
                        disableColumnResize
                        disableColumnMenu
                        sx={{
                          border: 0,
                          "& .MuiDataGrid-cell": { outline: "none !important" },
                          "& .MuiDataGrid-columnHeaders": {
                            color: "#193cb8",
                            fontSize: "14px",
                            fontWeight: "bold !important",
                          },
                          "& .MuiDataGrid-row--borderBottom": {
                            backgroundColor: "#e6f4ff !important",
                          },
                          "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
                        }}
                      />
                    </Paper>
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton label="Save" id="rcssave" name="rcssave" />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="smsOption1"
                      name="smsredio"
                      value="enable"
                      onChange={handleChangesms}
                      checked={smsStatus === "enable"}
                    />
                    <label
                      htmlFor="smsOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>

                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="smsOption2"
                      name="smsredio"
                      value="disable"
                      onChange={handleChangesms}
                      checked={smsStatus === "disable"}
                    />
                    <label
                      htmlFor="smsOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>

              {smsStatus === "enable" && (
                <div>
                  <div className="flex mb-2 lg:w-100 md:w-100">
                    <Checkbox
                      id="smsstatus"
                      name="smsstatus"
                      onChange={(e) => setTranscheck(e.checked)}
                      checked={transcheck}
                      className="m-2"
                    />

                    <AnimatedDropdown
                      id="transdropdown"
                      name="transdropdown"
                      options={transOptions}
                      value={trans}
                      onChange={(value) => setTrans(value)}
                      disabled={!transcheck}
                    />
                  </div>
                  <div className="flex lg:w-100 md:w-100">
                    <Checkbox
                      id="smspromo"
                      name="smspromo"
                      onChange={(e) => setPromocheck(e.checked)}
                      checked={promocheck}
                      className="m-2"
                    />

                    <AnimatedDropdown
                      id="transdropdown"
                      name="transdropdown"
                      options={promoOption}
                      value={promo}
                      onChange={(value) => setPromo(value)}
                      disabled={!promocheck}
                    />
                  </div>

                  <div className=" lg:w-100 md:w-100">
                    <InputField
                      id="translimit"
                      name="translimit"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      value={smsrate}
                      onChange={(e) =>
                        validateInput(e.target.value, setSmsRate)
                      }
                      type="number"
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="whatsappsave"
                      name="whatsappsave"
                    />
                  </div>
                </div>
              )}
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={3}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="obdOption1"
                      name="obdredio"
                      value="enable"
                      onChange={handleChangeobd}
                      checked={obdStatus === "enable"}
                    />
                    <label
                      htmlFor="obdOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>

                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="obdOption2"
                      name="obdredio"
                      value="disable"
                      onChange={handleChangeobd}
                      checked={obdStatus === "disable"}
                    />
                    <label
                      htmlFor="obdOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>

              {obdStatus === "enable" && (
                <div>
                  <div className="flex mb-2 lg:w-100 md:w-100">
                    <Checkbox
                      id="obdstatusobd"
                      name="obdstatusobd"
                      onChange={(e) => setTranscheckobd(e.checked)}
                      checked={transcheckobd}
                      className="m-2"
                    />

                    <AnimatedDropdown
                      id="transdropdownobd"
                      name="transdropdownobd"
                      options={transOptionsobd}
                      value={transobd}
                      onChange={(value) => setTransobd(value)}
                      disabled={!transcheckobd}
                    />
                  </div>
                  <div className="flex lg:w-100 md:w-100">
                    <Checkbox
                      id="obdstatuspromo"
                      name="obdstatuspromo"
                      onChange={(e) => setPromocheckobd(e.checked)}
                      checked={promocheckobd}
                      className="m-2"
                    />

                    <AnimatedDropdown
                      id="transdropdownobd"
                      name="transdropdownobd"
                      options={promoOptionobd}
                      value={promoobd}
                      onChange={(value) => setPromoobd(value)}
                      disabled={!promocheckobd}
                    />
                  </div>

                  <div className=" lg:w-100 md:w-100">
                    <div className="flex flex-wrap gap-4 my-2 lg:w-100 md:w-100 ">
                      <div className="flex items-center gap-2">
                        <RadioButton
                          inputId="obdrateOption1"
                          name="obdrateredio"
                          value="enable"
                          onChange={handleChangeobdRate}
                          checked={obdrateStatus === "enable"}
                        />
                        <label
                          htmlFor="obdrateOption1"
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          @ 15 sec
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <RadioButton
                          inputId="obdrateOption2"
                          name="obdrateredio"
                          value="disable"
                          onChange={handleChangeobdRate}
                          checked={obdrateStatus === "disable"}
                        />
                        <label
                          htmlFor="obdrateOption2"
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          @ 30 sec
                        </label>
                      </div>
                    </div>
                    <InputField
                      id="transratesobd"
                      name="transratesobd"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      value={obdrate}
                      onChange={(e) =>
                        validateInput(e.target.value, setObdRate)
                      }
                      type="number"
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="whatsappsave"
                      name="whatsappsave"
                    />
                  </div>
                </div>
              )}
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={4}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="twowayOption1"
                      name="twowayredio"
                      value="enable"
                      onChange={handleChangetwoway}
                      checked={twowayStatus === "enable"}
                    />
                    <label
                      htmlFor="twowayOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>

                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="twowayOption2"
                      name="twowayredio"
                      value="disable"
                      onChange={handleChangetwoway}
                      checked={twowayStatus === "disable"}
                    />
                    <label
                      htmlFor="twowayOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {twowayStatus === "enable" && (
                <>
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                    <AnimatedDropdown
                      id="twowayselect"
                      name="twowayselect"
                      label="Assign Validity"
                      options={twowayOptions}
                      value={twowayAssign}
                      onChange={(value) => setTwowayAssign(value)}
                    />
                    <InputField
                      id="twowayrate"
                      name="twowayrate"
                      label="Rate"
                      placeholder="INR"
                      type="number"
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="twowaysave"
                      name="twowaysave"
                    />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={5}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="misscallOption1"
                      name="misscallredio"
                      value="enable"
                      onChange={handleChangeMisscall}
                      checked={misscallStatus === "enable"}
                    />
                    <label
                      htmlFor="misscallOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>

                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="misscallOption2"
                      name="misscallredio"
                      value="disable"
                      onChange={handleChangeMisscall}
                      checked={misscallStatus === "disable"}
                    />
                    <label
                      htmlFor="misscallOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {misscallStatus === "enable" && (
                <>
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                    <AnimatedDropdown
                      id="misscallselect"
                      name="misscallselect"
                      label="Assign Validity"
                      options={misscallOptions}
                      value={misscallAssign}
                      onChange={(value) => setMisscallAssign(value)}
                    />
                    <InputField
                      id="misscallrate"
                      name="misscallrate"
                      label="Rate"
                      placeholder="INR"
                      type="number"
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="misscallsave"
                      name="misscallsave"
                    />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={6}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="clickOption1"
                      name="clickredio"
                      value="enable"
                      onChange={handleChangeClick}
                      checked={clickStatus === "enable"}
                    />
                    <label
                      htmlFor="clickOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>

                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="clickOption2"
                      name="clickredio"
                      value="disable"
                      onChange={handleChangeClick}
                      checked={clickStatus === "disable"}
                    />
                    <label
                      htmlFor="clickOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {clickStatus === "enable" && (
                <>
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap lg:w-100 md:w-100">
                    <InputField
                      id="clickrate"
                      name="clickrate"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      type="number"
                    />
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="clicksave"
                      name="clicksave"
                    />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={7}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="emailOption1"
                      name="emailredio"
                      value="enable"
                      onChange={handleChangeEmail}
                      checked={emailStatus === "enable"}
                    />
                    <label
                      htmlFor="emailOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>

                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="emailOption2"
                      name="emailredio"
                      value="disable"
                      onChange={handleChangeEmail}
                      checked={emailStatus === "disable"}
                    />
                    <label
                      htmlFor="emailOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {emailStatus === "enable" && (
                <>
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                    <AnimatedDropdown
                      id="emailselect"
                      name="emailselect"
                      label="Assign Validity"
                      options={emailOptions}
                      value={emailAssign}
                      onChange={(value) => setEmailAssign(value)}
                    />
                    <InputField
                      id="emailrate"
                      name="emailrate"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      type="number"
                    />
                  </div>

                  <div className="flex justify-center mt-3">
                    <UniversalButton
                      label="Save"
                      id="emailsave"
                      name="emailsave"
                    />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={8}>
            <div>
              <div className="flex flex-wrap gap-2 mb-2 lg:w-100 md:w-100">
                <div className="flex-1 px-2 py-3 transition-shadow duration-300 bg-white border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="ibdOption1"
                      name="ibdredio"
                      value="enable"
                      onChange={handleChangeIbd}
                      checked={ibdStatus === "enable"}
                    />
                    <label
                      htmlFor="ibdOption1"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Enable
                    </label>
                  </div>
                </div>

                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2">
                    <RadioButton
                      inputId="ibdOption2"
                      name="ibdredio"
                      value="disable"
                      onChange={handleChangeIbd}
                      checked={ibdStatus === "disable"}
                    />
                    <label
                      htmlFor="ibdOption2"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Disable
                    </label>
                  </div>
                </div>
              </div>
              {ibdStatus === "enable" && (
                <>
                  <div className="flex flex-wrap items-end justify-start w-full gap-4 pb-5 align-middle lg:flex-nowrap">
                    <AnimatedDropdown
                      id="ibdselect"
                      name="ibdselect"
                      label="Assign Validity"
                      options={ibdOptions}
                      value={ibdAssign}
                      onChange={(value) => setIbdAssign(value)}
                    />
                    <InputField
                      id="ibdrate"
                      name="ibdrate"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      type="number"
                    />
                  </div>
                  <div className=" lg:w-100 md:w-100">
                    <div className="flex flex-wrap gap-4 my-2 lg:w-100 md:w-100 ">
                      <div className="flex items-center gap-2">
                        <RadioButton
                          inputId="ibdpulseOption1"
                          name="ibdpulseredio"
                          value="enable"
                          onChange={handleChangeibdPulse}
                          checked={ibdpulseStatus === "enable"}
                        />
                        <label
                          htmlFor="ibdpulseOption1"
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          Enable
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <RadioButton
                          inputId="ibdpulseOption2"
                          name="ibdpulseredio"
                          value="disable"
                          onChange={handleChangeibdPulse}
                          checked={ibdpulseStatus === "disable"}
                        />
                        <label
                          htmlFor="ibdpulseOption2"
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          Disable
                        </label>
                      </div>
                    </div>
                    {ibdpulseStatus === "enable" && (
                      <InputField
                        id="ibdpulselimit"
                        name="ibdpulselimit"
                        label="Pulse Limit"
                        placeholder="(INR / Credit)"
                        type="number"
                      />
                    )}
                  </div>
                  <div className="flex justify-center mt-3">
                    <UniversalButton label="Save" id="ibdsave" name="ibdsave" />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>
        </Box>
      </Dialog>