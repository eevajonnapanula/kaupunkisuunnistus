import React, { FunctionComponent } from "react";

interface TimeType {
  time: string;
  teamName: string;
}

interface TimesTableProps {
  times: TimeType[];
  columns: string[];
}

const formatTime = (time: Date) =>
  `${time.getDate()}.${
    time.getMonth() + 1
  }.${time.getFullYear()} - ${time.getHours()}:${time.getMinutes()}`;

const TimesTable: FunctionComponent<TimesTableProps> = ({ times, columns }) => (
  <table>
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {times.map((item) => (
        <tr key={item.teamName}>
          <td>{item.teamName}</td>
          <td>{formatTime(new Date(item.time))}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TimesTable;
