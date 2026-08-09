import { useLoaderData } from "react-router-dom";
import SettingLayout from "../layouts/SettingLayout";
import { SettingsProvider } from "../context/settingsContext";

function Settings() {
  const userData = useLoaderData();
  console.log(userData);
  return (
    <SettingsProvider userData={userData}>
      <SettingLayout />
    </SettingsProvider>
  );
}

export default Settings;
