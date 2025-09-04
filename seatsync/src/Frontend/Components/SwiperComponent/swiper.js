
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../Card/card';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Keyboard, Navigation } from 'swiper/modules';
import styles from './swiper.module.css';

export default function TopAlbumsSwiper({ movieList }) {

    return (
        <div className={ styles.carouselContainer }>

            <Swiper
                // --- 1. Mobile Settings (Default for screens < 600px) ---
                slidesPerView={ 3 }
                slidesPerGroup={ 1 }
                spaceBetween={ 0 }
                speed={ 1000 }
                breakpoints={ {
                    // For screens 600px and wider
                    600: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                    // For screens 769px and wider
                    769: {
                        slidesPerView: 5,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 15,
                    }
                } }
                loop={ true } // loops infinitely
                // autoplay={ {
                //     delay: 3000,
                //     disableOnInteraction: false  // means by default it true - if user interacts with slider by his own then autoplay will stop untill page is reloaded or user interacts with slider again - if set to false then autoplay will continue even if user dont interacts with slider
                // } }
                // pagination={ {
                //     clickable: true,
                //     dynamicBullets: false, // Makes pagination more intuitive
                // } }
                keyboard={ {
                    enabled: true, // Allows navigation with the keyboard
                    onlyInViewport: true, // Works only if Swiper is in the viewport
                } }
                navigation={ true } // Enables next/prev buttons
                preventClicks={ false }
                preventClicksPropagation={ false }
                modules={ [Autoplay, Pagination, Keyboard, Navigation] }
                className={ styles.mySwiper }
            >
                { movieList.map((movie) => (
                    // <Link to={ ele.redirect_products_url }>

                    <SwiperSlide key={ movie._id }>
                        <div className={ styles.slideContent }>
                            <Card movie={ movie } />
                        </div>
                    </SwiperSlide>

                )) }
            </Swiper>
        </div >
    )
}