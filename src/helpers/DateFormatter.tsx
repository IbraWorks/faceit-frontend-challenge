import moment from 'moment';
import 'moment/locale/en-gb';

export const formatDate = (date: string) => {
  moment.locale('en-gb');
  return moment(date).format('DD/MM/YYYY, HH:MM:SS');
};
