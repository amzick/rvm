import moment from 'moment';

export default function filterPlays (plays = [], key = 'isPlay') {
  return plays
    .filter(play => play.types[key])
    .sort((a, b) => moment(b.date) - moment(a.date));
};
