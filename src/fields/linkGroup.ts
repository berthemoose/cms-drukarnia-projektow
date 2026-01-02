import type { Field } from "payload/types";
import deepMerge from "../utilities/deepMerge";
import link, { type LinkAppearances } from "./link";

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  overrides?: Record<string, unknown>;
  minLinks?: number;
  maxLinks?: number;
  label?: string;
  name?: string;
}) => Field;

const linkGroup: LinkGroupType = ({
  appearances,
  disableLabel = false,
  overrides = {},
  minLinks = 1,
  maxLinks = 10,
  label = "Linki",
  name = "links",
} = {}) => {
  const linkGroupResult: Field = {
    name,
    label,
    type: "array",
    minRows: minLinks,
    maxRows: maxLinks,
    labels: {
      singular: "Link",
      plural: "Linki",
    },
    admin: {
      description: `Dodaj od ${minLinks} do ${maxLinks} linków`,
      initCollapsed: false,
    },
    fields: [
      link({
        appearances,
        disableLabel,
      }),
    ],
  };

  return deepMerge(linkGroupResult, overrides);
};

export default linkGroup;
