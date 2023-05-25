const { format_date } = require("../utils/helpers");

test("format_date() returns a date string", () => {
  const date = new Date("2023-05-26 16:12:03");

  expect(format_date(date)).toBe("05/25/2023");
});
