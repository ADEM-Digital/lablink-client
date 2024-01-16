export function classNames(...classes : string[]) {
  return classes.filter(Boolean).join(" ");
}

export const sentenceToCaps = (sentence: string) => {
  return sentence.split(" ").map((word) => word[0].toUpperCase() + word.substring(1)).join(" ");
}