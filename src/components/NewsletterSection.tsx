
import React, { useState } from "react";
import { Send } from "lucide-react";


const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-festival-900 rounded-3xl overflow-hidden shadow-lg">
          <div className="relative p-8 md:p-12">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMjkuNDk3IDM0LjAxOWExIDEgMCAwIDAgMS4wMDMtLjAwMmwyNS0xNWExIDEgMCAxIDAtMS4wMDYtMS43MjlMMzAgMzIuMjcxIDUuNTA2IDE3LjI4OGExIDEgMCAwIDAtMS4wMDYgMS43MjlsMjQuOTk3IDE1eiIvPjwvZz48L2c+PC9zdmc+')] bg-center"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-white text-3xl md:text-4xl font-display font-bold mb-4">
                Stay Updated
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Subscribe to our newsletter for exclusive festival updates, artist announcements, and special offers.
              </p>
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-grow bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-festival-900 rounded-full px-6 py-3 font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      "Subscribing..."
                    ) : (
                      <>
                        Subscribe <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <p className="text-white/60 text-sm mt-4">
                We respect your privacy and will never share your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
