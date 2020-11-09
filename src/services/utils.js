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

export function calculateLineHeadPosition(ev, element) {
  const progressWidth = element.getBoundingClientRect().width
  const leftPosition = ev.target.getBoundingClientRect().left
  let pos = (ev.clientX - leftPosition) / progressWidth

  try {
    if (!ev.target.className.match(/^ar\\-line\\-control/)) {
      return
    }
  } catch (err) {
    return
  }

  pos = pos < 0 ? 0 : pos
  pos = pos > 1 ? 1 : pos

  return pos
}

export function convertTimeMMSS(seconds) {
  return new Date(seconds * 1000).toISOString().substr(14, 5)
}
