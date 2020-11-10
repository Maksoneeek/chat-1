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

export function getColor(char) {

  const index = char.codePointAt() % 16;

  const colors = [
    '#db4d4d',
    '#4db8db',
    '#4db8b8',
    '#4d94db',
    '#4d71db',
    '#9471db',
    '#b871b8',
    '#ff944d',
    '#ff7194',
    '#ffacc5',
    '#ffdb71',
    '#ffb84d',
    '#b8db4d',
    '#71b84d',
    '#6ad19f',
    '#db94db',
  ];

  return colors[index]
}