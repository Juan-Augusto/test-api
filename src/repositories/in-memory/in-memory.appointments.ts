import { Appointment } from "../../entities/appointments";
import { AppointmentRepository } from "../appointment-repositories";
import { areIntervalsOverlapping } from "date-fns";
export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findConflictingAppointments(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment[] | null> {
    const conflictingAppointments = this.items.filter((appointment) => {
      return areIntervalsOverlapping(
        { start: appointment.startsAt, end: appointment.endsAt },
        { start: startsAt, end: endsAt },
        { inclusive: true }
      );
    });
    if (!conflictingAppointments) return null;
    return conflictingAppointments;
  }
}
