import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import Card from "../../components/Common/Card";
import Divider from "../../components/Common/Divider";
import Text from "../../components/Common/Text";
import Icon from "../../components/Icon";
import { useLanguageSettings } from "../../hooks/useLanguageSettings";
import { ListSection } from "./Common";
import { LanguageModal } from "./LanguageModal";

function LanguageSection() {
  const {
    t,
    settings,
    modalVisible,
    setModalVisible,
    handleLanguageChange,
    currentLanguageLabel,
  } = useLanguageSettings();

  return (
    <>
      <ListSection title={t("settings.language")}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Card className="mx-4 flex-row items-center justify-between p-3.5">
            <Text>{currentLanguageLabel}</Text>
            <Icon name="chevron-down" size={24} />
          </Card>
        </TouchableOpacity>
        <Divider />
      </ListSection>
      <LanguageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        currentLanguage={settings.language}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
}

export default memo(LanguageSection);
