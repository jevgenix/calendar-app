export interface GetSResults {
  Events: Schedule[];
}

export interface Schedule {
  id: number;
  summary: String;
  description: String;
  start: {
    date: String;
    dateTime: String;
    timeZone: String;
  };
  end: {
    dateTime: String;
    timeZone: String;
  };
}
