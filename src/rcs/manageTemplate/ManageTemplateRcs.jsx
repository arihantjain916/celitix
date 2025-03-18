import React, { useState } from 'react'
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown'
import UniversalButton from '../../whatsapp/components/UniversalButton';
import InputField from '../../whatsapp/components/InputField';
import { IoSearch } from "react-icons/io5";
import ManageTemplatetableRcs from './components/ManageTemplatetableRcs';
import { useNavigate } from 'react-router-dom';

const ManageTemplateRcs = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [templateStatus, setTamplateStatus] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const templatetypeOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ]
  const statusOptions=[
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ]

  const navigate = useNavigate();

  const handleaddTemplate = () => {
    navigate("/rcsaddtemplatercs");
  };
  
  return (
    <div className='w-full'>
      {/* {isLoading ? (
      <>
        <Loader />
      </>
    ) : ( */}
      <div>
      <div className="flex flex-wrap gap-4 items-end justify-end align-middle pb-1 w-full">
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
        <div className="flex flex-wrap gap-2 items-end mb-2 w-full">
          <div className="w-full sm:w-56">
            <InputField
              label="Template Name"
              id='templateName'
              name='templateName'
              placeholder="Enter Template Name
"
            />
          </div>
          <div className="w-full sm:w-56">
            <AnimatedDropdown
              label="Template Type"
              id="templatetype"
              name="templatetype"
              options={templatetypeOptions}
              value={selectedOption}
              onChange={(newValue) => setSelectedOption(newValue)}
              placeholder='Select Template Type'
            />
          </div>
          <div className="w-full sm:w-56">
            <AnimatedDropdown
              label="Status"
              id="status"
              name="status"
              options={statusOptions}
              value={templateStatus}
              onChange={(newValue) => setTamplateStatus(newValue)}
              placeholder='Select Template Type'
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
            isFetching={isFetching}
            data={filteredData}
            />
          </div>
        )}
      </div>
      {/* )} */}
    </div>
  )
}

export default ManageTemplateRcs;
