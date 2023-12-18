import { Input } from "@mantine/core";
import React from "react";
import { IconSearch } from "@tabler/icons-react";

interface TableSectionHeaderProps {
  reference: React.RefObject<HTMLInputElement>;
  title: string;
  onSubmit: () => void;
  createComponent: React.JSX.Element;
  filterComponent?: React.JSX.Element;
}

function TableSectionHeader({
  reference,
  title,
  onSubmit,
  createComponent,
  filterComponent,
}: TableSectionHeaderProps): React.JSX.Element {
  return (
    <div className="flex p-2 items-center justify-between">
      <div className="text-2xl font-extrabold">{title}</div>
      <section className="flex items-center gap-5">
        {createComponent}
        {filterComponent && <React.Fragment>{filterComponent}</React.Fragment>}
        <section className="flex gap-2 items-center mr-10">
          <Input placeholder="Search" radius="md" size="md" ref={reference} />
          <div>
            <button
              className="px-4 py-1.5 rounded-md border border-solid border-primary bg-white/60"
              onClick={onSubmit}
            >
              <span className="flex items-center justify-center gap-1.5 text-primary">
                <IconSearch size={16} />
                Search
              </span>
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default TableSectionHeader;
