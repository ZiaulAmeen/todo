import Image from "next/image";
import s from "./LoginSignup.module.css";

const bgImage = () => {
  return (
    <div className={s.bgImage}>
      <Image
        src="/leaves.webp"
        width={500}
        height={500}
        alt="Picture of the author"
        className={s.image}
        priority={true}
      />
    </div>
  );
};

export default bgImage;
