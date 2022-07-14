import React, { useEffect, useState } from 'react';
import { AivenApi } from '../../services/avn';

import { useUser } from '../hooks';

import ReactSelect from 'react-select';
import BasicDataTable, {
  BasicJsonExpandedComponent,
  basicCol,
  col,
  propCol,
  relativeDateCol,
} from '../common/BasicDataTable';
import SeverityPill from '../common/SeverityPill';
import TicketStatePill from '../common/TicketStatePill';

// https://console.aiven.io/project/business-demo/support#:~:text=No-,T%2D2FOJM

const COLUMNS = [
  basicCol('ID', 'ticket_id'),
  relativeDateCol('Created', 'create_time'),
  col('Project', (row) => row.project_name, false, {
    cell: (row) => (
      <a
        href={`https://console.aiven.io/project/${
          row.project_name
        }/support#:~:text=${row.ticket_id.split('-')[1]}`}
        target="_blank"
        rel="noreferrer"
      >
        {row.project_name} <i className="fa fa-external-link"></i>
      </a>
    ),
  }),
  basicCol('Service', 'service_name'),
  col('Severity', (row) => row.severity, false, {
    cell: (row) => <SeverityPill severity={row.severity} />,
  }),
  col('State', (row) => row.state, false, {
    cell: (row) => <TicketStatePill ticketState={row.state} />,
  }),
  propCol('title'),
];

const STATE_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' },
];

const SEVERITY_OPTIONS = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'low', label: 'Low' },
];

const FormGroup = ({ label, children }) => (
  <div className="form-group">
    <label>{label}</label>
    {children}
  </div>
);

const Fetcher = ({ setTickets, projectsOverride = null }) => {
  const [running, setRunning] = useState(false);
  const [project, setProject] = useState(null);
  const user = useUser();
  const allProjects = projectsOverride ?? user.projects;
  const fetchAllProjects = async () => {
    if (!running) {
      setRunning(true);
      setTickets(() => []);
      for (let projectName of allProjects) {
        setProject(projectName);
        await fetchProjectTickets(projectName);
      }
      setRunning(false);
      setProject(null);
    }
  };
  const fetchProjectTickets = async (projectName) => {
    const projectTickets = await AivenApi.listSupportTickets(projectName);
    setTickets((tickets) => tickets.concat(projectTickets));
  };
  useEffect(() => {
    fetchAllProjects();
  }, []);
  return (
    <div>
      <button className="btn btn-sm btn-success me-3" disabled={running}>
        <i className="fa fa-refresh"></i>
      </button>
      {project ? (
        <span className="text-muted">
          <em>Fetching {project}...</em>
        </span>
      ) : (
        <span className="text-muted">
          <em>Displaying tickets for {allProjects.length} projects</em>
        </span>
      )}
    </div>
  );
};

const Tickets = ({ projectsOverride = null }) => {
  const [tickets, setTickets] = useState([]);
  const [ticketId, setTicketId] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  const data = tickets.filter((t) => {
    if (!!ticketId && t.ticket_id !== ticketId) {
      return false;
    }
    if (!!stateFilter && t.state !== stateFilter) {
      return false;
    }
    if (!!severityFilter && t.severity !== severityFilter) {
      return false;
    }
    return true;
  });
  return (
    <div>
      {!projectsOverride && <h1>Tickets</h1>}
      <div className="mb-3">
        <Fetcher setTickets={setTickets} projectsOverride={projectsOverride} />
      </div>
      <div className="mb-3 row">
        <div className="col">
          <FormGroup label="Ticket ID">
            <input
              type="text"
              className="form-control"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="col">
          <FormGroup label="State">
            <ReactSelect
              options={STATE_OPTIONS}
              defaultValue={stateFilter}
              onChange={(e) => setStateFilter(e?.value ?? '')}
              isClearable
            />
          </FormGroup>
        </div>
        <div className="col">
          <FormGroup label="Severity">
            <ReactSelect
              options={SEVERITY_OPTIONS}
              defaultValue={severityFilter}
              onChange={(e) => setSeverityFilter(e?.value ?? '')}
              isClearable
            />
          </FormGroup>
        </div>
      </div>
      <div className="mb-3">
        <BasicDataTable
          columns={COLUMNS}
          data={data}
          defaultSortField="create_time"
          ExpandableRowsComponent={BasicJsonExpandedComponent}
        />
      </div>
    </div>
  );
};

export default Tickets;
