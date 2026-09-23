import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTag, FaShieldAlt } from 'react-icons/fa';

const gradients = [
    "from-indigo-900 via-slate-900 to-indigo-950",
    "from-blue-900 via-indigo-900 to-slate-900",
    "from-slate-900 via-purple-950 to-indigo-950"
];

const HeroBanner = () => {
    return (
        <div className='relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 my-4'>
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                effect={'fade'}
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                slidesPerView={1}
                className="mySwiper"
            >
                {bannerLists.map((item, i) => (
                    <SwiperSlide key={item.id || i}>
                        <div className={`relative bg-gradient-to-r ${gradients[i % gradients.length]} min-h-[460px] lg:h-[520px] flex items-center px-6 lg:px-16 py-10 text-white`}>
                            
                            {/* Ambient Glow */}
                            <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
                            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                            <div className='max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10'>
                                
                                {/* Left Content */}
                                <div className='lg:col-span-7 flex flex-col items-start space-y-5 text-left'>
                                    
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                        <FaTag className="text-xs" />
                                        <span>Limited Time Deal • Save up to 40%</span>
                                    </div>

                                    <h2 className='text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight'>
                                        {item.subtitle || "Next-Gen Tech"} <br />
                                        <span className="text-indigo-400">{item.title || "Elevate Your Style"}</span>
                                    </h2>

                                    <p className='text-slate-200 text-sm sm:text-base font-normal max-w-xl leading-relaxed'>
                                        {item.description || "Explore top tier products handcrafted with premium quality, ultrafast delivery, and 100% buyer protection."}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 pt-2">
                                        <Link 
                                            to="/products"
                                            className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-900/30 transition-all duration-300 flex items-center gap-2.5 transform hover:-translate-y-0.5"
                                        >
                                            <span>Shop Now</span>
                                            <FaArrowRight className="text-xs" />
                                        </Link>

                                        <div className="flex items-center gap-2 text-slate-300 text-xs font-medium px-4 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                                            <FaShieldAlt className="text-emerald-400 text-sm" />
                                            <span>Official Warranty Included</span>
                                        </div>
                                    </div>

                                </div>

                                {/* Right Image Banner */}
                                <div className='lg:col-span-5 flex justify-center items-center relative'>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                                        <img 
                                            src={item?.image} 
                                            alt={item.title}
                                            className="relative z-10 max-h-[340px] sm:max-h-[400px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600";
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroBanner;