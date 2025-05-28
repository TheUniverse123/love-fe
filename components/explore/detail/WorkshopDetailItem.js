import { progressData, questions } from "@/data";
import RatingForm from "./RatingForm";
import WorkshopFrequentQuestion from "./WorkshopFrequentQuestion";
import WorkshopIntroduction from "./WorkshopIntroduction";
import WorkshopRating from "./WorkshopRating";
import { getUserInfo } from "@/app/util/auth";

const userInfo = getUserInfo()
export default function WorkshopDetailItem({ workshopDetail }) {
    return <div className="box-collapse-expand">
        <WorkshopIntroduction contents={[
            `${workshopDetail?.description}`
        ]} />
        <WorkshopFrequentQuestion questions={questions} />
        <WorkshopRating progressData={progressData} workshopDetail={workshopDetail} />
        {userInfo && <RatingForm />}
    </div>
}
