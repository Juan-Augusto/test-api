import { Appointment } from "../entities/appointments";
import { AppointmentRepository } from "../repositories/appointment-repositories";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}
type CreateAppointmentResponse = Appointment;
export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}
  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const conflictingAppointments =
      await this.appointmentRepository.findConflictingAppointments(
        startsAt,
        endsAt
      );

    if (!conflictingAppointments) {
      throw new Error("Conflicting appointments found");
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    await this.appointmentRepository.create(appointment);
    return appointment;
  }
}
