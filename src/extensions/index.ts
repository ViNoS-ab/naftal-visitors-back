// adding prisma's expected types is a complicated task that takes a lot of time
// we can add them manually
// or write the extension on the config/prisma, then refactor it to be here to gain type intillisense

import result from "./results";

const extension = {
  result,
};

export default extension;
