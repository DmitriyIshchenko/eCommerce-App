import { makeStyles, tokens } from "@fluentui/react-components";

export const useCss = makeStyles({
  tertiary: {
    backgroundColor: tokens.colorStrokeFocus2,
    ":hover": {
      backgroundColor: tokens.colorNeutralForeground2Hover,
    },
    ":hover:active": {
      backgroundColor: tokens.colorNeutralForeground2,
    },
  },
});