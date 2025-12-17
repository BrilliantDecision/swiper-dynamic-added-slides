import { ComputeSlideSizesProps } from "./types";

const computeSlideSizes = ({
  aspectRatio,
  slideHeight,
}: ComputeSlideSizesProps) => {
  const delimeter = aspectRatio.indexOf("/");
  const imgWidth = +aspectRatio.substring(0, delimeter);
  const imgHeight = +aspectRatio.substring(delimeter + 1);
  return +((imgWidth * slideHeight) / imgHeight).toFixed(2);
};

export { computeSlideSizes };
