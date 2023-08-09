// import moment from 'moment';

class Format {
  static percentage(value) {
    return `${value}%`;
  }

  static getNameInitials(name = '') {
    return name
      .split(' ')
      .slice(0, 2)
      .map(word => word[0])
      .join('');
  }

  // eslint-disable-next-line no-unused-vars
  static timeFromNow(d) {
    // return d ? moment(d).fromNow() : '-';
  }

  // eslint-disable-next-line no-unused-vars
  static time(d, format = 'hh:mma') {
    // return moment(d).format(format);
  }
}

export {Format};
