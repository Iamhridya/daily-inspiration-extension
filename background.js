const alarmsApi =
  (chrome && chrome.alarms) ||
  (typeof browser !== "undefined" ? browser.alarms : null);

const notificationsApi =
  (chrome && chrome.notifications) ||
  (typeof browser !== "undefined" ? browser.notifications : null);

chrome.runtime.onInstalled.addListener(() => {
  console.log("Daily Inspiration Installed");
});

if (alarmsApi) {
  alarmsApi.onAlarm.addListener((alarm) => {
    if (alarm.name === "dailyReminder" && notificationsApi) {
      notificationsApi.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Daily Inspiration",
        message: "Your daily motivation is waiting ✨"
      });
    }
  });
}
