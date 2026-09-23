import { useState } from "react";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Thank you! Your message has been sent to support@shopverse.in");
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 800);
    };

    return (
        <div className="min-h-[85vh] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* Header */}
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
                        Get in Touch (India)
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        We'd Love to Hear From You
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Have a question about your order, product warranties, or bulk corporate purchases? Our Indian support team is available 24/7.
                    </p>
                </div>

                {/* Grid Layout: 50/50 Split Equal Width & Matching White Color Scheme */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Left Box: Indian Contact Info Card */}
                    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200/90 flex flex-col justify-between h-full">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-900">Contact Information</h3>
                                <p className="text-slate-500 text-xs mt-1 font-medium">Reach out directly to our India customer experience team.</p>
                            </div>

                            <div className="space-y-6 text-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-xs">
                                        <FaPhoneAlt className="text-base" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Toll-Free Support (India)</h4>
                                        <p className="font-extrabold text-slate-900 mt-0.5 text-base">1800-123-4567</p>
                                        <p className="text-xs text-slate-500 font-medium">+91 (080) 4567-8900 / +91 98765-43210</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                                        <FaEnvelope className="text-base" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Official Email Assistance</h4>
                                        <p className="font-extrabold text-slate-900 mt-0.5 text-base">support@shopverse.in</p>
                                        <p className="text-xs text-slate-500 font-medium">orders@shopverse.in</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 shadow-xs">
                                        <FaMapMarkerAlt className="text-base" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">India Headquarters</h4>
                                        <p className="font-extrabold text-slate-900 mt-0.5 text-base">ShopVerse Technologies India Pvt. Ltd.</p>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                            Building 7, Cyber City, DLF Phase 2, Sector 24<br />
                                            Gurugram, Haryana 122002, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Hours Footer */}
                        <div className="flex items-start gap-4 pt-6 mt-6 border-t border-slate-100">
                            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
                                <FaClock className="text-base" />
                            </div>
                            <div>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Support Hours</h4>
                                <p className="font-extrabold text-slate-900 mt-0.5 text-base">24 Hours / 7 Days a Week</p>
                                <p className="text-xs text-slate-500 font-medium">Hindi & English Customer Support Active</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Box: Send Us a Message Form Card */}
                    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200/90 flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Send Us a Message</h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                            Full Name
                                        </label>
                                        <input 
                                            type="text"
                                            required
                                            placeholder="Rahul Sharma"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-slate-900 font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                            Email Address
                                        </label>
                                        <input 
                                            type="email"
                                            required
                                            placeholder="rahul@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-slate-900 font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Subject
                                    </label>
                                    <input 
                                        type="text"
                                        required
                                        placeholder="Order Inquiry / Product Warranty"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-slate-900 font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                                        Your Message
                                    </label>
                                    <textarea 
                                        rows="4"
                                        required
                                        placeholder="Describe your inquiry in detail..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all resize-none text-slate-900 font-medium"
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
                                >
                                    <FaPaperPlane />
                                    <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Contact;