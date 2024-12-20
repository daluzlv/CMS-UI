export const formatBrDate = (date: Date) => {
  debugger;

  let day = date.getDate();
  let month = brMonth(date.getMonth() + 1);
  let year = date.getFullYear();

  return `${day} de ${month} de ${year} às ${date.toLocaleTimeString()}`;
};

const brMonth = (month: number) => {
  switch (month) {
    case 1:
      return 'Janeiro';
    case 2:
      return 'Fevereiro';
    case 3:
      return 'Março';
    case 4:
      return 'Abril';
    case 5:
      return 'Maio';
    case 6:
      return 'Junho';
    case 7:
      return 'Julho';
    case 8:
      return 'Agosto';
    case 9:
      return 'Setembro';
    case 10:
      return 'Outubro';
    case 11:
      return 'Novembro';
    default:
      return 'Dezembro';
  }
};
