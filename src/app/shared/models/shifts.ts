export const shifts = [
  { id: "DAWN", name: "Manhã" },
  { id: "MORNING", name: "Tarde" },
  { id: "NIGHT", name: "Noite" },
];

export const fromId = (id: string) => {
  return shifts.find((x) => x.id == id)?.name;
};
