import React from 'react';

const TestApp = () => {
  return (
    <div className="min-h-screen bg-red-500 p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Tailwind Test</h1>
      <p className="text-white text-xl">If you see a RED background, Tailwind is working!</p>
      <div className="mt-4 p-4 bg-blue-500 text-white rounded-lg">
        This should be a blue box with white text
      </div>
    </div>
  );
};

export default TestApp;