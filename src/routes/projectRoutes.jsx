import ProjectLayout from "../components/Layouts/ProjectLayout";

import ProjectDashboard from "../pages/project-pages/ProjectDashboard";
import Contractors from "../pages/project-pages/Contractors";
import SystemStructure from "../pages/project-pages/SystemStructure";
import CheckListandCertificates from "../pages/project-pages/CheckListandCertificates";
import CompletionStructure from "../pages/project-pages/CompletionStructure";

import CheckList from "../pages/project-pages/completion-structure/CheckLists";
import ImportsReports from "../pages/project-pages/completion-structure/ImportsReports";
import PunchItems from "../pages/project-pages/completion-structure/PunchItems";
import TagRegister from "../pages/project-pages/completion-structure/TagRegister";
import COMMregister from "../pages/project-pages/completion-structure/COMMregister";
import SystemStructure2 from "../pages/project-pages/blank";


export const projectRoutes = [
  ...[
    { path: "/project-dashboard", title: "Project Dashboard", type: "dashboard", component: ProjectDashboard },
    { path: "/checklist-certificates", title: "Check Lists and Certificates", type: "checklist", component: CheckListandCertificates },
    { path: "/contractors", title: "Contractors", type: "checklist", component: Contractors },
    { path: "/SystemStructure", title: "System Structure", type: "checklist", component: SystemStructure },
    { path: "/workingpage", title: "System Structure2", type: "checklist", component: SystemStructure2 },
    { path: "/completionStructure", title: "Completion Structure", type: "completion", component: CompletionStructure },
    { path: "/checklist", title: "Check Lists", type: "completion", component: CheckList },
    { path: "/imports-reports", title: "Imports & Reports", type: "completion", component: ImportsReports },
    { path: "/punchitems", title: "Punch Items", type: "completion", component: PunchItems },
    { path: "/tag-register", title: "Tag Register", type: "completion", component: TagRegister },
    { path: "/comm-register", title: "COMM Systems", type: "completion", component: COMMregister },
  ].map(({ path, title, type, component: Component }) => ({
    path,
    element: <ProjectLayout title={title} type={type} />,
    children: [{ index: true, element: <Component /> }],
  })),
];
