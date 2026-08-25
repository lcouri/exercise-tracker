export const validModules = ['setsProgression'] as const;

export type ValidModulesT = (typeof validModules)[number];
