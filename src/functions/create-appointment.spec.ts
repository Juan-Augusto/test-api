import { describe, expect, it, test } from "vitest";
import { Appointment } from "../entities/appointments";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory.appointments";
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
