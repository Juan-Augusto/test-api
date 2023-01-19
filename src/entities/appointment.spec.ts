import { expect, test } from "vitest";
import { Appointment } from "./appointments";
import { getFutureDate } from "../tests/utils/get-future-date";

test("create an appointment", () => {
  const startsAt = getFutureDate("2021-08-10");
  const endsAt = getFutureDate("2021-08-12");

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt,
  });
  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});

test("Cannot create an appointment with end date before start date", () => {
  const startsAt = getFutureDate("2021-08-10");
  const endsAt = getFutureDate("2021-08-08");

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
