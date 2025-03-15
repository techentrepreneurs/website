"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type StatCounterProps = {
  stats: {
    value: number;
    label: string;
    icon?: React.ReactNode;
    suffix?: string;
  }[];
  className?: string;
};

const fontSize = 42;
const padding = 15;
const height = fontSize + padding;

export function GlassyStatCounter({ stats, className }: StatCounterProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 backdrop-blur-md">
        <div className="grid grid-cols-4 w-full py-6 px-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-baseline text-white">
                  <div
                    className="flex overflow-hidden text-4xl md:text-5xl font-bold leading-none tracking-tight"
                  >
                    <AnimatedValue value={stat.value} />
                    {stat.suffix && <span className="ml-0.5">{stat.suffix}</span>}
                  </div>
                </div>
                <div className="text-xs md:text-sm text-gray-300 mt-2">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimatedValue({ value }: { value: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const places = value.toString().length;
  const placeValues = Array.from({ length: places }, (_, i) =>
    Math.pow(10, places - i - 1)
  );

  return (
    <div className="flex">
      {placeValues.map((place, i) => (
        <Digit
          key={i}
          place={place}
          value={isVisible ? value : 0}
          animate={isVisible}
        />
      ))}
    </div>
  );
}

function Digit({
  place,
  value,
  animate
}: {
  place: number;
  value: number;
  animate: boolean;
}) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const animatedValue = useSpring(0, {
    stiffness: 80,
    damping: 20
  });

  useEffect(() => {
    if (animate) {
      animatedValue.set(valueRoundedToPlace);
    }
  }, [animatedValue, valueRoundedToPlace, animate]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
} 