import React from "react";
import { Divider } from "react-native-paper";
import { Item, ListSection } from "./Common";
import { openLink } from "./Common";

const PRIVACY_POLICY_URL = "https://uwayss.github.io/weather-app-privacy-statement/";

const LegalSectionComponent = () => {
  return (
    <>
      <ListSection title="Legal">
        <Item
          title="Privacy Policy"
          left="shield-lock-outline"
          onPress={() => openLink(PRIVACY_POLICY_URL)}
          right="chevron-right"
        />
      </ListSection>
      <Divider />
    </>
  );
};

LegalSectionComponent.displayName = "LegalSection";

export const LegalSection = React.memo(LegalSectionComponent);
