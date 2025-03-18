import { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import UniversalDatePicker from '../../whatsapp/components/UniversalDatePicker.jsx';
import InputField from '../../whatsapp/components/InputField.jsx';
import UniversalButton from '../../whatsapp/components/UniversalButton.jsx';
import UniversalSkeleton from '../../whatsapp/components/UniversalSkeleton.jsx';
import Loader from '../../whatsapp/components/Loader.jsx';
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown.jsx';
import SuggestionReportTableRcs from './components/SuggestionReportTableRcs.jsx';


const SuggestionReportRcs = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputMobile, setInputMobile] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const agentOptions =[
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
          
          <div className="flex flex-wrap gap-2 items-end pb-1 w-full">
            {/* From Date Picker */}
            <div className="w-full sm:w-56">
              <UniversalDatePicker
                id="suggestionfrom"
                name="suggestionfrom"
                label="From Date"
              />
            </div>

            {/* To Date Picker */}
            <div className="w-full sm:w-56">
              <UniversalDatePicker
              id="suggestionto"
                name="suggestionto"
                label="To Date"
              />
            </div>

            <div className="w-max-content">
              <AnimatedDropdown
              label="Agent"
              options={agentOptions}
              id="suggestionagent"
              name="suggestionagent"
              value={selectedOption}
              onChange={(newValue) => setSelectedOption(newValue)}
              placeholder='Select Agent Name'
              />
            </div>

            {/* Mobile Number Input Field */}
            <div className="w-max-content">
              <InputField
                id="suggestionmobile"
                name="suggestionmobile"
                type='number'
                label="Mobile Number"
                value={inputMobile}
                onChange={(e) => setInputMobile(e.target.value)}
                placeholder="Enter Mobile Number"
              />
            </div>

            {/* Search Button */}
            <div className="w-max-content">
              <UniversalButton
              id="suggestionsearch"
                name="suggestionsearch"
                label={isFetching ? "Searching..." : "Search"}
                icon={<IoSearch />}
                disabled={isFetching}
              />
            </div>
            <div className="w-max-content">
              <UniversalButton
              label="Export"
              id="suggestionexport"
              name="suggestionexport"
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
              <SuggestionReportTableRcs
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

export default SuggestionReportRcs
