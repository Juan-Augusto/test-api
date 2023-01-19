import { Appointment } from "../entities/appointments";

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  findConflictingAppointments(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment[] | null>;
}
