// TODO: planning to add zod schema to parse the json, so casting 'as'
// wouldn't be needed
// The types here should be temporary

export type ExerciseJson = {
  [id: string]: ExerciseBase | ExerciseVariation;
};

type ExerciseDetails = {
  name: string;
  notes?: string[];
  showAchievedReps: boolean; // TODO: come up with better name for this
  weightIncrement: number;
  // TODO: not sure where to put this - might make sense to put in
  // history when implemented, but keeping here for now
  next: {
    sets: number;
    reps: number;
    weight: number;
    achievedReps?: number;
  };
};

// Has all the info; ExerciseVariation inherits all the values that it
// doesn't specify
export type ExerciseBase = {
  exerciseType: 'base';
} & ExerciseDetails;

// Inherits values from baseId, overriding if specified here
// 'name' field still required because these should all have a unique
//   name - I know it doesn't need to be unique because I'm using ids,
//   but I still think it would save a lot of headache
// 'next' field required because that tracks which weight,etc. to do next
export type ExerciseVariation = {
  exerciseType: 'variation';
  baseId: string;
} & Partial<ExerciseDetails> &
  Pick<ExerciseDetails, 'name' | 'next'>;

// The combined type - should be used everywhere that's not dealing with
// reading/writing exercise data
// Variation fills in missing fields from base, except for 'notes' (see below)
export type Exercise = Omit<ExerciseDetails, 'notes'> & {
  exerciseType: 'base' | 'variation';
  baseId?: string;
  // I'd like to display both base _and_ variation notes, so combining
  // notes into an array - can't think of any other field where I'd
  // like to keep both, so this is just a special case for now
  notes?: string[];
};
