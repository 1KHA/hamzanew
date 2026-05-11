import "./list-item.css";

type ListItemType = "ordered" | "unordered" | "with-icon";
type ListItemLevel = "one" | "two";

interface ListItemProps {
  type: ListItemType;
  level: ListItemLevel;
  itemText: string;
  itemNumber?: string;
  itemLetter?: string;
  icon?: string;
  className?: string;
}

export default function ListItem({
  type,
  level,
  itemText,
  itemNumber,
  itemLetter,
  icon,
  className,
}: ListItemProps) {
  const classes = [
    "list-item",
    `list-item--level-${level}`,
    `list-item--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={classes}>
      {type === "with-icon" && icon && (
        <span
          className="list-item__icon"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      )}
      {type === "ordered" && (
        <span className="list-item__marker" aria-hidden="true">
          {level === "one" ? itemNumber : itemLetter}
        </span>
      )}
      <span className="list-item__text">{itemText}</span>
    </li>
  );
}
