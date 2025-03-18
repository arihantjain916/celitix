import React, { useState } from 'react'
import ManageBotTableRcs from './components/ManageBotTableRcs'
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown'
import UniversalButton from '../../whatsapp/components/UniversalButton';
import { IoSearch } from "react-icons/io5";

const ManageBotRcs = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const botOptions =[
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ]
  



  return (
    <div className='w-full'>
    {/* {isLoading ? (
      <>
        <Loader />
      </>
    ) : ( */}
      <div>
        
        <div className="flex flex-wrap gap-2 items-end mb-2 w-full">
        <div className="w-full sm:w-56">
            <AnimatedDropdown
            label="Bot Name"
            id="botName"
            name="botName"
            options={botOptions}
            value={selectedOption}
            onChange={(newValue) => setSelectedOption(newValue)}
            placeholder='select bot name'
            />
          </div>

          {/* Search Button */}
          <div className="w-max-content">
            <UniversalButton
            
              label="Show"
              disabled={isFetching}
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
            <ManageBotTableRcs
            id="suggestionreport"
            name="suggestionreport"
            data={filteredData}
            />
          </div>
        )}
      </div>
    {/* )} */}
  </div>
  )
}

export default ManageBotRcs
