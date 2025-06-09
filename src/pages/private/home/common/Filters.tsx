import { Button, Form, Input } from "antd";

function Filters({
  filters,
  setFilters,
  onFilter,
}: {
  filters: any;
  setFilters: any;
  onFilter: any;
}) {
  return (
    <Form layout="vertical" className="grid grid-cols-3 gap-3 mb-3 items-end">
      <Form.Item label="Search">
        <Input
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />{" "}
      </Form.Item>
      <Form.Item label="Date">
        <Input
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          type="date"
        />
      </Form.Item>

      <div className="flex justify-end gap-3">
        <Button
          onClick={() => {
            setFilters({ search: "", date: "" });
            onFilter({ search: "", date: "" });
          }}
        >
          Clear
        </Button>
        <Button
          disabled={!filters.search && !filters.date}
          type="primary"
          onClick={() => onFilter(filters)}
        >
          Apply Filters
        </Button>
      </div>
    </Form>
  );
}

export default Filters;
