import React, { FunctionComponent } from "react";
import { Team as TeamType } from "../../lib/types";

interface TeamProps {
  team: TeamType;
}

const Team: FunctionComponent<TeamProps> = ({ team }) => (
  <div className="dashboard-team">{team.name}</div>
);

export default Team;
