import React, { useEffect, useState } from 'react';
import './Carousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


//http://internal.millerjohnson.com/_api/web/lists/getbytitle('Carousel')/items?$select=FileRef,SlideOrder,SlideStartDate,SlideEndDate,URL&$filter=(SlideStartDate le '2021-07-16T00:00:00Z') and (SlideEndDate ge '2021-07-17T100:00:00Z')&$orderby=SlideOrder/Carousel/PPT-Template-DM-105070.jpg

export default function Carousel() {
    const [items, setItems] = useState({});
    const domain = "http://internal.millerjohnson.com";

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    var settings = {
        dots:true,
        infinite:true,
        speed:500,
        slidestoShow:1,
        slidesToScroll:1,
        autoplay:false,
        autoplaySpeed:5000
    };

    useEffect(() => {
        fetch("http://internal.millerjohnson.com/_api/web/lists/getbytitle('Carousel')/items?$select=FileRef,SlideOrder,SlideStartDate,SlideEndDate,URL&$filter=(SlideStartDate le '2021-07-16T00:00:00Z') and (SlideEndDate ge '2021-07-17T00:00:00Z')&$orderby=SlideOrder", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-type': 'application/json;odata=verbose'
            }
        }).then((response) => response.json()).then((data) => setItems(data.d.results));
    }, []);

    /* const renderSlides = () => 
        console.log(items);
        [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
            <div>
                <h3>Slide {num}</h3>
            </div>
        )); */
    
    if(isEmpty(items)) { return null; }
    const renderSlides = () =>

        items.map(image => (
            <div className="carousel-slides">
                <a className="carousel-image-link" href={image.URL}>
                    <img className="image-slide" src={domain.concat(image.FileRef)}></img>
                </a>
            </div>
        )); 
    

    return (
        <div className="carousel">
            <h3> News </h3>
            <Slider {...settings}>{renderSlides()} </Slider>
        </div>
    ); 
   
}

