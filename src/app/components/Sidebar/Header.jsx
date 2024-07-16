// Header.js
import React, { useState, useEffect } from "react";
import { Card, CircularProgress, Box, Typography } from "@mui/material";

const Header = ({ selectedSet, answeredQuestions, handleSubmit, score }) => {
  return (
    <Card className="bg-white text-center rounded fixed w-full top-0 z-10 ">
      <div>
        <h1 className="lg:sm:text-3xl sm:text-xl font-bold lg:md:mb-4 sm:mb-2 text-black lg:md:pt-8 sm:pt-2">
          한국어 능력시험
        </h1>
        <div className="mb-4">
          <h3 className="block lg:md:text-2xl sm:text-lg font-medium mt-1 mr-2 text-gray-700">
            {selectedSet === 1 ? "83" : selectedSet - 1} 제회
          </h3>
          {score && <h1 className="text-2xl text-green-500 font-bold ">{score}</h1>}
        </div>
      </div>

      <div className="mx-auto w-20 h-20 lg:hidden md:hidden sm:block relative">
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={answeredQuestions.length * 2}
            size={80}
            thickness={6}
            color="primary"
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {`${Math.round(answeredQuestions.length * 2)}%`}
            </Typography>
          </Box>
        </Box>
        
        <button
          className={`absolute bg-blue-600 text-white text-xs w-10 ${score ? 'hidden':''} `}
          onClick={handleSubmit}
        >
          Kiểm Tra
        </button>
        
      </div>
    </Card>
  );
};

export default Header;
