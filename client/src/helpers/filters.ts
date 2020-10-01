export const dateFilter = (date: string) =>
  new Date(parseInt(date)).toLocaleString(['pt-BR'], { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const errorFilter = (errorValue: string[]) => `${errorValue[0]}`;
