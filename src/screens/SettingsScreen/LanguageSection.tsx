import React from "react";
import { Menu } from "react-native-paper";
import { useSettings } from "../../context/SettingsContext";
import { Item, ListSection } from "./Common";

export default function LanguageSection() {
  const { settings, updateSetting } = useSettings();
  const [visible, setVisible] = React.useState(false);

  const languages = [
    { value: "en", label: "English" },
    { value: "ar", label: "العربية" },
    { value: "tr", label: "Türkçe" },
  ];

  const currentLanguage =
    languages.find(lang => lang.value === settings.language)?.label || "English";

  return (
    <ListSection title="Language">
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Item title={currentLanguage} onPress={() => setVisible(true)} right="chevron-down" />
        }
      >
        {languages.map(lang => (
          <Menu.Item
            key={lang.value}
            onPress={() => {
              updateSetting("language", lang.value);
              setVisible(false);
            }}
            title={lang.label}
          />
        ))}
      </Menu>
    </ListSection>
  );
}
