import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HomePageCarousel: React.FC = () => {
  return (
    <div>
      <Carousel plugins={[Autoplay({ delay: 2000 })]}>
        <CarouselContent>
          <CarouselItem className="h-[90vh]">
            <img
              src={
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
              className="h-full w-full object-center object-cover"
            />
          </CarouselItem>
          <CarouselItem className="h-[90vh]">
            <img
              src={
                "https://images.unsplash.com/photo-1495216875107-c6c043eb703f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
              className="h-full w-full object-center object-cover "
            />
          </CarouselItem>
          <CarouselItem className="h-[90vh] ">
            <img
              src={
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
              className="h-full w-full object-center object-cover"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HomePageCarousel;
