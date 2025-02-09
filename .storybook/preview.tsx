import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { withRouter } from "storybook-addon-react-router-v6";

const isTest = process.env.NODE_ENV === "test";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  apolloClient: {
    MockedProvider,
  },
};

// @storybook/addon-storyshots isn't successfully injecting the decorators from storybook-addon-react-router-v6 and storybook-addon-apollo-client so we need to manually wrap the stories.
export const decorators = !isTest ?  [withRouter] : [(Story) => <MockedProvider><MemoryRouter>{<Story />}</MemoryRouter></MockedProvider>];
