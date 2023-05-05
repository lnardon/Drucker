import EntryCard from "../EntryCard";

const EntriesTable: React.FC<any> = ({ entries }) => {
  return (
    <div>
      {entries.map((entry) => {
        return (
          <EntryCard
            name={entry.name}
            key={entry.name}
            time={entry.time}
            createdAt={entry.createdAt}
          />
        );
      })}
    </div>
  );
};

export default EntriesTable;
