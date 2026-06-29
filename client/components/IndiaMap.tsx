'use client';

import React, { useState, useMemo, useCallback } from 'react';
import mapData from './indiaMapData.json';
import { IndiaState } from '../types/map';

interface IndiaMapProps {
  data?: IndiaState[];
  onStateClick?: (state: IndiaState) => void;
  // Keep backward compatibility props as optional
  producers?: any[];
  consumers?: any[];
}

export default function IndiaMap({
  data = [],
  onStateClick,
  producers = [],
  consumers = []
}: IndiaMapProps) {
  // Tooltip tracking state
  const [activeState, setActiveState] = useState<{
    id: string;
    name: string;
    x: number;
    y: number;
    isKeyboard?: boolean;
  } | null>(null);

  // Expose full state data model (integrating future database state counts)
  const stateDataMap = useMemo(() => {
    const map = new Map<string, IndiaState>();
    
    // Initialize defaults for all states in mapData
    mapData.states.forEach((s) => {
      map.set(s.id.toLowerCase(), {
        id: s.id,
        name: s.name,
        producerCount: null,
        consumerCount: null,
        availabilityStatus: 'awaiting_integration'
      });
    });

    // Merge backend data if supplied
    data.forEach((item) => {
      if (item.id) {
        const key = item.id.toLowerCase();
        const existing = map.get(key);
        if (existing) {
          map.set(key, { ...existing, ...item });
        }
      }
    });

    return map;
  }, [data]);

  // Determine state fill color based on backend status configuration
  const getFillColor = useCallback((stateId: string) => {
    const stateInfo = stateDataMap.get(stateId.toLowerCase());
    
    // Future integration toggle logic (Supabase status ready)
    if (stateInfo && stateInfo.availabilityStatus === 'active') {
      return '#10b981'; // Emerald Green
    } else if (stateInfo && stateInfo.availabilityStatus === 'connected') {
      return 'url(#producer-consumer-grad)';
    }

    // Neutral gray for awaiting integration status
    return '#1e293b'; // slate-800
  }, [stateDataMap]);

  // Handle Mouse Events for Hover Tooltip
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGPathElement>, stateId: string, stateName: string) => {
    const rect = e.currentTarget.ownerDocument.getElementById('india-map-container')?.getBoundingClientRect();
    if (rect) {
      setActiveState({
        id: stateId,
        name: stateName,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 20, // offset tooltip slightly above the cursor
        isKeyboard: false
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveState(null);
  }, []);

  // Handle Accessibility Keyboard Focus and Actions
  const handleFocus = useCallback((e: React.FocusEvent<SVGPathElement>, stateId: string, stateName: string) => {
    const rect = e.currentTarget.ownerDocument.getElementById('india-map-container')?.getBoundingClientRect();
    const elemRect = e.currentTarget.getBoundingClientRect();
    
    if (rect) {
      // Position the tooltip at the center of the focused state path
      setActiveState({
        id: stateId,
        name: stateName,
        x: (elemRect.left + elemRect.width / 2) - rect.left,
        y: (elemRect.top) - rect.top - 20,
        isKeyboard: true
      });
    }
  }, []);

  const handleStateClick = useCallback((stateId: string, stateName: string) => {
    const stateInfo = stateDataMap.get(stateId.toLowerCase()) || {
      id: stateId,
      name: stateName,
      availabilityStatus: 'awaiting_integration'
    };
    if (onStateClick) {
      onStateClick(stateInfo);
    }
  }, [stateDataMap, onStateClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<SVGPathElement>, stateId: string, stateName: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStateClick(stateId, stateName);
    }
  }, [handleStateClick]);

  return (
    <div id="india-map-container" className="relative w-full flex items-center justify-center p-2 min-h-[450px]">
      <svg
        className="w-full max-w-[480px] h-auto transition-all duration-300 select-none"
        viewBox={mapData.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Interactive map of India showing renewable energy nodes"
        role="group"
      >
        <defs>
          {/* Dual color gradient prepared for future backend data mapping */}
          <linearGradient id="producer-consumer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" /> {/* Emerald Green */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
          </linearGradient>
        </defs>

        {mapData.states.map((state) => {
          const fill = getFillColor(state.id);
          const isSelected = activeState?.id === state.id;

          return (
            <path
              key={state.id}
              id={state.id}
              d={state.d}
              aria-label={`${state.name}. Status: Awaiting Backend Integration`}
              role="button"
              tabIndex={0}
              fill={fill}
              stroke="#334155" /* slate-700 */
              strokeWidth={isSelected ? 1.5 : 0.75}
              className="transition-all duration-200 cursor-pointer outline-none focus:stroke-primary focus:stroke-[2px]"
              style={{
                filter: isSelected ? 'brightness(1.2)' : 'none',
              }}
              onMouseMove={(e) => handleMouseMove(e, state.id, state.name)}
              onMouseLeave={handleMouseLeave}
              onFocus={(e) => handleFocus(e, state.id, state.name)}
              onBlur={handleMouseLeave}
              onClick={() => handleStateClick(state.id, state.name)}
              onKeyDown={(e) => handleKeyDown(e, state.id, state.name)}
            />
          );
        })}
      </svg>

      {/* Responsive Accessible Hover Tooltip */}
      {activeState && (
        <div
          role="tooltip"
          className="absolute z-50 pointer-events-none bg-slate-950/95 border border-slate-800 p-4 rounded-xl shadow-2xl font-sans text-xs text-slate-200 transition-all duration-75 flex flex-col gap-2 min-w-[220px]"
          style={{
            left: `${activeState.x}px`,
            top: `${activeState.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="font-bold text-white border-b border-slate-800 pb-1.5 uppercase tracking-wider text-[10px] flex justify-between items-center">
            <span>{activeState.name}</span>
            {activeState.isKeyboard && (
              <span className="text-[8px] px-1 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 uppercase tracking-widest font-normal scale-90">
                Focused
              </span>
            )}
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex flex-col">
              <span className="text-slate-400 font-semibold uppercase tracking-tight text-[8px]">Producer Records</span>
              <span className="text-amber-500 font-medium flex items-center gap-1">
                Awaiting Backend Integration
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 font-semibold uppercase tracking-tight text-[8px]">Consumer Records</span>
              <span className="text-amber-500 font-medium flex items-center gap-1">
                Awaiting Backend Integration
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
