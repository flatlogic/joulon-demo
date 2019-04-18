let
  hostApi,
  portApi;

if (process.env.NODE_ENV === "development") {
  hostApi = "http://localhost";
  portApi = 8080;
} else {
  hostApi = "https://joulon-flatlogic-api.herokuapp.com";
  portApi = "";
}

const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}`;

const config = {
  hostApi,
  portApi,
  baseURLApi,
  auth: {
    clientID: "4v2PtoTkeYOHuhm-hqoueoz6cee95v2b",
    domain: "joulon-flatlogic.auth0.com",
    audience: "https://joulon-api-identifier/"
  }
};

export default config;