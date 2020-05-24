require("dotenv").config();

const dbconfig = {
  endpoint: DB_URI,
  key: DB_KEY,
  databaseId: "referee-management-tool",
  containerId: "Items",
  partitionKey: {
    kind: "Hash",
    paths: ["/category"],
  },
};
