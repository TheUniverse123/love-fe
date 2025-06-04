'use client'

import Button from "@/components/button/Button";

export default function ErrorPage() {
  return (
    <section className="section-box box-become-video main-background">
      <div className="container">
        <div className="text-center"> <img className="mr-10" src="/assets/lib/user/imgs/page/pages/404.png" alt="Travila" />
          <h1 className="white-color mb-15 mt-15"> <span>Có lỗi gì đó</span></h1>
          <p className="text-xl-medium neutral-500 mb-15">Trang bạn đang sử dụng gặp lỗi, vui lòng thử lại sau!</p>
          <Button text="Quay về trang chủ" link="/" />
        </div>
      </div>
    </section>
  );
}