import Button from "@/components/button/Button";
export default function NotFound() {
    return (
        <>
            <section className="section-box box-become-video main-background">
                <div className="container">
                    <div className="text-center"> <img className="mr-10" src="/assets/lib/user/imgs/page/pages/404.png" alt="Travila" />
                        <h1 className="white-color mb-15 mt-15"> <span>Không thể tìm thấy trang này</span></h1>
                        <p className="text-xl-medium neutral-500 mb-15">Trang bạn đang tìm kiếm hiện đang không tồn tại</p>
                        <Button text="Quay về trang chủ" link="/" />
                    </div>
                </div>
            </section>
        </>
    );
}
