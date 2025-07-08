import { AppStoreSVG } from "@/assets/svg/AppStore.svg";
import Image from "next/image";
import PlayStore from "@/assets/images/PlayStore.png";

export const AppGetOnMobileButtons = () => {
  return (
    <div className="flex gap-2 mt-4">
      <button className="flex flex-col sm:flex-row gap-4">
        <AppStoreSVG />
      </button>

      <button className="flex flex-col sm:flex-row gap-4">
        <Image
          src={PlayStore}
          width={135}
          height={40}
          alt="Google Play"
          className="h-10"
        />
      </button>
    </div>
  );
};
