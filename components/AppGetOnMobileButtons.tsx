import { AppStoreSVG } from "@/assets/svg/AppStore.svg";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";

export const AppGetOnMobileButtons = () => {
  return (
    <Flex gap="2" mt="4">
      <button className="flex flex-col sm:flex-row gap-4">
        <AppStoreSVG />
      </button>

      <button className="flex flex-col sm:flex-row gap-4">
        <Image
          src={"/images/playstore.png"}
          width={135}
          height={40}
          alt="Google Play"
          className="h-10"
        />
      </button>
    </Flex>
  );
};
