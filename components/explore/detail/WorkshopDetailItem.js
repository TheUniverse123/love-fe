import { progressData, questions, ratingTypes } from "@/data";
import WorkshopFrequentQuestion from "./WorkshopFrequentQuestion";
import WorkshopIntroduction from "./WorkshopIntroduction";
import WorkshopRating from "./WorkshopRating";
import RatingForm from "./RatingForm";

export default function WorkshopDetailItem() {
    return <div className="box-collapse-expand">
        <WorkshopIntroduction contents={[
            "Elevate your Las Vegas experience to new heights with a journey aboard The High Roller at The LINQ. As the tallest observation wheel in the world, standing at an impressive 550 feet tall, The High Roller offers a bird's-eye perspective of the iconic Las Vegas Strip and its surrounding desert landscape. From the moment you step into one of the spacious cabins, you'll be transported on a mesmerizing adventure, where every turn offers a new and breathtaking vista of the vibrant city below.",
            "Whether you're a first-time visitor or a seasoned Las Vegas aficionado, The High Roller promises an unparalleled experience that will leave you in awe. With its climate-controlled cabins and immersive audio commentary, this attraction provides a unique opportunity to see Las Vegas from a whole new perspective, while learning about its rich history and famous landmarks along the way."
        ]} />
        <WorkshopFrequentQuestion questions={questions} />
        <WorkshopRating progressData={progressData}/>
        <RatingForm ratingTypes={ratingTypes}/>
    </div>
}
