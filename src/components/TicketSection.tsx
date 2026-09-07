
import React, { useEffect, useState } from "react";
import { Calendar, Clock, Star, Ticket } from "lucide-react";

interface TicketOption {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

const ticketsData: TicketOption[] = [
  {
    name: "Day Pass",
    price: "$99",
    features: [
      "Access to all stages for one day",
      "Food and vendor village access",
      "Free parking",
    ],
  },
  {
    name: "Weekend Pass",
    price: "$249",
    features: [
      "Full 3-day festival access",
      "Exclusive viewing areas",
      "Food and vendor village access",
      "Free parking all weekend",
      "Commemorative festival wristband",
    ],
    highlight: true,
  },
  {
    name: "VIP Experience",
    price: "$449",
    features: [
      "Full 3-day festival access",
      "VIP lounge with complimentary refreshments",
      "Exclusive viewing areas at all stages",
      "Meet & greet with select artists",
      "VIP parking",
      "Premium commemorative merchandise package",
    ],
  },
];

const TicketSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Festival date - August 8, 2024
  const festivalDate = new Date(2024, 7, 8).getTime();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("tickets");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = festivalDate - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="tickets" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-festival-100 text-festival-800 px-4 py-1 rounded-full text-sm font-medium tracking-wide mb-4">
            GET YOUR PASS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-festival-900 mb-4">
            Secure Your Tickets
          </h2>
          <p className="text-festival-700 max-w-2xl mx-auto mb-8">
            Choose the ticket option that suits your festival experience.
          </p>

          {/* Countdown timer */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-festival-50 px-4 py-2 rounded-full">
              <Clock size={16} className="text-festival-700 mr-2" />
              <span className="text-festival-800 font-medium">
                Early Bird Prices End In:
              </span>
            </div>
            
            <div className="flex justify-center gap-4 mt-4">
              <div className="bg-white shadow-sm rounded-xl p-3 w-16 md:w-20">
                <div className="text-2xl md:text-3xl font-bold text-festival-900">
                  {countdown.days}
                </div>
                <div className="text-xs text-festival-600 uppercase">Days</div>
              </div>
              <div className="bg-white shadow-sm rounded-xl p-3 w-16 md:w-20">
                <div className="text-2xl md:text-3xl font-bold text-festival-900">
                  {countdown.hours}
                </div>
                <div className="text-xs text-festival-600 uppercase">Hours</div>
              </div>
              <div className="bg-white shadow-sm rounded-xl p-3 w-16 md:w-20">
                <div className="text-2xl md:text-3xl font-bold text-festival-900">
                  {countdown.minutes}
                </div>
                <div className="text-xs text-festival-600 uppercase">Mins</div>
              </div>
              <div className="bg-white shadow-sm rounded-xl p-3 w-16 md:w-20">
                <div className="text-2xl md:text-3xl font-bold text-festival-900">
                  {countdown.seconds}
                </div>
                <div className="text-xs text-festival-600 uppercase">Secs</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 staggered-appear">
          {ticketsData.map((ticket, index) => (
            <div
              key={ticket.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                ticket.highlight
                  ? "border-2 border-accent-foreground shadow-lg transform md:scale-105 md:-translate-y-2"
                  : "border border-festival-200 shadow-sm hover:shadow-md"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {ticket.highlight && (
                <div className="absolute top-0 left-0 right-0 bg-accent-foreground text-white py-1 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`p-6 md:p-8 ${ticket.highlight ? "pt-8" : ""}`}>
                <h3 className="text-xl font-bold text-festival-900 mb-1">
                  {ticket.name}
                </h3>
                <div className="text-3xl font-bold text-festival-900 mb-5">
                  {ticket.price}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {ticket.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Star
                        size={16}
                        className={`mr-2 mt-1 ${
                          ticket.highlight
                            ? "text-accent-foreground"
                            : "text-festival-400"
                        }`}
                      />
                      <span className="text-festival-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-4 rounded-full font-medium transition-colors ${
                    ticket.highlight
                      ? "bg-accent-foreground text-white hover:bg-accent-foreground/90"
                      : "bg-festival-800 text-white hover:bg-festival-700"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Ticket size={18} />
                    Get Tickets
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicketSection;
