export type ProgrammeJson = {
  id: string
  name: string
  startDate: string
  endDate: string | null
  dayPlans: {
    name: string
    // list of exercise ids
    exercises: string[]
  }[]
}
