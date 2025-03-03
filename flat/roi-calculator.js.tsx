import React, { useState, useEffect } from 'react';

const ROICalculator = () => {
  // Default values
  const [devCount, setDevCount] = useState(5);
  const [devSalary, setDevSalary] = useState(120000);
  const [projectDuration, setProjectDuration] = useState(6);
  const [aiToolsCost, setAiToolsCost] = useState(10);
  const [productivityMultiplier, setProductivityMultiplier] = useState(5);
  const [trainingTime, setTrainingTime] = useState(2);
  
  // Calculated values
  const [traditionalCost, setTraditionalCost] = useState(0);
  const [aiFirstCost, setAiFirstCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [roi, setRoi] = useState(0);
  const [breakEvenMonths, setBreakEvenMonths] = useState(0);
  
  // Calculate ROI whenever inputs change
  useEffect(() => {
    // Monthly cost per developer
    const monthlyDevCost = devSalary / 12;
    
    // Traditional approach cost
    const tCost = devCount * monthlyDevCost * projectDuration;
    setTraditionalCost(tCost);
    
    // AI-First approach calculations
    const aiLicenseCost = devCount * aiToolsCost * projectDuration;
    const trainingCost = (devCount * (devSalary / 12) * (trainingTime / 4)); // Training time in weeks
    const effectiveDevTime = projectDuration - (trainingTime / 4);
    const adjustedDevCost = (devCount * monthlyDevCost * effectiveDevTime) / productivityMultiplier;
    
    const totalAiCost = aiLicenseCost + trainingCost + adjustedDevCost;
    setAiFirstCost(totalAiCost);
    
    // Calculate savings and ROI
    const calculatedSavings = tCost - totalAiCost;
    setSavings(calculatedSavings);
    
    const calculatedRoi = (calculatedSavings / (aiLicenseCost + trainingCost)) * 100;
    setRoi(calculatedRoi);
    
    // Calculate break-even point
    if (calculatedSavings > 0) {
      const monthlySavingRate = calculatedSavings / projectDuration;
      const initialInvestment = aiLicenseCost + trainingCost;
      const breakEven = initialInvestment / monthlySavingRate;
      setBreakEvenMonths(breakEven);
    } else {
      setBreakEvenMonths(0);
    }
  }, [devCount, devSalary, projectDuration, aiToolsCost, productivityMultiplier, trainingTime]);
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">
        AI-First ROI Calculator
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Project Parameters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Number of Developers
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={devCount}
                onChange={(e) => setDevCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Average Developer Salary ($/year)
              </label>
              <input
                type="number"
                min="40000"
                step="5000"
                value={devSalary}
                onChange={(e) => setDevSalary(Math.max(40000, parseInt(e.target.value) || 40000))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Duration (months)
              </label>
              <input
                type="number"
                min="1"
                max="36"
                value={projectDuration}
                onChange={(e) => setProjectDuration(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">AI-First Factors</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                AI Tools Cost ($/dev/month)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={aiToolsCost}
                onChange={(e) => setAiToolsCost(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
            
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <span>Productivity Multiplier</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{productivityMultiplier}×</span>
              </label>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={productivityMultiplier}
                onChange={(e) => setProductivityMultiplier(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>2×</span>
                <span>5×</span>
                <span>10×</span>
                <span>15×</span>
                <span>20×</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Training Time (weeks)
              </label>
              <input
                type="number"
                min="0"
                max="12"
                step="0.5"
                value={trainingTime}
                onChange={(e) => setTrainingTime(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Traditional Cost:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(traditionalCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">AI-First Cost:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(aiFirstCost)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-blue-200 dark:border-blue-700">
              <span className="text-gray-700 dark:text-gray-300">Total Savings:</span>
              <span className="font-bold text-green-600 dark:text-green-400">{formatCurrency(savings)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">ROI:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{roi.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Break-Even Point:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {breakEvenMonths > 0 ? `${breakEvenMonths.toFixed(1)} months` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-blue-200 dark:border-blue-700">
              <span className="text-gray-700 dark:text-gray-300">Effective Team Size:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {devCount} devs ≈ {(devCount * productivityMultiplier).toFixed(0)} traditional devs
              </span>
            </div>
          </div>
        </div>
        
        {/* Visual savings indicator */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Traditional</span>
            <span className="text-gray-600 dark:text-gray-400">AI-First</span>
          </div>
          <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-600 dark:bg-blue-500 rounded-l-full"
              style={{ 
                width: `${(aiFirstCost / traditionalCost) * 100}%`,
                transition: 'width 0.5s ease-in-out'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-shadow">
              {traditionalCost > 0 ? `${(100 - (aiFirstCost / traditionalCost) * 100).toFixed(0)}% savings` : '0% savings'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
        This calculator provides estimates based on input values. Actual results may vary depending on project complexity, team composition, and other factors.
      </div>
    </div>
  );
};

export default ROICalculator;
