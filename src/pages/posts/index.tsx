import { useList } from "@refinedev/core";

const postUseListResult = useList({
  resource: "posts",
  sorters: [
    {
      field: "id",
      order: "desc",
    },
  ],
  filters: [
    {
      field: "title",
      operator: "contains",
      value: "hello",
    },
  ],
});