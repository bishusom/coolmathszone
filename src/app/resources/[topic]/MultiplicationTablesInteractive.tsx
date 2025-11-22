// app/resources/[topic]/MultiplicationTablesInteractive.tsx
'use client';

import { useState } from 'react';
import { ContentCard } from '@/components/ui/PageContainer';
import { generateMultiplicationTable } from '@/data/resources-strategies';

export function MultiplicationTablesInteractive() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const tables = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Multiplication Tables 2-19</h2>
      
      {/* Table Selection Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        {tables.map((number) => (
          <button
            key={number}
            onClick={() => setSelectedTable(number)}
            className={`p-4 rounded-lg text-center transition-all duration-200 ${
              selectedTable === number 
                ? 'bg-white text-gray-900 shadow-lg transform scale-105' 
                : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
            }`}
          >
            <div className="text-xl font-bold">Table of</div>
            <div className="text-2xl font-black">{number}</div>
          </button>
        ))}
      </div>

      {/* Selected Table Display */}
      {selectedTable && (
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-black text-gray-900">
              Multiplication Table of {selectedTable}
            </h3>
            <button
              onClick={() => setSelectedTable(null)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Close
            </button>
          </div>
          
          {/* Table in 3-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {generateMultiplicationTable(selectedTable).map(({ multiplier, result }) => (
              <div 
                key={multiplier}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  multiplier <= 5 
                    ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                    : multiplier <= 8 
                    ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    : 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="text-sm text-gray-500 w-8 text-center">
                    {multiplier}.
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-800">
                      {selectedTable} × {multiplier}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-xl font-black text-green-600">
                    {result}
                  </div>
                  {multiplier <= 5 && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                      Easy
                    </span>
                  )}
                  {multiplier > 5 && multiplier <= 8 && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">
                      Medium
                    </span>
                  )}
                  {multiplier > 8 && (
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                      Practice
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-4 text-center">
              <div className="text-sm text-green-600 font-semibold mb-2">Identity Property</div>
              <div className="text-2xl font-black text-green-700">{selectedTable} × 1</div>
              <div className="text-xl text-green-600">= {selectedTable}</div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 text-center">
              <div className="text-sm text-blue-600 font-semibold mb-2">Easy Pattern</div>
              <div className="text-2xl font-black text-blue-700">{selectedTable} × 10</div>
              <div className="text-xl text-blue-600">= {selectedTable * 10}</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-4 text-center">
              <div className="text-sm text-purple-600 font-semibold mb-2">Halfway Point</div>
              <div className="text-2xl font-black text-purple-700">{selectedTable} × 5</div>
              <div className="text-xl text-purple-600">= {selectedTable * 5}</div>
            </div>
          </div>

          {/* Practice Tips */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200 p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">💡 Practice Tips for Table {selectedTable}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  Memorization Techniques
                </h5>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Say the table out loud daily
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Write it three times from memory
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Use flashcards for quick recall
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  Application Methods
                </h5>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Practice skip counting by {selectedTable}s
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Look for patterns in the answers
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    Apply to real-world situations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference for all tables */}
      {!selectedTable && (
        <ContentCard className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
            <div>
              <h4 className="font-semibold text-white mb-2">Easy Tables to Start With:</h4>
              <p>2, 5, 10 - These have clear patterns and are easiest to memorize!</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Practice Strategy:</h4>
              <p>Focus on 2-3 tables per week. Master them before moving to the next ones.</p>
            </div>
          </div>
          
          {/* Learning Progression */}
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <h4 className="font-semibold text-white mb-3">📚 Recommended Learning Order:</h4>
            <div className="flex flex-wrap gap-2">
              {[2, 5, 10, 3, 4, 6, 7, 8, 9, 11, 12].map((num) => (
                <span key={num} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  Table {num}
                </span>
              ))}
            </div>
          </div>
        </ContentCard>
      )}
    </div>
  );
}