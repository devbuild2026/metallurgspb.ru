'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  min: number;
  max: number;
  step?: number;
  valueFrom: number;
  valueTo: number;
  onChange: (from: number, to: number) => void;
}

function fmt(n: number) {
  return n.toLocaleString('ru-RU', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function clamp(val: number, lo: number, hi: number) {
  return Math.min(Math.max(val, lo), hi);
}

export default function PriceRangeSlider({ min, max, step = 1, valueFrom, valueTo, onChange }: Props) {
  // Raw text inputs (controlled separately for UX)
  const [fromText, setFromText] = useState(fmt(valueFrom));
  const [toText, setToText] = useState(fmt(valueTo));

  // Keep text in sync when external values change (e.g. reset)
  useEffect(() => { setFromText(fmt(valueFrom)); }, [valueFrom]);
  useEffect(() => { setToText(fmt(valueTo)); }, [valueTo]);

  // Debounce ref for text input
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fireDebounced = useCallback((from: number, to: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange(from, to), 300);
  }, [onChange]);

  // Track ref for computing thumb positions
  const trackRef = useRef<HTMLDivElement>(null);

  // Thumb positions as % of track
  const range = max - min || 1;
  const leftPct = ((valueFrom - min) / range) * 100;
  const rightPct = ((valueTo - min) / range) * 100;

  // Handle slider changes
  const handleFromSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = clamp(Number(e.target.value), min, valueTo);
    onChange(v, valueTo);
  };

  const handleToSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = clamp(Number(e.target.value), valueFrom, max);
    onChange(valueFrom, v);
  };

  // Parse text input (strip spaces, commas)
  const parseInput = (s: string): number | null => {
    const cleaned = s.replace(/\s/g, '').replace(',', '.');
    const n = parseFloat(cleaned);
    return isNaN(n) ? null : n;
  };

  const handleFromText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromText(e.target.value);
    const n = parseInput(e.target.value);
    if (n !== null) {
      const safe = clamp(n, min, valueTo);
      fireDebounced(safe, valueTo);
    }
  };

  const handleFromBlur = () => {
    const n = parseInput(fromText);
    const safe = n !== null ? clamp(n, min, valueTo) : min;
    onChange(safe, valueTo);
    setFromText(fmt(safe));
  };

  const handleToText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToText(e.target.value);
    const n = parseInput(e.target.value);
    if (n !== null) {
      const safe = clamp(n, valueFrom, max);
      fireDebounced(valueFrom, safe);
    }
  };

  const handleToBlur = () => {
    const n = parseInput(toText);
    const safe = n !== null ? clamp(n, valueFrom, max) : max;
    onChange(valueFrom, safe);
    setToText(fmt(safe));
  };

  return (
    <div className="space-y-3">
      {/* Dual slider track */}
      <div className="relative h-5 flex items-center" ref={trackRef}>
        {/* Background track */}
        <div className="absolute inset-x-0 h-1.5 bg-gray-200 rounded-full" />
        {/* Active range */}
        <div
          className="absolute h-1.5 bg-[#CC0000] rounded-full"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        {/* From thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueFrom}
          onChange={handleFromSlider}
          className="absolute inset-0 w-full appearance-none bg-transparent price-range-thumb"
          style={{ zIndex: 3 }}
        />
        {/* To thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueTo}
          onChange={handleToSlider}
          className="absolute inset-0 w-full appearance-none bg-transparent price-range-thumb"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Text inputs */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            inputMode="decimal"
            value={fromText}
            onChange={handleFromText}
            onBlur={handleFromBlur}
            placeholder="от"
            className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#CC0000] transition-colors text-center"
          />
        </div>
        <span className="text-gray-400 text-xs flex-shrink-0">—</span>
        <div className="flex-1">
          <input
            type="text"
            inputMode="decimal"
            value={toText}
            onChange={handleToText}
            onBlur={handleToBlur}
            placeholder="до"
            className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#1a1a1a] focus:outline-none focus:border-[#CC0000] transition-colors text-center"
          />
        </div>
        <span className="text-gray-400 text-xs flex-shrink-0">₽</span>
      </div>
    </div>
  );
}
