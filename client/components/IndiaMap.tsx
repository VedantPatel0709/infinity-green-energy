'use client';

import React, { useState, useMemo } from 'react';
import mapData from './indiaMapData.json';

interface IndiaMapProps {
  producers?: any[];
  consumers?: any[];
}

export default function IndiaMap({ producers = [], consumers = [] }: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<{ id: string; name: string; x: number; y: number } | null>(null);

  // Future Backend Highlight logic (prepared but inactive now)
  const getFillColor = (stateId: string, stateName: string) => {
    // Exact mapping logic for future backend data activation
    const hasProducer = producers.some(p => 
      (p.state && (p.state.toLowerCase() === stateName.toLowerCase() || p.state.toLowerCase() === stateId.toLowerCase())) || 
      (p.states && (p.states.toLowerCase().includes(stateName.toLowerCase()) || p.states.toLowerCase().includes(stateId.toLowerCase())))
    );
    const hasConsumer = consumers.some(c => 
      c.state && (c.state.toLowerCase() === stateName.toLowerCase() || c.state.toLowerCase() === stateId.toLowerCase())
    );

    const enableHighlight = false; // Toggle to true once backend data is live
    if (enableHighlight) {
      if (hasProducer && hasConsumer) return 'url(#producer-consumer-grad)';
      if (hasProducer) return '#10b981'; // Green
      if (hasConsumer) return '#3b82f6'; // Blue
    }

    // Every state must remain in a neutral gray color for now
    return '#1e293b'; // slate-800
  };

  const handleMouseMove = (e: React.MouseEvent, stateId: string, stateName: string) => {
    const rect = e.currentTarget.ownerDocument.getElementById('india-map-container')?.getBoundingClientRect();
    if (rect) {
      setHoveredState({
        id: stateId,
        name: stateName,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 15 // Offset tooltip slightly above the cursor
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  return (
    <div id="india-map-container" className="relative w-full flex items-center justify-center p-2 min-h-[450px]">
      <svg
        className="w-full max-w-[480px] h-auto transition-all duration-300 select-none"
        viewBox={mapData.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Professional Dual color gradient prepared for future backend data mapping */}
          <linearGradient id="producer-consumer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" /> {/* Emerald Green */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
          </linearGradient>
        </defs>

        {mapData.states.map((state) => {
          const fill = getFillColor(state.id, state.name);
          const isHovered = hoveredState?.id === state.id;

          return (
            <path
              key={state.id}
              id={state.id}
              d={state.d}
              aria-label={state.name}
              fill={fill}
              stroke="#334155" /* slate-700 */
              strokeWidth={isHovered ? "1.5" : "0.75"}
              className="transition-all duration-200 cursor-pointer"
              style={{
                filter: isHovered ? 'brightness(1.2)' : 'none',
              }}
              onMouseMove={(e) => handleMouseMove(e, state.id, state.name)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </svg>

      {/* Hover Tooltip */}
      {hoveredState && (
        <div
          className="absolute z-50 pointer-events-none bg-slate-950/95 border border-slate-800 p-4 rounded-xl shadow-2xl font-sans text-xs text-slate-200 transition-all duration-75 flex flex-col gap-2 min-w-[200px]"
          style={{
            left: `${hoveredState.x}px`,
            top: `${hoveredState.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="font-bold text-white border-b border-slate-800 pb-1.5 uppercase tracking-wider text-[10px]">
            {hoveredState.name}
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex flex-col">
              <span className="text-slate-400 font-semibold uppercase tracking-tight text-[8px]">Producer Records:</span>
              <span className="text-amber-500 font-medium">Awaiting Backend Integration</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 font-semibold uppercase tracking-tight text-[8px]">Consumer Records:</span>
              <span className="text-amber-500 font-medium">Awaiting Backend Integration</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 font-semibold uppercase tracking-tight text-[8px]">Open Access Data:</span>
              <span className="text-amber-500 font-medium">Awaiting Backend Integration</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
