export class Birthday {
  constructor(readonly date: Date, readonly name: string) {}
}

export class BirthdayNotebook {
  private readonly birthdays: Map<string, Birthday[]> = new Map();

  addBirthday(name: string, date: Date): BirthdayNotebook {
    const dateAsStr = date.getMonth() + "/" + date.getDate();
    this.birthdays.set(dateAsStr, [
      ...(this.birthdays.get(dateAsStr) || []),
      new Birthday(date, name),
    ]);

    return this;
  }

  getBirthdays(date: Date): string[] {
    const dateAsStr = date.getMonth() + "/" + date.getDate();
    return (this.birthdays.get(dateAsStr) || []).map((b) => b.name);
  }
}
