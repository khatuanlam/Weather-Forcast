import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Card } from "./Card";

const GridSlider = ({ list }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],

    };
    // Chia items thành các nhóm 4 phần tử
    const items = [];
    for (let i = 0; i < list.length; i += 4) {
        items.push(list.slice(i, i + 4));
    }

    return (
        <Slider {...settings}>
            {items.map((group, index) => (
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        {list.map((ft) => (
                            <Card key={ft.date} forecast={ft} />
                        ))}
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default GridSlider;