import React from "react";
import { useTranslation } from "react-i18next";
import Text from "@/src/components/Common/Text";

interface TemperatureDisplayProps {
  temperature: string;
  description: string | null;
  feltTemperature: string;
}

export const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({
  temperature,
  description,
  feltTemperature,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Text className="font-bold text-5xl" pop>
        {temperature}
      </Text>
      <Text
        className="w-full flex-wrap uppercase mt-1 tracking-widest text-center text-base font-semibold leading-relaxed"
        pop
      >
        {description || ""}
      </Text>
      <Text
        className="opacity-90 mt-2 text-base font-semibold leading-relaxed"
        pop
      >
        {t("weather.feltTemperature")}
        {": "}
        {feltTemperature}
      </Text>
    </>
  );
};
