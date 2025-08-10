import Logo from "@/public/assets/logo/logo";
import Button from "../button/Button";
import styles from "./Footer.module.css";
import InputSendEmail from "./InputSendEmail";
import Link from "next/link";
import TikTokIcon from "@/public/assets/icon/TiktokIcon";

const contactInfo = [
  {
    text: "Hotline",
    description: "0837220804",
  },
  {
    text: "Email",
    description: "lovebookingws@gmail.com",
  },
  {
    text: "Fanpage",
    description: "https://www.facebook.com/profile.php?id=61576189272965",
  },
];

export default function Footer() {
  return (
    <footer className={`footer ${styles.footer}`}>
      <div className="container">
        <div className="row">
          <div
            className={`col-lg-4 col-md-6 col-sm-12 ${styles.footerWrapper}`}
          >
            <div>
              <Link className="d-inline-block mb-20" href="index.html">
                <Logo />
              </Link>
              <div className="box-info-contact mt-0">
                {contactInfo.map((item) => (
                  <div className="box-wrapper">
                    <h6 className="text-linear-3 neutral1000-color mb-0">
                      {item.text}
                    </h6>
                    <p className="text-white">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`col-lg-4 col-md-6 col-sm-12 ${styles.footerWrapper}`}
          >
            <div className="mb-2">
              <h6 className="text-linear-3 neutral1000-color font-17">
                Chính sách và điều khoản
              </h6>
              <ul className="menu-footer">
                <li className="mb-10">
                  <a
                    target="_blank"
                    href="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/footer%2FCh%C3%ADnh%20s%C3%A1ch%20b%E1%BA%A3o%20m%E1%BA%ADt.pdf?alt=media&token=ad61dcd7-1942-4aa1-91c1-edeefbea3d86"
                  >
                    Chính sách bảo mật thông tin
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-2">
              <h6 className="text-linear-3 neutral1000-color font-17">
                Dành cho Ban tổ chức
              </h6>
              <ul className="menu-footer">
                <li className="mb-10">
                  <a
                    target="_blank"
                    href="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/footer%2FCh%C3%ADnh%20s%C3%A1ch%20nh%C3%A0%20t%E1%BB%95%20ch%E1%BB%A9c.pdf?alt=media&token=df78195b-75c5-42af-83bd-29b4e303f616"
                  >
                    Điều khoản sử dụng cho ban tổ chức
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-2">
              <h6 className="text-linear-3 neutral1000-color font-17">
                Dành cho Khách hàng
              </h6>
              <ul className="menu-footer">
                <li className="mb-10">
                  <a
                    target="_blank"
                    href="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/footer%2FCh%C3%ADnh%20s%C3%A1ch%20kh%C3%A1ch%20h%C3%A0ng.pdf?alt=media&token=7e3977ef-9572-4ea6-b1b9-4ee7e1a1f1b0"
                  >
                    Điều khoản sử dụng cho Khách hàng
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`col-lg-4 col-md-6 col-sm-12 ${styles.footerWrapper}`}
          >
            <div className="mb-2">
              <h6 className="text-linear-3 neutral1000-color font-17">
                Hỗ trợ
              </h6>
              <ul className="menu-footer">
                <li className="mb-10">
                  <a
                    target="_blank"
                    href="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/footer%2FH%E1%BB%97%20tr%E1%BB%A3%20%C4%91%E1%BA%B7t%20v%C3%A9.pdf?alt=media&token=60ab3fbe-799a-4810-938e-f3fe3b17cdd3"
                  >
                    Hướng dẫn đặt vé
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://firebasestorage.googleapis.com/v0/b/love-fe-71303.firebasestorage.app/o/footer%2FH%E1%BB%97%20tr%E1%BB%A3%20t%E1%BA%A1o%20ws.pdf?alt=media&token=982fda96-9ced-4da7-b769-efe719e5b48f"
                  >
                    Hướng dẫn tạo workshop
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-2">
              <h6 className="text-linear-3 neutral1000-color font-17">
                Đăng ký nhận email về các sự kiện hot nhất
              </h6>
              <InputSendEmail />
              <Button text="Đăng ký" style={{ marginTop: "15px" }} />
            </div>
          </div>
        </div>
        <div className="footer-bottom mt-50">
          <div className="row align-items-center">
            <div className="col-md-6 text-md-start text-center mb-20">
              <p className="text-sm color-white">
                © 2025 Lové Inc. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end text-center mb-20">
              <div className="d-flex align-items-center justify-content-end">
                <p className="text-lg-bold neutral-0 d-inline-block mr-10">
                  Follow us
                </p>
                <div className="box-socials-footer d-inline-block">
                  <a
                    target="_blank"
                    className="icon-socials icon-facebook"
                    href="https://www.facebook.com/profile.php?id=61576189272965"
                  >
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.3334 13.4915C18.3334 16.5248 16.5251 18.3332 13.4917 18.3332H12.5001C12.0417 18.3332 11.6667 17.9582 11.6667 17.4998V12.6915C11.6667 12.4665 11.8501 12.2748 12.0751 12.2748L13.5417 12.2498C13.6584 12.2415 13.7584 12.1582 13.7834 12.0415L14.0751 10.4498C14.1001 10.2998 13.9834 10.1582 13.8251 10.1582L12.0501 10.1832C11.8167 10.1832 11.6334 9.99985 11.6251 9.77485L11.5918 7.73317C11.5918 7.59984 11.7001 7.48318 11.8417 7.48318L13.8417 7.44984C13.9834 7.44984 14.0918 7.34152 14.0918 7.19985L14.0584 5.19983C14.0584 5.05816 13.9501 4.94984 13.8084 4.94984L11.5584 4.98318C10.1751 5.00818 9.07509 6.1415 9.10009 7.52484L9.14175 9.8165C9.15008 10.0498 8.96676 10.2332 8.73342 10.2415L7.73341 10.2582C7.59175 10.2582 7.48342 10.3665 7.48342 10.5082L7.50842 12.0915C7.50842 12.2332 7.61675 12.3415 7.75841 12.3415L8.75842 12.3248C8.99176 12.3248 9.17507 12.5082 9.18341 12.7332L9.2584 17.4832C9.26674 17.9498 8.89174 18.3332 8.42507 18.3332H6.50841C3.47508 18.3332 1.66675 16.5248 1.66675 13.4832V6.50817C1.66675 3.47484 3.47508 1.6665 6.50841 1.6665H13.4917C16.5251 1.6665 18.3334 3.47484 18.3334 6.50817V13.4915V13.4915Z"
                        fill
                      />
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    className="icon-socials icon-be"
                    href="https://www.tiktok.com/@lovebookingws"
                  >
                    <TikTokIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
