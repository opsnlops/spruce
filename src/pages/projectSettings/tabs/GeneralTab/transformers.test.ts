import { ProjectSettingsInput, RepoSettingsInput } from "gql/generated/types";
import { data } from "../testData";
import { ProjectType } from "../utils";
import { formToGql, gqlToForm } from "./transformers";
import { FormState } from "./types";

const { projectBase, repoBase } = data;

describe("repo data", () => {
  it("correctly converts from GQL to a form", () => {
    expect(
      gqlToForm(repoBase, { projectType: ProjectType.Repo })
    ).toStrictEqual(repoForm);
  });

  it("correctly converts from a form to GQL", () => {
    expect(formToGql(repoForm, "repo")).toStrictEqual(repoResult);
  });
});

describe("project data", () => {
  it("correctly converts from GQL to a form", () => {
    expect(
      gqlToForm(projectBase, { projectType: ProjectType.AttachedProject })
    ).toStrictEqual(projectForm);
  });

  it("correctly converts from a form to GQL", () => {
    expect(formToGql(projectForm, "project")).toStrictEqual(projectResult);
  });
});

const repoForm: FormState = {
  generalConfiguration: {
    enabled: true,
    repositoryInfo: {
      owner: "evergreen-ci",
      repo: "spruce",
    },
    branch: "main",
    other: {
      displayName: "",
      batchTime: 12,
      remotePath: "evergreen.yml",
      spawnHostScriptPath: "/test/path",
      versionControlEnabled: false,
    },
  },
  projectFlags: {
    dispatchingDisabled: true,
    scheduling: {
      deactivatePrevious: true,
      stepbackDisabled: true,
      deactivateStepback: null,
    },
    repotracker: {
      repotrackerDisabled: false,
      forceRun: null,
    },
    patch: {
      patchingDisabled: false,
    },
    taskSync: {
      configEnabled: true,
      patchEnabled: true,
    },
  },
  historicalTaskDataCaching: {
    disabledStatsCache: false,
  },
};

const repoResult: Pick<RepoSettingsInput, "projectRef"> = {
  projectRef: {
    id: "repo",
    enabled: true,
    owner: "evergreen-ci",
    repo: "spruce",
    branch: "main",
    displayName: "",
    batchTime: 12,
    remotePath: "evergreen.yml",
    spawnHostScriptPath: "/test/path",
    versionControlEnabled: false,
    dispatchingDisabled: true,
    deactivatePrevious: true,
    repotrackerDisabled: false,
    patchingDisabled: false,
    stepbackDisabled: true,
    taskSync: {
      configEnabled: true,
      patchEnabled: true,
    },
    disabledStatsCache: false,
  },
};

const projectForm: FormState = {
  generalConfiguration: {
    enabled: null,
    repositoryInfo: {
      owner: "evergreen-ci",
      repo: "evergreen",
    },
    branch: null,
    other: {
      displayName: null,
      identifier: "project",
      batchTime: null,
      remotePath: null,
      spawnHostScriptPath: null,
      versionControlEnabled: true,
    },
  },
  projectFlags: {
    dispatchingDisabled: null,
    scheduling: {
      deactivatePrevious: null,
      stepbackDisabled: null,
      deactivateStepback: null,
    },
    repotracker: {
      repotrackerDisabled: null,
      forceRun: null,
    },
    patch: {
      patchingDisabled: null,
    },
    taskSync: {
      configEnabled: null,
      patchEnabled: null,
    },
  },
  historicalTaskDataCaching: {
    disabledStatsCache: null,
  },
};

const projectResult: Pick<ProjectSettingsInput, "projectRef"> = {
  projectRef: {
    id: "project",
    enabled: null,
    owner: "evergreen-ci",
    repo: "evergreen",
    branch: null,
    displayName: null,
    identifier: "project",
    batchTime: 0,
    remotePath: null,
    spawnHostScriptPath: null,
    versionControlEnabled: true,
    dispatchingDisabled: null,
    deactivatePrevious: null,
    repotrackerDisabled: null,
    patchingDisabled: null,
    stepbackDisabled: null,
    taskSync: {
      configEnabled: null,
      patchEnabled: null,
    },
    disabledStatsCache: null,
  },
};
