export const buildBranchName = (options: Record<string, boolean>, defaultBranch: string) => {
  const branchName = Object.entries(options).reduce((acc, item, index) => {
    const val = item[1];
    if (val) acc += item[0] + (index === Object.keys(options)?.length - 1 ? "" : "-");
    return acc;
  }, "");

  return !branchName?.length ? defaultBranch : branchName;
};
