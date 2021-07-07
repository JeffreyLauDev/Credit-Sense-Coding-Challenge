const queryToSearchquery = (query) => {
  if (query !== undefined) {
    const result = Object.keys(query)
      .map((x) => {
        if (query[x] !== undefined) {
          return x + "=" + query[x];
        } else {
          return "";
        }
      })
      .filter((x) => x !== "")
      .join("&");

    if (result !== "") {
      return "?" + result;
    } else {
      return "";
    }
  }
  return "";
};

export default queryToSearchquery;
