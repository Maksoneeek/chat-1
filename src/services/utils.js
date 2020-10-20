export function convertDate(timestamp) {
  const date = new Date(timestamp).toDateString().slice(4, 10);
  const time = new Date(timestamp).toTimeString().slice(0, 5);
  return `${date}, ${time}`;
}

export function getProgram(tag) {
  const map = {
    "WA": "WhatsApp",
    "TL": "Telegram",
    "VB": "Viber",
    "VK": "VK",
    "GS": "WhatsApp Business"
  };

  return map[tag];
}