import React from 'react';

const FiltersPanel = ({ showFilters, allUsers, filters, toggleFilter }) => {
  // Extract unique values for filters
  const getUniqueValues = (field) => {
    const allValues = allUsers.flatMap(user =>
      user[field].split(',').map(item => item.trim())
    );
    return [...new Set(allValues)].filter(Boolean);
  };

  return (
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-md ">
        {/* Languages Filter */}
        <div>
          <h3 className="font-medium mb-2 text-gray-700">Languages</h3>
          <div className="space-y-2">
            {getUniqueValues('languages').map(lang => (
              <label key={lang} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-indigo-600 rounded"
                  checked={filters.languages.includes(lang)}
                  onChange={() => toggleFilter('languages', lang)}
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        {/* Education Filter */}
        <div>
          <h3 className="font-medium mb-2 text-gray-700">Education</h3>
          <div className="space-y-2">
            {getUniqueValues('education').map(edu => (
              <label key={edu} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-indigo-600 rounded"
                  checked={filters.education.includes(edu)}
                  onChange={() => toggleFilter('education', edu)}
                />
                {edu}
              </label>
            ))}
          </div>
        </div>

        {/* Specialization Filter */}
        <div>
          <h3 className="font-medium mb-2 text-gray-700">Specialization</h3>
          <div className="space-y-2">
            {getUniqueValues('specialization').map(spec => (
              <label key={spec} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-indigo-600 rounded"
                  checked={filters.specialization.includes(spec)}
                  onChange={() => toggleFilter('specialization', spec)}
                />
                {spec}
              </label>
            ))}
          </div>
        </div>
      </div>
    )
 
 
};

export default FiltersPanel;