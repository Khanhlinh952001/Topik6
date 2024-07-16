// TestingLayout.js
import React from 'react';
import ScoreTracking from '../components/ScoreTracking';
import Header from '../components/Sidebar/Header';
import '../styles/style.css'
const TestingLayout = ({ children, scoreTrackingProps, selectedSet, answeredQuestions}) => {
    console.log(answeredQuestions)
  return (
    <div className='bg-slate-200 relative'>
      <Header selectedSet={selectedSet} answeredQuestions={answeredQuestions} {...scoreTrackingProps} />
      
      <div className="flex">
      
          <div className="lg:md:w-2/12  bg-gray-100 mt-36 mr-1 widthMD lg:block md:block sm:hidden hiddenC">
            <ScoreTracking {...scoreTrackingProps} />
          </div>
        
        {/* <div className="w-2/12 bg-gray-100 mt-36 mr-1 lg:block md:block sm:hidden">
          <ScoreTracking {...scoreTrackingProps} />
        </div> */}
       <div className={`w-10/12 ml-1 mt-8 mr-2 h-screen overflow-y-auto layoutSM relative ${scoreTrackingProps.showTracking ? 'w-full sm:mx-1' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TestingLayout;

