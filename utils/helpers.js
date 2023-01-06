module.exports = {
  format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()}`;
    },
  compare_status: (status_id) => {
    if (status_id < 6){
      return true;
    } else {
      return false;
    }
  }
};