/*
  Moved hover handlers out here so HoverBox stays clean.
  It just receives these as callbacks through props.
*/

/* sets the box to red when cursor enters */
export const handleMouseEnter = (setter) => {
  setter("#ef4444");
};

/* resets back to indigo when cursor leaves */
export const handleMouseLeave = (setter) => {
  setter("#6366f1");
};
