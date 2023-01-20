import { describe, expect, it, test } from "vitest";
import { Appointment } from "../entities/appointments";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory.appointments";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("create an appointment", () => {
  it("should b able to create an appointment", () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(startsAt.getDate() + 2);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});

it("should not not be able to create an appointment with overlapping dates", async () => {
  const startsAt = getFutureDate("2023-01-01");
  const endsAt = getFutureDate("2023-01-10");

  const appointmentRepository = new InMemoryAppointmentRepository();
  const createAppointment = new CreateAppointment(appointmentRepository);

  await createAppointment.execute({
    customer: "John Doe",
    startsAt,
    endsAt,
  });

  expect(
    createAppointment.execute({
      customer: "John Doe",
      startsAt: getFutureDate("2023-01-02"),
      endsAt: getFutureDate("2023-01-03"),
    })
  ).rejects.toBeInstanceOf(Error);
});

test("Cannot create an appointment with a date before now", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() - 1);
  endsAt.setDate(endsAt.getDate() + 3);

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
