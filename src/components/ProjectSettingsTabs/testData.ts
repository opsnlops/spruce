import { ProjectSettingsQuery, RepoSettingsQuery } from "gql/generated/types";

const projectBase: ProjectSettingsQuery["projectSettings"] = {
  githubWebhooksEnabled: true,

  projectRef: {
    id: "project",
    identifier: "project",
    repoRefId: "repo",

    enabled: null,
    owner: "evergreen-ci",
    repo: "evergreen",
    branch: null,
    displayName: null,
    notifyOnBuildFailure: null,
    batchTime: 0,
    remotePath: null,
    spawnHostScriptPath: null,
    dispatchingDisabled: null,
    deactivatePrevious: null,
    repotrackerDisabled: null,
    defaultLogger: null,
    cedarTestResultsEnabled: null,
    patchingDisabled: null,
    taskSync: {
      configEnabled: null,
      patchEnabled: null,
    },
    disabledStatsCache: null,
    filesIgnoredFromCache: null,
    validDefaultLoggers: ["evergreen", "buildlogger"],
    private: null,
    restricted: true,
    admins: [],
    prTestingEnabled: null,
    githubChecksEnabled: null,
    githubTriggerAliases: null,
    gitTagVersionsEnabled: null,
    gitTagAuthorizedUsers: ["privileged"],
    gitTagAuthorizedTeams: [],
    commitQueue: {
      enabled: null,
      requireSigned: null,
      mergeMethod: "",
      message: "",
    },
    perfEnabled: true,
    buildBaronSettings: {
      ticketCreateProject: null,
      ticketSearchProjects: [],
    },
    taskAnnotationSettings: {
      jiraCustomFields: [],
      fileTicketWebhook: {
        endpoint: null,
        secret: null,
      },
    },
    patchTriggerAliases: null,
    workstationConfig: {
      setupCommands: [
        {
          command: 'echo "hello spruce"',
          directory: "sophie.stadler",
        },
      ],
      gitClone: null,
    },
  },
  vars: {
    vars: { test_name: "", test_two: "val" },
    privateVars: ["test_name"],
    adminOnlyVars: ["test_name"],
  },
  aliases: [
    {
      id: "1",
      alias: "__github",
      gitTag: "",
      variant: ".*",
      task: ".*",
      remotePath: "",
      variantTags: [],
      taskTags: [],
    },
    {
      id: "3",
      alias: "__commit_queue",
      gitTag: "",
      variant: "^ubuntu1604$",
      task: "^lint$",
      remotePath: "",
      variantTags: [],
      taskTags: [],
    },
    {
      id: "5",
      alias: "__git_tag",
      gitTag: "tagName",
      variant: "",
      task: "",
      remotePath: "./evergreen.yml",
      variantTags: [],
      taskTags: [],
    },
  ],
};

const repoBase: RepoSettingsQuery["repoSettings"] = {
  githubWebhooksEnabled: true,

  projectRef: {
    id: "123",
    enabled: true,
    owner: "evergreen-ci",
    repo: "spruce",
    branch: "main",
    displayName: "",
    batchTime: 0,
    remotePath: "evergreen.yml",
    spawnHostScriptPath: "/test/path",
    dispatchingDisabled: true,
    deactivatePrevious: true,
    repotrackerDisabled: false,
    notifyOnBuildFailure: false,
    defaultLogger: "buildlogger",
    cedarTestResultsEnabled: false,
    patchingDisabled: false,
    taskSync: {
      configEnabled: true,
      patchEnabled: true,
    },
    disabledStatsCache: false,
    filesIgnoredFromCache: ["filename"],
    validDefaultLoggers: ["evergreen", "buildlogger"],
    private: false,
    restricted: true,
    admins: ["admin"],
    prTestingEnabled: true,
    githubChecksEnabled: true,
    githubTriggerAliases: ["alias1"],
    gitTagVersionsEnabled: true,
    gitTagAuthorizedUsers: ["admin"],
    gitTagAuthorizedTeams: [],
    commitQueue: {
      enabled: true,
      requireSigned: true,
      mergeMethod: "squash",
      message: "Commit Queue Message",
    },
    perfEnabled: true,
    buildBaronSettings: {
      ticketCreateProject: "EVG",
      ticketSearchProjects: ["EVG"],
    },
    taskAnnotationSettings: {
      jiraCustomFields: [
        {
          field: "customField",
          displayText: "Custom Field",
        },
      ],
      fileTicketWebhook: {
        endpoint: "endpoint",
        secret: "secret",
      },
    },
    patchTriggerAliases: [
      {
        alias: "alias1",
        childProjectIdentifier: "spruce",
        taskSpecifiers: [
          {
            patchAlias: "alias2",
            taskRegex: "",
            variantRegex: "",
          },
          {
            patchAlias: "",
            taskRegex: ".*",
            variantRegex: ".*",
          },
        ],
        status: "succeeded",
        parentAsModule: "",
      },
    ],
    workstationConfig: {
      setupCommands: [],
      gitClone: true,
    },
  },
  vars: {
    vars: { repo_name: "repo_value" },
    privateVars: [],
  },
  aliases: [
    {
      id: "2",
      alias: "__github_checks",
      gitTag: "",
      variant: "",
      task: "",
      remotePath: "",
      variantTags: ["vTag"],
      taskTags: ["tTag"],
    },
    {
      id: "4",
      alias: "my alias name",
      gitTag: "",
      variant: "",
      task: "",
      remotePath: "",
      variantTags: ["okay"],
      taskTags: ["hi"],
    },
  ],
};

export const data = {
  projectBase,
  repoBase,
};
