import moment from 'moment';

export function convertDate(timestamp) {
  let dates = moment(timestamp * 1000);
  dates.locale('ru');
  return dates.format("DD MMMM, H:mm");
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