
import React, { useState } from "react";
import { Clock } from "lucide-react";

interface Performance {
  artist: string;
  time: string;
  stage: string;
}

interface DaySchedule {
  date: string;
  day: string;
  performances: Performance[];
}

const scheduleData: DaySchedule[] = [
  {
    date: "August 8",
    day: "Day 1",
    performances: [
      { artist: "Lunar Echo", time: "4:00 PM", stage: "Main Stage" },
      { artist: "Crystal Dreams", time: "5:30 PM", stage: "Forest Stage" },
      { artist: "Astral Soul", time: "7:00 PM", stage: "Main Stage" },
      { artist: "Midnight Voyage", time: "9:00 PM", stage: "Main Stage" },
      { artist: "Ethereal Flow", time: "11:00 PM", stage: "Night Garden" },
    ],
  },
  {
    date: "August 9",
    day: "Day 2",
    performances: [
      { artist: "Velvet Horizon", time: "3:30 PM", stage: "Main Stage" },
      { artist: "Echo Valley", time: "5:00 PM", stage: "Forest Stage" },
      { artist: "Northern Lights", time: "6:30 PM", stage: "Night Garden" },
      { artist: "Cosmic Waves", time: "8:00 PM", stage: "Main Stage" },
      { artist: "Silver Lining", time: "10:30 PM", stage: "Main Stage" },
    ],
  },
  {
    date: "August 10",
    day: "Day 3",
    performances: [
      { artist: "Sundown Collective", time: "2:00 PM", stage: "Forest Stage" },
      { artist: "Rhythm Junction", time: "4:00 PM", stage: "Main Stage" },
      { artist: "Harmonic Pulse", time: "6:00 PM", stage: "Night Garden" },
      { artist: "Velvet Horizon", time: "8:00 PM", stage: "Forest Stage" },
      { artist: "Lunar Echo", time: "10:00 PM", stage: "Main Stage" },
    ],
  },
];

const ScheduleSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="schedule" className="section-padding bg-festival-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-festival-200 text-festival-800 px-4 py-1 rounded-full text-sm font-medium tracking-wide mb-4">
            THE PROGRAM
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-festival-900 mb-4">
            Festival Schedule
          </h2>
          <p className="text-festival-700 max-w-2xl mx-auto">
            Plan your festival experience with our day-by-day schedule.
          </p>
        </div>

        {/* Day tabs */}
        <div className="flex justify-center mb-12 border-b border-festival-200">
          {scheduleData.map((day, index) => (
            <button
              key={day.day}
              className={`day-tab ${activeDay === index ? "active" : ""}`}
              onClick={() => setActiveDay(index)}
              data-state={activeDay === index ? "active" : "inactive"}
            >
              <span className="block text-sm mb-1">{day.date}</span>
              <span className="font-medium">{day.day}</span>
            </button>
          ))}
        </div>

        {/* Schedule list */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 staggered-appear">
          {scheduleData[activeDay].performances.map((performance, index) => (
            <div
              key={`${performance.artist}-${index}`}
              className="flex flex-col md:flex-row md:items-center py-6 border-b border-festival-100 last:border-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="flex items-center">
                  <Clock size={16} className="text-accent-foreground mr-2" />
                  <span className="text-festival-800">{performance.time}</span>
                </div>
              </div>
              
              <div className="md:w-2/4 mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-festival-900">
                  {performance.artist}
                </h3>
              </div>
              
              <div className="md:w-1/4 flex justify-start md:justify-end">
                <span className="bg-festival-100 text-festival-700 px-3 py-1 rounded-full text-sm">
                  {performance.stage}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block bg-transparent hover:bg-festival-100 text-festival-800 px-8 py-3 rounded-full border border-festival-300 transition-all duration-300 font-medium"
          >
            Download Full Schedule
          </a>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
